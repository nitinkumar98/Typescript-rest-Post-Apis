import mongoose, { Document } from "mongoose";
import { UserType } from "./UserModel";
export interface MessageType extends Document {
    text: string;
    sendBy: UserType["_id"];
    receiveBy: UserType["_id"];
    roomId: string;
}
declare const _default: mongoose.Model<MessageType>;
export default _default;
