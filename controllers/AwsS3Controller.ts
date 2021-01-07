import { POST, Path, FormParam, FileParam } from "typescript-rest";
import AWS from "aws-sdk";

@Path("/posts")
export class AwsS3Controller {
  @POST
  @Path("aws")
  private async createPostUsingS3(
    // @FormParam("name") name: string,
    @FileParam("image") image: Express.Multer.File
    //@FormParam("description") description: string,
    //@FormParam("postedBy") postedBy: String
  ): Promise<string> {
    const s3 = new AWS.S3({
      accessKeyId: "AKIAJ3II6QQSAG7FUBQQ",
      secretAccessKey: "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",
    });
    const bucketParam = {
      Bucket: "dev-data-bi",
      Key: image.originalname,
      Body: image.buffer,
    };

    try {
      s3.upload(bucketParam);
      return "Sucessfully uploaded!";
    } catch (error) {
      return error;
    }
  }
}
