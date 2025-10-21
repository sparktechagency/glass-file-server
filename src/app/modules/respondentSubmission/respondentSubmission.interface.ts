import { Types } from "mongoose";
import { STATUS } from "../../../enums/status";

export interface IRespondentSubmission {
  responseDeclaration: string;
  evidence: string[];
  signature: string;
  signatureDate: string;
  ipAddress: string;
  submissionType: "respondentSubmission";
  status: STATUS;
  user: Types.ObjectId;
}
