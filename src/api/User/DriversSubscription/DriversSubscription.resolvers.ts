import { withFilter } from "graphql-yoga";

const resolvers = {
  Subscription: {
    DriversSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("driverUpdate"),
        (payload, _, { context }) => {
          console.log(
            `This is coming from the ReportMovement Resolve ${payload}`
          );
          console.log(`Listening`, context);
          return true;
        }
      )
    }
  }
};

export default resolvers;
