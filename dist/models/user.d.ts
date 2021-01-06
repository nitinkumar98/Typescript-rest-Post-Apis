import mongoose, { Document } from "mongoose";
export interface userType extends Document {
    name: string;
}
declare const _default: mongoose.Model<userType>;
export default _default;
