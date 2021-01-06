import mongoose, { Document } from "mongoose";
import { UserType } from "./UserModel";
import { PostType } from "./PostModel";
export interface CommentType extends Document {
    text: string;
    commentedBy: UserType["_id"];
    onPost: PostType["_id"];
}
declare const _default: mongoose.Model<CommentType>;
export default _default;
