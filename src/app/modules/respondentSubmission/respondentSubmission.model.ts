import { model, Schema } from "mongoose";
import { IRespondentSubmission } from "./respondentSubmission.interface";

const respondentSubmissionSchema = new Schema<IRespondentSubmission>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    responseDeclaration: {
      type: String,
      required: true,
    },
    evidence: {
      type: [String],
      required: [true, "Evidence are required"],
    },
    signature: {
      type: String,
      required: [true, "Signature is required"],
    },
    signatureDate: {
      type: String,
      required: [true, "Signature date is required"],
    },
    ipAddress: {
      type: String,
      required: [true, "IP address is required"],
    },
    submissionType: {
      type: String,
      enum: ["respondentSubmission"],
      default: "respondentSubmission",
      required: [true, "Submission type is required"],
    },
    progressStatus: {
      type: String,
      enum: ["pending", "review"],
      default: "pending",
      required: [true, "Progress status is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const RespondentSubmission = model<IRespondentSubmission>(
  "RespondentSubmission",
  respondentSubmissionSchema
);
