import { model, Schema } from "mongoose";
import { IInitialSubmission } from "./initialSubmission.interface";
import { SUBMITTION_STATUS } from "../../../enums/submittionStatus";
import { TYPE_OF_FILLING } from "../../../enums/typeOfFilling";
import { STATUS } from "../../../enums/status";
import { JurorAction } from "../../../enums/jurorAction";

const jurorDecisionSchema = new Schema(
  {
    juror: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      enum: Object.values(JurorAction),
      required: true,
    },
    votedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

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
      enum: TYPE_OF_FILLING,
      default: TYPE_OF_FILLING.JURISDICTION,
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
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.PENDING,
    },
    paymentIntentId: {
      type: String,
      required: false,
    },
    caseId: {
      type: String,
      required: false,
      unique: true,
    },
    isPaid: {
      type: Boolean,
      required: false,
      default: false,
    },
    submittionType: {
      type: String,
      enum: ["initialSubmittion"],
      default: "initialSubmittion",
    },
    jurorDecisions: {
      type: [jurorDecisionSchema],
      required: false,
      default: [],
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
