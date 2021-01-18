export abstract class AwsServiceBase {
  public abstract uploadFileToAws(image: Express.Multer.File): Promise<Object>;
}
