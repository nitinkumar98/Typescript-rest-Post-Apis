import Post, { PostType, LoginUser } from "../models/PostModel";
import { Path, GET, POST, PathParam, PATCH, DELETE } from "typescript-rest";
import Comment, { CommentType } from "../models/CommentModel";

@Path("/posts")
export class PostRoutesController {
  @POST
  private async createNewPost(post: PostType): Promise<string> {
    try {
      await Post.create(post);
      return "Post created";
    } catch (error) {
      return error;
    }
  }

  @GET
  @Path(":id")
  private async getPostById(@PathParam("id") id: string): Promise<PostType> {
    try {
      return await Post.findById(id);
    } catch (error) {
      return error;
    }
  }

  @GET
  private async getAllPosts(): Promise<Array<PostType>> {
    try {
      return await Post.find({});
    } catch (error) {
      return error;
    }
  }

  @PATCH
  @Path(":id")
  private async updatePostById(
    @PathParam("id") id: string,
    postData: PostType
  ): Promise<string> {
    try {
      await Post.findByIdAndUpdate(id, postData);
      return "post updated";
    } catch (error) {
      return error;
    }
  }

  @DELETE
  @Path(":id")
  private async deletePostById(@PathParam("id") id: string): Promise<string> {
    try {
      await Post.findByIdAndDelete(id);
      return "Post deleted successfully!";
    } catch (error) {
      return error;
    }
  }

  @POST
  @Path(":id/comments")
  private async toCommentsOnPost(
    @PathParam("id") id: string,
    commentData: CommentType
  ): Promise<string> {
    try {
      commentData.onPost = id;
      await Comment.create(commentData);
      return "Comment created successfully!!";
    } catch (error) {
      return error;
    }
  }

  @GET
  @Path(":id/comments")
  private async toGetAllCommentsOnPost(
    @PathParam("id") id: string
  ): Promise<Array<CommentType>> {
    try {
      return await Comment.find({ onPost: id }).populate("commentedBy");
    } catch (error) {
      return error;
    }
  }

  @POST
  @Path(":id/likes")
  private async toLikePost(
    @PathParam("id") id: string,
    user: LoginUser
  ): Promise<string> {
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
      return "Someone liked the post";
    } catch (error) {
      return error;
    }
  }
}
