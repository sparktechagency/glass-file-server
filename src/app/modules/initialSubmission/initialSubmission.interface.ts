import { Types } from "mongoose";

export interface IInitialSubmission {
  _id?: Types.ObjectId;
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
  document?: string[];
  user: Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
  paymentIntentId?: string;
  caseId: string;
  paymentStatus: "pending" | "succeeded" | "failed";
}
