import express from "express";
import { Server } from "typescript-rest";
import dotenv from "dotenv";

import Routes from "./controllers/index";
import bodyParser from "body-parser";
import { MongooseConnector } from "./mongoose.connector";

dotenv.config();

let app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: true }));
Server.buildServices(app, ...Routes);

app.listen(8080, async () => {
  console.log("Server listening on port 8080");

  MongooseConnector.mongoConnection();
});
