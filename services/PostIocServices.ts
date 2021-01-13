import { Container } from 'typescript-ioc';

import Post, { PostType, LoginUser } from '../models/PostModel';
import Comment, { CommentType } from '../models/CommentModel';

export abstract class PostServiceBase {
  public abstract createNewPost(post: PostType): Promise<Object>;
  public abstract getPostById(id: string): Promise<PostType>;
  public abstract getAllPosts(): Promise<Array<PostType>>;
  public abstract updatePostById(
    id: string,
    postData: PostType
  ): Promise<Object>;
  public abstract deletePostById(id: string): Promise<Object>;
  public abstract toCommentsOnPost(
    id: string,
    commentData: CommentType
  ): Promise<Object>;
  public abstract toGetAllCommentsOnPost(
    id: string
  ): Promise<Array<CommentType>>;
  public abstract toLikePost(id: string, user: LoginUser): Promise<Object>;
}

class PostServiceBaseImp implements PostServiceBase {
  public async createNewPost(post: PostType): Promise<Object> {
    try {
      await Post.create(post);
      return { message: 'Post created' };
    } catch (error) {
      return error;
    }
  }

  public async getPostById(id: string): Promise<PostType> {
    try {
      return await Post.findById(id);
    } catch (error) {
      return error;
    }
  }

  public async getAllPosts(): Promise<Array<PostType>> {
    try {
      return await Post.find({});
    } catch (error) {
      return error;
    }
  }

  public async updatePostById(id: string, postData: PostType): Promise<Object> {
    try {
      await Post.findByIdAndUpdate(id, postData);
      return { message: 'post updated' };
    } catch (error) {
      return error;
    }
  }

  public async deletePostById(id: string): Promise<Object> {
    try {
      await Post.findByIdAndDelete(id);
      return { message: 'Post deleted successfully!' };
    } catch (error) {
      return error;
    }
  }

  public async toCommentsOnPost(
    id: string,
    commentData: CommentType
  ): Promise<Object> {
    try {
      commentData.onPost = id;
      await Comment.create(commentData);
      return { message: 'Comment created successfully!!' };
    } catch (error) {
      return error;
    }
  }

  public async toGetAllCommentsOnPost(id: string): Promise<Array<CommentType>> {
    try {
      return await Comment.find({ onPost: id }).populate('commentedBy');
    } catch (error) {
      return error;
    }
  }

  public async toLikePost(id: string, user: LoginUser): Promise<Object> {
    try {
      const userId = user.likedBy;
      await Post.findByIdAndUpdate(
        id,
        {
          $inc: { likes: 1 },
          $push: {
            likes_by: {
              $each: [
                {
                  userId,
                },
              ],
              $position: 0,
            },
          },
        },
        { new: true }
      );
      return { message: 'Someone liked the post' };
    } catch (error) {
      return error;
    }
  }
}
Container.bind(PostServiceBase).to(PostServiceBaseImp);
