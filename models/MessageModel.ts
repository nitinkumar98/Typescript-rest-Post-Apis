import mongoose, { Document } from "mongoose";
import { UserType } from "./UserModel";

export interface MessageType extends Document {
  text: string;
  sendBy: UserType["_id"];
  receiveBy: UserType["_id"];
  roomId: string;
}

const messageSchema = new mongoose.Schema(
  {
    text: String,
    sendBy: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
    },
    receiveBy: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
    },
    roomId: String,
  },
  { timestamps: true }
);

export default mongoose.model<MessageType>("Message", messageSchema);
