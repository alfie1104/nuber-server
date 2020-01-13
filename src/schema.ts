import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

const allTypes: GraphQLSchema[] = fileLoader(
  path.join(__dirname, "./api/**/*.graphql")
); //api 폴더 안의 모든 폴더 속 모든 graphql파일들을 하나로 합쳐서 불러옴

const allResolvers: any[] = fileLoader(
  path.join(__dirname, "./api/**/*.resolvers.*")
); //ts로 제작한 파일을 향후 js로 변경할 것이므로, resolvers.*로 작성하였음

const mergedTypes = mergeTypes(allTypes);
const mergedResolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers
});

export default schema;
