import { Types } from "mongoose";

export interface IRespondentSubmission {
  responseDeclaration: string;
  evidence: string[];
  signature: string;
  signatureDate: string;
  ipAddress: string;
  submissionType: "respondentSubmission";
  progressStatus: "pending" | "review";
  user: Types.ObjectId;
}
