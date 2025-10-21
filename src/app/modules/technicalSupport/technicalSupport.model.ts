import mongoose from "mongoose";
import { ITechnicalSupportRoutes } from "./technicalSupport.interface";
import { ISSUE_OCCUR } from "../../../enums/issueOccur";
import { USING_PLATFORM } from "../../../enums/usingPlatform";

const technicalSupportSchema = new mongoose.Schema<ITechnicalSupportRoutes>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
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
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    issueClassification: {
      type: [String],
      required: [true, "Issue classification is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    dateAndTime: {
      type: Date,
      required: [true, "Date and Time is required"],
    },
    deviceType: {
      type: String,
      required: [true, "Device type is required"],
      trim: true,
    },
    browserApp: {
      type: String,
      required: [true, "Browser/App is required"],
      trim: true,
    },
    attachment: {
      type: [String],
      required: [true, "Attachments are required"],
    },
    issueOccur: {
      type: String,
      enum: Object.values(ISSUE_OCCUR),
      default: ISSUE_OCCUR.ONCE,
      required: [true, "Issue occur is required"],
    },
    usingPlatform: {
      type: String,
      enum: Object.values(USING_PLATFORM),
      default: USING_PLATFORM.PARTIALLY,
      required: [true, "Using platform is required"],
    },
    receiveSupport: {
      type: String,
      enum: ["phone", "email"],
      required: [true, "Receive support method is required"],
    },
    scheduleCall: {
      type: Boolean,
      required: [true, "Schedule call is required"],
    },
    digitalSignature: {
      type: String,
      trim: true,
    },
    DOB: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    submissionType: {
      type: String,
      enum: ["technicalSupport"],
      default: "technicalSupport",
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

export const TechnicalSupportModal = mongoose.model(
  "TechnicalSupport",
  technicalSupportSchema
);
