import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    NearByRideSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("rideRequest"),
        (payload, _, { context }) => {
          // context에는 채널을 subscription하고 있는 사용자의 정보(currentUser)가 있고,
          // payload에는 payload를 publish한 사용자의 정보가 담겨 있음
          const user: User = context.currentUser;
          const {
            NearByRideSubscription: { pickUpLat, pickUpLng }
          } = payload;

          const { lastLat: userLastLat, lastLng: userLastLng } = user;

          // PickUp을 요청한 사람(payload로 전달)의 픽업위치가 드라이버(user)근처라면 true를 리턴
          return (
            pickUpLat >= userLastLat - 0.05 &&
            pickUpLat <= userLastLat + 0.05 &&
            pickUpLng >= userLastLng - 0.05 &&
            pickUpLng <= userLastLng + 0.05
          ); // 필터이므로 true 혹은 false를 무조건 리턴해야함. false가 리턴되면 해당 publish가 전달되지 않음(걸러짐)
        }
      )
    }
  }
};

export default resolvers;
