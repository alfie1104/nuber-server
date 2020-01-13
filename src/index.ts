import dotenv from "dotenv";
dotenv.config(); // .env에 적힌 내용들을 환경변수로 설정함

import { Options } from "graphql-yoga";
import { createConnection } from "typeorm"; // Object Relational Mapper. coonectionOptions에 작성한 설정들을 이용해서 앱과 데이터베이스를 연결해줌
import app from "./app";
import connectionOptions from "./ormConfig";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND,
  endpoint: GRAPHQL_ENDPOINT
};

const handleAppStart = () => console.log(`Listening on port ${PORT}`);

createConnection(connectionOptions)
  .then(() => {
    app.start(appOptions, handleAppStart);
  })
  .catch(error => console.log(error));
