export abstract class PersonDetailsServiceBase {
  public abstract uploadExcelFileAndSaveToDb(file: Express.Multer.File): Object;
}
