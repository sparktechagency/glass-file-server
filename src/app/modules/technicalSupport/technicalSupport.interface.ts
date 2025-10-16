import { Types } from "mongoose";

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
  issueOccur: "once" | "occasionally" | "frequently" | "always";
  usingPlatform: "yes" | "no" | "partially";
  // affectedUser:
  //   | "justMe"
  //   | "myTeam"
  //   | "myDepartment"
  //   | "mulipleDepartment"
  //   | "entireOrganization";
  receiveSupport: "phone" | "email";
  issueResolved: boolean;
  signature?: string;
  
  scheduleCall: boolean;
  digitalSignature?: string;
  DOB?: Date;
  user: Types.ObjectId;
}
