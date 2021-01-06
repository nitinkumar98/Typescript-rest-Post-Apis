import mongoose, { Document } from "mongoose";
import { UserType } from "./UserModel";
import { PostType } from "./PostModel";

export interface CommentType extends Document {
  text: string;
  commentedBy: UserType["_id"];
  onPost: PostType["_id"];
}

const commentSchema = new mongoose.Schema(
  {
    text: String,
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
    onPost: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<CommentType>("Comment", commentSchema);
