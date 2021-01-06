import express from "express";
import { Server } from "typescript-rest";
import mongoose from "mongoose";
import Routes from "./controllers/index";

const url: string = "mongodb://localhost/tposts";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .catch((error) => {
    console.log(error);
  });

let app: express.Application = express();
Server.buildServices(app, ...Routes);

app.listen(8080, function () {
  console.log("Server listening on port 8080");
});
