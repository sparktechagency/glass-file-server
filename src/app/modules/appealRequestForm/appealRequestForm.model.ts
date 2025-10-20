import { model, Schema } from "mongoose";
import { IAppealRequestForm } from "./appealRequestForm.interface";

const appealRequestFormSchema = new Schema<IAppealRequestForm>(
  {
    submittionType: {
      type: String,
      enum: ["appealRequest"],
      default: "appealRequest",
      required: true,
    },
    appealGrounds: {
      type: String,
      required: true,
    },
    supportingMaterials: {
      type: [String],
      required: true,
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
  },
  {
    timestamps: true,
  }
);

export const AppealRequestForm = model<IAppealRequestForm>(
  "AppealRequestForm",
  appealRequestFormSchema
);
