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
          await User.update({ id: user.id }, { ...notNull });
          pubSub.publish("driverUpdate", { DriversSubscription: user });
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
