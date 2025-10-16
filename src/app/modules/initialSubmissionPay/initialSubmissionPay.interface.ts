import { Types } from "mongoose";
import { PAYMENT_STATUS } from "../../../enums/paymentStatus";
import { PAYMENT_TYPE } from "../../../enums/paymentType";
import { PRIORITY } from "../../../enums/priority";

export interface IInitialSubmissionPay {
  submissionId: string;
  price: number;
  paymentStatus?: PAYMENT_STATUS;
  user: Types.ObjectId;
  paymentType: PAYMENT_TYPE;
  priority: PRIORITY;
  paymentIntentId?: string;
  checkout_url?: string;
}
