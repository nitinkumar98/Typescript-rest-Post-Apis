import { Document, Schema, model } from "mongoose";

export interface PersonDetailsType extends Document {
  First_Name: string;
  Last_Name: string;
  Gender: string;
  Country: string;
  Age: number;
  Id: number;
}

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

export default model<PersonDetailsType>("PersonDetail", personDetailsSchema);
