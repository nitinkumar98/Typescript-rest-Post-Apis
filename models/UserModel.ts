import { Document, model, Schema } from "mongoose";

export interface UserType extends Document {
  name: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

export default model<UserType>("User", userSchema);
