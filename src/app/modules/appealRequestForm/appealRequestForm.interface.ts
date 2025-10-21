import { Types } from "mongoose";

export interface IAppealRequestForm {
  appealGrounds: string;
  supportingDocument: string[];
  justification: string;
  reviewOption:
    | "NewJurorPanel"
    | "ModeratorOnlyReview"
    | "PlatformAppealsBoard";
  declarationAndSubmission: string;
  user: Types.ObjectId;
  submissionType: "appealRequest";
  progressStatus: "pending" | "review";
}
