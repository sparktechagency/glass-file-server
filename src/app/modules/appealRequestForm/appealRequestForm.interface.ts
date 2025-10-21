import { Types } from "mongoose";
import { STATUS } from "../../../enums/status";

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
  status: STATUS;
}
