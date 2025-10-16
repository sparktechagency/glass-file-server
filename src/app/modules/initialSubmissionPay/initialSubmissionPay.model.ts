import { model, Schema } from "mongoose";
import { IInitialSubmissionPay } from "./initialSubmissionPay.interface";
import { PAYMENT_STATUS } from "../../../enums/paymentStatus";
import { PAYMENT_TYPE } from "../../../enums/paymentType";
import { PRIORITY } from "../../../enums/priority";

const initialSubmissionPaySchema = new Schema<IInitialSubmissionPay>(
  {
    submissionId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: [
        PAYMENT_STATUS.PENDING,
        PAYMENT_STATUS.SUCCEEDED,
        PAYMENT_STATUS.FAILED,
      ],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    paymentType: {
      type: String,
      enum: [PAYMENT_TYPE.STANDARD, PAYMENT_TYPE.EXPEDITED],
      default: PAYMENT_TYPE.STANDARD,
    },
    priority: {
      type: String,
      enum: [PRIORITY.STANDARD, PRIORITY.EXPEDITED],
      default: PRIORITY.STANDARD,
    },
    paymentIntentId: {
      type: String,
      required: false,
    },
    checkout_url: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const InitialSubmissionPay = model<IInitialSubmissionPay>(
  "initialSubmissionPay",
  initialSubmissionPaySchema
);
