import AWS from 'aws-sdk';
import { Container } from 'typescript-ioc';

import { CheckForFileExtensionValidation } from '../validation/ExtensionValidate';
import { AwsServiceBase } from './interfaces';

export class AwsServiceBaseImp implements AwsServiceBase {
  public async uploadFileToAws(image: Express.Multer.File): Promise<Object> {
    if (!image.buffer.length) {
      return { error: 'Upload another image!!' };
    }

    const fileName: string[] = image.originalname.split('.');
    const allowedExtensions: string[] = ['jpeg', 'jpg', 'png', 'gif'];

    if (
      !CheckForFileExtensionValidation.isFileValid(
        fileName[fileName.length - 1],
        allowedExtensions
      )
    ) {
      return { error: 'Sorry Upload file format is not supported' };
    }
    const s3: AWS.S3 = new AWS.S3({
      accessKeyId: '#',
      secretAccessKey: '#',
    });
    const bucketParam = {
      Bucket: '#',
      Key: image.originalname,
      Body: image.buffer,
    };
    try {
      s3.upload(bucketParam);
      return { message: 'Uploaded successfully' };
    } catch (error) {
      return error;
    }
  }
}
Container.bind(AwsServiceBase).to(AwsServiceBaseImp);
