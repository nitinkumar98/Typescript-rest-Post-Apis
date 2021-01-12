import { POST, Path, FileParam } from "typescript-rest";
import { Inject } from "typescript-ioc";
import { PersonDetailsServiceBase } from "../services/index";

@Path("/excel")
export class ExcelFileController {
  @Inject
  private injectedService: PersonDetailsServiceBase;

  @POST
  @Path("upload")
  private uploadExcelFileAndSaveToDb(
    @FileParam("file") file: Express.Multer.File
  ): Object {
    return this.injectedService.uploadExcelFileAndSaveToDb(file);
  }
}
