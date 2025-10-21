import { Types } from "mongoose";
import { EMPLOYEE_TYPE } from "../../../enums/employee";
import { STATUS } from "../../../enums/status";

export interface IMisuseReport {
  user: Types.ObjectId;
  userName?: string;
  caseId?: string;
  khowThisPerson: boolean;
  natureOfTheReported: string[];
  subjectOfTheComplaint: {
    name: string;
    email: string;
    employee: EMPLOYEE_TYPE;
  };
  description: string;
  supportingDocument?: string[];
  link?: string;
  resolutionRequested: string[];
  affirmationAndSignature: boolean;
  submissionType: "misuseReport";
  status: STATUS;
}
