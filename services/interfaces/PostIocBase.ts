import { PostType, CommentType, LoginUser } from '../../models';

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
