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
declare const _default: mongoose.Model<PostType>;
export default _default;
