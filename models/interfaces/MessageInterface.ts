import { UserType } from '.';
import { Document } from 'mongoose';

export interface MessageType extends Document {
  text: string;
  sendBy: UserType['_id'];
  receiveBy: UserType['_id'];
  roomId: string;
}
