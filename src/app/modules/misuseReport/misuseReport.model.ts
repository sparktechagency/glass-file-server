import mongoose, { Schema } from "mongoose";
import { IMisuseReport } from "./misuseReport.interface";
import { EMPLOYEE_TYPE } from "../../../enums/employee";

const misuseReportSchema = new Schema<IMisuseReport>(
  {
    userName: {
      type: String,
      trim: true,
    },
    caseId: {
      type: String,
      trim: true,
    },
    khowThisPerson: {
      type: Boolean,
      required: [true, "Know this person is required"],
    },
    natureOfTheReported: {
      type: [String],
      required: [true, "Nature of the reported is required"],
    },
    subjectOfTheComplaint: {
      name: {
        type: String,
        required: [true, "Subject name is required"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Subject email is required"],
        trim: true,
      },
      employee: {
        type: String,
        required: [true, "Employee type is required"],
        enum: Object.values(EMPLOYEE_TYPE),
        default: EMPLOYEE_TYPE.UNKNOWN,
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    supportingDocument: {
      type: [String],
      required: [true, "Supporting documents are required"],
    },
    link: {
      type: String,
      trim: true,
    },
    resolutionRequested: {
      type: [String],
      required: [true, "Resolution requested is required"],
    },
    affirmationAndSignature: {
      type: Boolean,
      required: [true, "Affirmation and signature is required"],
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

export const MisuseReportModal = mongoose.model(
  "MisuseReport",
  misuseReportSchema
);
