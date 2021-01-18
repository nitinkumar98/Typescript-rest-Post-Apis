import { Document } from 'mongoose';

export interface UserType extends Document {
  name: string;
}
