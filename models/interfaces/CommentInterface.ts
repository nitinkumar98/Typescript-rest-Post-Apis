import { UserType, PostType } from '.';
import { Document } from 'mongoose';

export interface CommentType extends Document {
  text: string;
  commentedBy: UserType['_id'];
  onPost: PostType['_id'];
}
