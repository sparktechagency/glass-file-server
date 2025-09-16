import mongoose, { Schema, Document, Model } from "mongoose";
import { IMisuseReport } from "./misuseReport.interface";

const misuseReportSchema = new Schema<IMisuseReport>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    userName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
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
      type: String,
      required: [true, "Nature of the reported is required"],
      enum: [
        "exceedingNormalBudgetaryExpenditures",
        "budgetaryMisapplication",
        "harassmentOrThreatsPerCoerciveFunds",
        "identityMisuseFromWinningUsers",
        "userEndorsementAsConflictOfInterests",
        "assistanceOfStaffInformation",
        "dataMisuseIdentity",
        "unauthorizedMisuseOrSystemForgery",
        "others",
      ],
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
        enum: ["initiator", "respondent", "juror", "moderator", "unknownField"],
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
      type: String,
      required: [true, "Resolution requested is required"],
      enum: [
        "criminalInvestigation",
        "disciplinaryPersonnel",
        "personalSectionCriteria",
        "otherFinancialOrAudit",
        "moneyToBeAddingOrEffective",
        "disciplinaryToEmplyeeAndPersonalTermina",
        "InvestigationToCheckPlacementAndRightToGiveAndContinuesTheCommunity",
        "others",
      ],
    },
    affirmationAndSignature: {
      type: Boolean,
      required: [true, "Affirmation and signature is required"],
    },
    reportSignature: {
      type: String,
      required: [true, "Report signature is required"],
      trim: true,
    },
    DOB: {
      type: Date,
      required: [true, "Date of Birth is required"],
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