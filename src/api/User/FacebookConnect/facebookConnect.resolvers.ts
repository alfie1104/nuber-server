import User from "src/entities/User";
import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse
} from "src/types/graph";
import { Resolvers } from "src/types/resolver";

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      const { fbId } = args;
      try {
        // fbId에 해당하는 유저가 있을 경우 해당 유저에 대한 토큰 반환
        const existingUser = await User.findOne({ fbId });
        if (existingUser) {
          return {
            ok: true,
            error: null,
            token: "Coming soon"
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
      /*
      try {
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
      */

      return {
        ok: false,
        error: null,
        token: null
      };
    }
  }
};

export default resolvers;
