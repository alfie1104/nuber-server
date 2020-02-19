import { withFilter } from "graphql-yoga";
import Chat from "../../../entities/Chat";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    MessageSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("newChatMessage"),
        async (payload, _, { context }) => {
          // context에는 채널을 subscription하고 있는 사용자의 정보(currentUser)가 있고,
          // payload에는 payload를 publish한 사용자의 정보가 담겨 있음
          const user: User = context.currentUser;
          const {
            MessageSubscription: { chatId }
          } = payload;

          try {
            const chat = await Chat.findOne({ id: chatId });
            if (chat) {
              return chat.driverId === user.id || chat.passengerId === user.id;
            } else {
              return false;
            }
          } catch (error) {
            return false;
          }
        }
      )
    }
  }
};

export default resolvers;
