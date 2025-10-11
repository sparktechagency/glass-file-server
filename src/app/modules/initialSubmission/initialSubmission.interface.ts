import { Types } from "mongoose";

export interface IInitialSubmission {
  state: string;
  fastName: string;
  middleName: string;
  lastName: string;
  dob: Date;
  respondentFastName: string;
  respondentMiddleName: string;
  respondentLastName: string;
  respondentDOB: Date;
  respondentEmail: string;
  allegation: string[];
  typeOfFiling: "Jurisdiction" | "ProceduralIssue" | "SubjectMatter";
  evidence?: string[];
  link?: string;
  user: Types.ObjectId;
}
