import { Schema, model } from 'mongoose';
import { CommentType } from './interfaces';

const commentSchema: Schema = new Schema(
  {
    text: String,
    commentedBy: {
      type: Schema.Types.ObjectId,
    },
    onPost: {
      type: Schema.Types.ObjectId,
      index: true,
    },
  },
  { timestamps: true }
);

const Comment = model<CommentType>('Comment', commentSchema);
export { Comment };
