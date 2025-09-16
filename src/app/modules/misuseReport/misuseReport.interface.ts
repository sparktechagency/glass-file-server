import { Types } from "mongoose";

export interface IMisuseReport {
  fullName: string;
  userName?: string;
  email: string;
  caseId?: string;
  khowThisPerson: boolean;
  natureOfTheReported:
    | "exceedingNormalBudgetaryExpenditures"
    | "budgetaryMisapplication"
    | "harassmentOrThreatsPerCoerciveFunds"
    | "identityMisuseFromWinningUsers"
    | "userEndorsementAsConflictOfInterests"
    | "assistanceOfStaffInformation"
    | "dataMisuseIdentity"
    | "unauthorizedMisuseOrSystemForgery"
    | "others";
  subjectOfTheComplaint: {
    name: string;
    email: string;
    employee:
      | "initiator"
      | "respondent"
      | "juror"
      | "moderator"
      | "unknownField";
  };
  description: string;
  supportingDocument: string[];
  link?: string;
  resolutionRequested:
    | "criminalInvestigation"
    | "disciplinaryPersonnel"
    | "personalSectionCriteria"
    | "otherFinancialOrAudit"
    | "moneyToBeAddingOrEffective"
    | "disciplinaryToEmplyeeAndPersonalTermina"
    | "Investigation to check placement and Right to give and continues the community"
    | "others";
  affirmationAndSignature: boolean;
  reportSignature:string;
  DOB:Date;
  user:Types.ObjectId;
}
