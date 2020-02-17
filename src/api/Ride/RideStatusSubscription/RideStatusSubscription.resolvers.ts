import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    RideStatusSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("rideUpdate"),
        (payload, _, { context }) => {
          // context에는 채널을 subscription하고 있는 사용자의 정보(currentUser)가 있고,
          // payload에는 payload를 publish한 사용자의 정보가 담겨 있음
          const user: User = context.currentUser;
          const {
            RideStatusSubscription: { driverId, passengerId }
          } = payload;

          // driverId 혹은 passengerId가 subscription을 리스닝중인 user라면 true를 리턴 => 결과물을 subsciption을 통해 publish
          return user.id === driverId || user.id === passengerId;
        }
      )
    }
  }
};

export default resolvers;
