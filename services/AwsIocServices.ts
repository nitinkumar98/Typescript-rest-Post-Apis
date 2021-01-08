import AWS from "aws-sdk";
import { Container } from "typescript-ioc";

export abstract class AwsServiceBase {
  public abstract uploadFileToAws(image: Express.Multer.File): String;
}

export class AwsServiceBaseImp implements AwsServiceBase {
  public uploadFileToAws(image: Express.Multer.File): String {
    const s3: AWS.S3 = new AWS.S3({
      accessKeyId: "#",
      secretAccessKey: "#",
    });
    const bucketParam = {
      Bucket: "#",
      Key: image.originalname,
      Body: image.buffer,
    };
    try {
      s3.upload(bucketParam);
      return "Uploaded successfully";
    } catch (error) {
      return error;
    }
  }
}
Container.bind(AwsServiceBase).to(AwsServiceBaseImp);
