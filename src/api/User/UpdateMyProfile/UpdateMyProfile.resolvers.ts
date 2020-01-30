import User from "../../../entities/User";
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolver";
import cleanNullArgs from "../../../utils/cleanNullArg";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        // 사용자에게 입력받은 업데이트할 인자중에서 null값은 제거
        const notNull: any = cleanNullArgs(args);

        // 비밀번호는 Entity의 BeforeUpdate or BeforeInsert에 의해 hash를 이용하여 저장되어야 하므로 user entity의 save()함수 이용하여 저장
        if (notNull.password !== null) {
          user.password = notNull.password;
          user.save();
          delete notNull.password; // Delete password  from notNull or is going to be saved again without encoding
        }

        try {
          await User.update({ id: user.id }, { ...notNull });

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
