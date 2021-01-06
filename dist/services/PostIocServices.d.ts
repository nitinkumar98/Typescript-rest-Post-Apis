import { PostType, LoginUser } from "../models/PostModel";
import { CommentType } from "../models/CommentModel";
export declare abstract class PostServiceBase {
    abstract createNewPost(post: PostType): Promise<String>;
    abstract getPostById(id: string): Promise<PostType>;
    abstract getAllPosts(): Promise<Array<PostType>>;
    abstract updatePostById(id: string, postData: PostType): Promise<string>;
    abstract deletePostById(id: string): Promise<string>;
    abstract toCommentsOnPost(id: string, commentData: CommentType): Promise<string>;
    abstract toGetAllCommentsOnPost(id: string): Promise<Array<CommentType>>;
    abstract toLikePost(id: string, user: LoginUser): Promise<string>;
}
export declare class PostServiceBaseImp implements PostServiceBase {
    createNewPost(post: PostType): Promise<String>;
    getPostById(id: string): Promise<PostType>;
    getAllPosts(): Promise<Array<PostType>>;
    updatePostById(id: string, postData: PostType): Promise<string>;
    deletePostById(id: string): Promise<string>;
    toCommentsOnPost(id: string, commentData: CommentType): Promise<string>;
    toGetAllCommentsOnPost(id: string): Promise<Array<CommentType>>;
    toLikePost(id: string, user: LoginUser): Promise<string>;
}
