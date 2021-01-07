import express from "express";
import { Server } from "typescript-rest";
import mongoose from "mongoose";
import Routes from "./controllers/index";
import bodyParser from "body-parser";
const url: string = "mongodb://localhost/tposts";

let app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: true }));
Server.buildServices(app, ...Routes);

app.listen(8080, () => {
  console.log("Server listening on port 8080");
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
});
