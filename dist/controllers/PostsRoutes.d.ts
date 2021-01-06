import { PostServiceBase } from "../services/PostIocServices";
export declare class PostRoutesController {
    private injectedService;
    constructor(injectedService: PostServiceBase);
    private createNewPost;
    private getPostById;
    private getAllPosts;
    private updatePostById;
    private deletePostById;
    private toCommentsOnPost;
    private toGetAllCommentsOnPost;
    private toLikePost;
}
