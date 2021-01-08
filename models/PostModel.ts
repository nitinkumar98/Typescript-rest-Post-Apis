import { Document, Schema, model } from "mongoose";
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

const postSchema: Schema = new Schema(
  {
    name: String,
    image: String,
    description: String,
    postedBy: {
      type: Schema.Types.ObjectId,
    },
    likes: { type: Number, default: 0 },
    likes_by: [{ userId: { type: Schema.Types.ObjectId } }],
  },
  { timestamps: true }
);

export default model<PostType>("Post", postSchema);
