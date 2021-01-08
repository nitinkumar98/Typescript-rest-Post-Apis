import { Document, Schema, model } from "mongoose";
import { UserType } from "./UserModel";

export interface MessageType extends Document {
  text: string;
  sendBy: UserType["_id"];
  receiveBy: UserType["_id"];
  roomId: string;
}

const messageSchema = new Schema(
  {
    text: String,
    sendBy: {
      type: Schema.Types.ObjectId,
      index: true,
    },
    receiveBy: {
      type: Schema.Types.ObjectId,
      index: true,
    },
    roomId: String,
  },
  { timestamps: true }
);

export default model<MessageType>("Message", messageSchema);
