import { Schema, model } from 'mongoose';
import { PersonDetailsType } from './interfaces';

const personDetailsSchema: Schema = new Schema(
  {
    First_Name: {
      type: String,
      required: true,
    },
    Last_Name: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      required: true,
    },
    Country: {
      type: String,
      required: true,
    },
    Age: {
      type: Number,
      required: true,
    },
    Id: {
      type: Number,
      index: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const PersonDetail = model<PersonDetailsType>(
  'PersonDetail',
  personDetailsSchema
);

export { PersonDetail };
