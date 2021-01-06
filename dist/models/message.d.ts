import mongoose, { Document } from "mongoose";
import { userType } from "./user";
export interface messageType extends Document {
    text: string;
    sendBy: userType["_id"];
    receiveBy: userType["_id"];
    roomId: string;
}
declare const _default: mongoose.Model<messageType>;
export default _default;
