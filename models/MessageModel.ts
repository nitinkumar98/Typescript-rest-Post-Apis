import { Schema, model } from 'mongoose';
import { MessageType } from '.';

const messageSchema: Schema = new Schema(
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

const Message = model<MessageType>('Message', messageSchema);
export { Message };
