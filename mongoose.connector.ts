import mongoose from "mongoose";

export class MongooseConnector {
  public static mongoConnection(): void {
    try {
      mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
      console.log("Database Connected");
    } catch (error) {
      console.log(error);
    }
  }
}
