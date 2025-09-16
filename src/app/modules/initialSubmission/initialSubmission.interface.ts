export interface IInitialSubmission {
  state: string;
  initiatorFirstName: string;
  initiatorMiddleName: string;
  initiatorLastName: string;
  initiatorDOB: Date;
  respondentFirstName: string;
  respondentMiddleName: string;
  respondentLastName: string;
  respondentDOB: Date;
  respondentEmail: string;
  typeOfFiling: "Jurisdiction" | "ProceduralIssue" | "SubjectMatter";
  allegation: string[];
  evidence: string[];
  link?: string;
}
