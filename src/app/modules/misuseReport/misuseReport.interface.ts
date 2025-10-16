import { Types } from "mongoose";

export interface IMisuseReport {
  user: Types.ObjectId;
  userName?: string;
  caseId?: string;
  khowThisPerson: boolean;
  natureOfTheReported: string[];
  subjectOfTheComplaint: {
    name: string;
    email: string;
    employee: "initiator" | "respondent" | "juror" | "moderator" | "unknown";
  };
  description: string;
  supportingDocument?: string[];
  link?: string;
  resolutionRequested: string[];
  affirmationAndSignature: boolean;
}
