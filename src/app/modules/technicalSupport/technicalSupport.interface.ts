import { Types } from "mongoose";
import { ISSUE_OCCUR } from "../../../enums/issueOccur";
import { USING_PLATFORM } from "../../../enums/usingPlatform";

export interface ITechnicalSupportRoutes {
  name: string;
  userName?: string;
  email: string;
  phone: string;
  issueClassification: string[];
  description: string;
  dateAndTime: Date;
  deviceType: "Desktop" | "Mobile" | "Tablet";
  operationgSystem: string;
  browserApp: string;
  attachment: string[];
  issueOccur: ISSUE_OCCUR;
  usingPlatform: USING_PLATFORM;
  receiveSupport: "phone" | "email";
  issueResolved: boolean;
  signature?: string;

  scheduleCall: boolean;
  digitalSignature?: string;
  DOB?: Date;
  user: Types.ObjectId;
}
