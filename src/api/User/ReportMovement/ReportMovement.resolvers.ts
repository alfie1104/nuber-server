import User from "../../../entities/User";
import {
  ReportMovementMutationArgs,
  ReportMovementResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolver";
import cleanNullArgs from "../../../utils/cleanNullArg";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: privateResolver(
      async (
        _,
        args: ReportMovementMutationArgs,
        { req, pubSub }
      ): Promise<ReportMovementResponse> => {
        const user: User = req.user;
        const notNull = cleanNullArgs(args);

        try {
          await User.update({ id: user.id }, { ...notNull }); // 이 부분은 별도로 user를 리턴하지 않기 때문에, findOne을 이용해서 업데이트된 user를 검색해줘야함
          // (참고) update는 기존 정보의 존재여부를 검사하지 않고, 단지 DB에 수정요청만 보냄
          const updatedUser = await User.findOne({ id: user.id });
          pubSub.publish("driverUpdate", { DriversSubscription: updatedUser });
          // 두번째 인자로 보내고 싶은 data를 입력. 이때 데이터의 이름은 DriverSubscription.resolver(구독 대기중인 채널)에 작성한 driverUpdate의 데이터 이름(DriversSubscription)과 같아야함

          return {
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
