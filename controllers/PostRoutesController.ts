import { Path, GET, POST, PathParam, PATCH, DELETE } from "typescript-rest";
import { Inject } from "typescript-ioc";

import { PostType, LoginUser } from "../models/PostModel";
import { CommentType } from "../models/CommentModel";
import { PostServiceBase } from "../services/index";

@Path("/posts")
export class PostRoutesController {
  @Inject
  private injectedService: PostServiceBase;

  @POST
  private async createNewPost(post: PostType): Promise<String> {
    return this.injectedService.createNewPost(post);
  }

  @GET
  @Path(":id")
  private getPostById(@PathParam("id") id: string): Promise<PostType> {
    return this.injectedService.getPostById(id);
  }

  @GET
  private getAllPosts(): Promise<Array<PostType>> {
    return this.injectedService.getAllPosts();
  }

  @PATCH
  @Path(":id")
  private updatePostById(
    @PathParam("id") id: string,
    postData: PostType
  ): Promise<string> {
    return this.injectedService.updatePostById(id, postData);
  }

  @DELETE
  @Path(":id")
  private deletePostById(@PathParam("id") id: string): Promise<string> {
    return this.injectedService.deletePostById(id);
  }

  @POST
  @Path(":id/comments")
  private toCommentsOnPost(
    @PathParam("id") id: string,
    commentData: CommentType
  ): Promise<string> {
    return this.injectedService.toCommentsOnPost(id, commentData);
  }

  @GET
  @Path(":id/comments")
  private toGetAllCommentsOnPost(
    @PathParam("id") id: string
  ): Promise<Array<CommentType>> {
    return this.injectedService.toGetAllCommentsOnPost(id);
  }

  @POST
  @Path(":id/likes")
  private toLikePost(
    @PathParam("id") id: string,
    user: LoginUser
  ): Promise<string> {
    return this.injectedService.toLikePost(id, user);
  }
}
