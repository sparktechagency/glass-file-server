import { Types } from "mongoose";
import { PAYMENT_STATUS } from "../../../enums/paymentStatus";
import { SUBMITTION_STATUS } from "../../../enums/submittionStatus";
import { TYPE_OF_FILLING } from "../../../enums/typeOfFilling";

export interface IInitialSubmission {
  _id?: Types.ObjectId;
  state: string;
  fastName: string;
  middleName: string;
  lastName: string;
  dob: Date;
  respondentFastName: string;
  respondentMiddleName: string;
  respondentLastName: string;
  respondentDOB: Date;
  respondentEmail: string;
  allegation: string[];
  typeOfFiling: TYPE_OF_FILLING;
  evidence?: string[];
  link?: string;
  document?: string[];
  user: Types.ObjectId;
  status: SUBMITTION_STATUS;
  paymentIntentId?: string;
  caseId: string;
  isPaid?: boolean;
  submittionType: "initialSubmittion";
}
