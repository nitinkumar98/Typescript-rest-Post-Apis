import { Schema, model } from 'mongoose';
import { PostType } from './interfaces';

const postSchema: Schema = new Schema(
  {
    name: String,
    image: String,
    description: String,
    postedBy: {
      type: Schema.Types.ObjectId,
    },
    likes: { type: Number, default: 0 },
    likes_by: [{ userId: { type: Schema.Types.ObjectId } }],
  },
  { timestamps: true }
);

const Post = model<PostType>('Post', postSchema);
export { Post };
