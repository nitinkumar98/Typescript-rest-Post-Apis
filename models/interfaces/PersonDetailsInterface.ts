import { Document } from 'mongoose';
export interface PersonDetailsType extends Document {
  First_Name: string;
  Last_Name: string;
  Gender: string;
  Country: string;
  Age: number;
  Id: number;
}
