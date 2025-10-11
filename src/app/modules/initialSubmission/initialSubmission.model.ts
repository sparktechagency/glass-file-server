import { model, Schema } from "mongoose";
import { IInitialSubmission } from "./initialSubmission.interface";

const initialSubmissionSchema = new Schema<IInitialSubmission>(
  {
    state: {
      type: String,
      required: true,
    },
    fastName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    respondentFastName: {
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
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const InitialSubmission = model<IInitialSubmission>(
  "submittionForm",
  initialSubmissionSchema
);
