import { Container } from "typescript-ioc";
import joi from "joi";

import { CheckForFileExtensionValidation } from "../validation/ExtensionValidate";
import {
  ExcelToJsonHelperClass,
  JsonDataValidateHelper,
} from "../helpers/index";
import { PersonDetailsType, PersonDetail } from "../models/index";

export abstract class PersonDetailsServiceBase {
  public abstract uploadExcelFileAndSaveToDb(file: Express.Multer.File): Object;
}

export class PersonDetailsServiceBaseImp implements PersonDetailsServiceBase {
  public uploadExcelFileAndSaveToDb(file: Express.Multer.File): Object {
    if (!file.buffer.length) return { error: "Uplaod another file!" };

    const filename: string[] = file.originalname.split(".");
    const allowedExtensions: string[] = ["xls", "xlsx"];

    if (
      !CheckForFileExtensionValidation.isFileValid(
        filename[filename.length - 1],
        allowedExtensions
      )
    ) {
      return { error: "Sorry uploaded file format is not supported!" };
    }

    const jsonData: Array<PersonDetailsType> = ExcelToJsonHelperClass.ExeclToJson(
      file
    );

    const result: joi.ValidationResult = JsonDataValidateHelper.jsonDataValidate(
      jsonData
    );
    console.log(result);

    if (result.error) {
      return { error: "File data is not valid!" };
    }

    try {
      PersonDetail.insertMany(jsonData);
      return { message: "File upload successfully to database" };
    } catch (error) {
      return { error: error };
    }
  }
}
Container.bind(PersonDetailsServiceBase).to(PersonDetailsServiceBaseImp);
