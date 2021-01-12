import excelToJson from "convert-excel-to-json";

import { PersonDetailsType } from "../models/index";

export class ExcelToJsonHelperClass {
  public static ExeclToJson(
    file: Express.Multer.File
  ): Array<PersonDetailsType> {
    try {
      return excelToJson({
        source: file.buffer,
        header: {
          rows: 1,
        },
        columnToKey: {
          "*": "{{columnHeader}}",
        },
      }).Sheet1;
    } catch (error) {
      return error;
    }
  }
}
