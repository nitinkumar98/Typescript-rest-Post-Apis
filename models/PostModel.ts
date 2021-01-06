import mongoose, { Document } from "mongoose";
import { UserType } from "./UserModel";

export interface PostType extends Document {
  name: string;
  image: string;
  description: string;
  postedBy: UserType["_id"];
  likes: number;
  likes_by: [UserType["_id"]];
}
export interface LoginUser {
  likedBy: UserType["_id"];
}

const postSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    description: String,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
    likes: { type: Number, default: 0 },
    likes_by: [{ userId: { type: mongoose.Schema.Types.ObjectId } }],
  },
  { timestamps: true }
);

export default mongoose.model<PostType>("Post", postSchema);
