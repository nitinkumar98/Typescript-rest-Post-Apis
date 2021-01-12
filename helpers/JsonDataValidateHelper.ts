import joi, { array } from "joi";

import { PersonDetailsType } from "../models/index";

export class JsonDataValidateHelper {
  public static jsonDataValidate(
    jsonData: Array<PersonDetailsType>
  ): joi.ValidationResult {
    let schema: joi.ObjectSchema<any> = joi.object().keys({
      First_Name: joi.string().required(),
      Last_Name: joi.string().required(),
      Gender: joi.string().required(),
      Country: joi.string().required(),
      Age: joi.number().required(),
      Id: joi.number().required(),
    });
    let arraySchema: joi.ArraySchema = joi.array().items(schema);
    return arraySchema.validate(jsonData);
  }
}
