import mongoose, { Document } from "mongoose";
export interface UserType extends Document {
    name: string;
}
declare const _default: mongoose.Model<UserType>;
export default _default;
