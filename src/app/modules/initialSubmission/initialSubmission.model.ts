import { model, Schema } from "mongoose";
import { IInitialSubmission } from "./initialSubmission.interface";

const initialSubmissionSchema = new Schema<IInitialSubmission>(
  {
    state: {
      type: String,
      required: true,
    },
    initiatorFirstName: {
      type: String,
      required: true,
    },
    initiatorMiddleName: {
      type: String,
      required: true,
    },
    initiatorLastName: {
      type: String,
      required: true,
    },
    initiatorDOB: {
      type: Date,
      required: true,
    },
    respondentFirstName: {
      type: String,
      required: true,
    },
    respondentMiddleName: {
      type: String,
      required: true,
    },
    respondentLastName: {
      type: String,
      required: true,
    },
    respondentDOB: {
      type: Date,
      required: true,
    },
    respondentEmail: {
      type: String,
      required: true,
    },
    typeOfFiling: {
      type: String,
      required: true,
    },
    allegation: {
      type: [String],
      required: true,
    },
    evidence: {
      type: [String],
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const InitialSubmission = model<IInitialSubmission>("InitialSubmission", initialSubmissionSchema);
