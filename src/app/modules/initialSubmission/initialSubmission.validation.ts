import z from "zod";

const dateStringToDate = z.preprocess((val) => {
  if (typeof val === "string" || val instanceof Date) {
    return new Date(val);
  }
}, z.date());

const createInitialSubmissionZodSchema = z.object({
  body: z.object({
    state: z.string({ required_error: "State is required" }),
    initiatorFirstName: z.string({
      required_error: "Initiator First Name is required",
    }),
    initiatorMiddleName: z.string({
      required_error: "Initiator Middle Name is required",
    }),
    initiatorLastName: z.string({
      required_error: "Initiator Last Name is required",
    }),
    initiatorDOB: dateStringToDate,
    respondentFirstName: z.string({
      required_error: "Respondent First Name is required",
    }),
    respondentMiddleName: z.string({
      required_error: "Respondent Middle Name is required",
    }),
    respondentLastName: z.string({
      required_error: "Respondent Last Name is required",
    }),
    respondentDOB: dateStringToDate,
    respondentEmail: z
      .string({ required_error: "Respondent Email is required" })
      .email(),
    typeOfFiling: z.enum(["Jurisdiction", "ProceduralIssue", "SubjectMatter"]),
    allegation: z.array(z.string(), {
      required_error: "Allegation is required",
    }),
    evidence: z.array(z.string(), { required_error: "Evidence is required" }),
    link: z.string().optional()
  }),
});

const updateInitialSubmissionZodSchema = z.object({
  body: z.object({
    state: z.string().optional(),
    initiatorFirstName: z.string().optional(),
    initiatorMiddleName: z.string().optional(),
    initiatorLastName: z.string().optional(),
    initiatorDOB: dateStringToDate.optional(),
    respondentFirstName: z.string().optional(),
    respondentMiddleName: z.string().optional(),
    respondentLastName: z.string().optional(),
    respondentDOB: dateStringToDate.optional(),
    respondentEmail: z.string().email().optional(),
    typeOfFiling: z
      .enum(["Jurisdiction", "ProceduralIssue", "SubjectMatter"])
      .optional(),
    allegation: z.array(z.string()).optional(),
    evidence: z.array(z.string()).optional(),
    link: z.string().optional(),
    user: z.string().optional(),
  }),
});

export const InitialSubmissionValidation = {
  createInitialSubmissionZodSchema,
  updateInitialSubmissionZodSchema,
};
