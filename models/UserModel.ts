import mongoose, { Document, Model } from "mongoose";

export interface UserType extends Document {
  name: string;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
});

export default mongoose.model<UserType>("User", userSchema);
