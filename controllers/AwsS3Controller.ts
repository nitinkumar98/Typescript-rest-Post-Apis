import { POST, Path, FileParam } from 'typescript-rest';
import { Inject } from 'typescript-ioc';

import { AwsServiceBase } from '../services/index';

@Path('/posts')
export class AwsS3Controller {
  @Inject
  private injectedService: AwsServiceBase;

  @POST
  @Path('aws')
  private async uploadFileToAws(
    @FileParam('image') image: Express.Multer.File
  ): Promise<Object> {
    return this.injectedService.uploadFileToAws(image);
  }
}
