import { Types } from "mongoose";

export interface IAppealRequestForm {
  submittionType: "appealRequest";
  appealGrounds: string;
  supportingMaterials: string[];
  justification: string;
  reviewOption:
    | "NewJurorPanel"
    | "ModeratorOnlyReview"
    | "PlatformAppealsBoard";
  declarationAndSubmission: string;
  user: Types.ObjectId;
}
