import { POST, Path, FileParam } from "typescript-rest";
import { Inject } from "typescript-ioc";

import { AwsServiceBase } from "../services/index";
import { CheckForImageFileValidation } from "../validation/ImageFileValidation";

@Path("/posts")
export class AwsS3Controller {
  @Inject
  private injectedService: AwsServiceBase;

  @POST
  @Path("aws")
  private async uploadFileToAws(
    @FileParam("image") image: Express.Multer.File
  ): Promise<String> {
    if (!image.buffer.length) {
      return "Upload another image!!";
    }

    const fileName: string[] = image.originalname.split(".");

    if (
      !CheckForImageFileValidation.isFileValid(fileName[fileName.length - 1])
    ) {
      return "Sorry Upload file format is not supported";
    }

    return this.injectedService.uploadFileToAws(image);
  }
}
