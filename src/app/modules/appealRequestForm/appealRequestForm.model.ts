import { model, Schema } from "mongoose";
import { IAppealRequestForm } from "./appealRequestForm.interface";

const appealRequestFormSchema = new Schema<IAppealRequestForm>(
  {
    appealGrounds: {
      type: String,
      required: true,
    },
    supportingDocument: {
      type: [String],
      required: [true, "Supporting documents are required"],
    },
    justification: {
      type: String,
      required: true,
    },
    reviewOption: {
      type: String,
      enum: ["NewJurorPanel", "ModeratorOnlyReview", "PlatformAppealsBoard"],
      required: true,
    },
    declarationAndSubmission: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    submissionType: {
      type: String,
      enum: ["appealRequest"],
      default: "appealRequest",
      required: true,
    },
    progressStatus: {
      type: String,
      enum: ["pending", "review"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AppealRequestForm = model<IAppealRequestForm>(
  "AppealRequestForm",
  appealRequestFormSchema
);
