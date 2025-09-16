import { Types } from "mongoose";

export interface ITechnicalSupportRoutes {
    name: string;
    userName?: string;
    email: string;
    phone: string;
    issueClassification: string;
    description: string;
    dateAndTime: Date;
    deviceType: string;
    browserApp: string;
    attachment: string[];
    impact: "critical" | "high" | "medium" | "low";
    affectedUser:
      | "justMe"
      | "myTeam"
      | "myDepartment"
      | "mulipleDepartment"
      | "entireOrganization";
    receiveSupport: "phone" | "email";
    scheduleCall: boolean;
    digitalSignature?:string;
    DOB?:Date;
    user:Types.ObjectId
  }
  