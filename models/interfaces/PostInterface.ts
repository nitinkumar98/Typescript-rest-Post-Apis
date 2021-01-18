import { UserType } from '.';
import { Document } from 'mongoose';

export interface PostType extends Document {
  name: string;
  image: string;
  description: string;
  postedBy: UserType['_id'];
  likes: number;
  likes_by: [UserType['_id']];
}
export interface LoginUser {
  likedBy: UserType['_id'];
}
