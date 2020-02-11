import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    DriversSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("driverUpdate"),
        (payload, _, { context }) => {
          // context에는 채널을 subscription하고 있는 사용자의 정보(currentUser)가 있고,
          // payload에는 payload를 publish한 사용자의 정보가 담겨 있음
          const user: User = context.currentUser;
          const {
            DriversSubscription: {
              lastLat: driverLastLat,
              lastLng: driverLastLng
            }
          } = payload;

          const { lastLat: userLastLat, lastLng: userLastLng } = user;

          return (
            driverLastLat >= userLastLat - 0.05 &&
            driverLastLat <= userLastLat + 0.05 &&
            driverLastLng >= userLastLng - 0.05 &&
            driverLastLng <= userLastLng + 0.05
          ); // 필터이므로 true 혹은 false를 무조건 리턴해야함. false가 리턴되면 해당 publish가 전달되지 않음(걸러짐)
        }
      )
    }
  }
};

export default resolvers;
