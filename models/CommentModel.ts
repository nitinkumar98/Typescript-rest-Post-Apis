import { Document, Schema, model } from "mongoose";
import { UserType } from "./UserModel";
import { PostType } from "./PostModel";

export interface CommentType extends Document {
  text: string;
  commentedBy: UserType["_id"];
  onPost: PostType["_id"];
}

const commentSchema = new Schema(
  {
    text: String,
    commentedBy: {
      type: Schema.Types.ObjectId,
    },
    onPost: {
      type: Schema.Types.ObjectId,
      index: true,
    },
  },
  { timestamps: true }
);

export default model<CommentType>("Comment", commentSchema);
