import { model, Schema } from 'mongoose';
import { UserType } from './interfaces';

const userSchema: Schema = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

const User = model<UserType>('User', userSchema);
export { User };
