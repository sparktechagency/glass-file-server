import z from "zod";

const sendMisuseReportNotification = z.object({
  body: z.object({
    userName: z.string({ required_error: "User name is required" }).optional(),
    caseId: z.string({ required_error: "Case ID is required" }).optional(),
    khowThisPerson: z.boolean({
      required_error: "Know this person is required",
    }),
    natureOfTheReported: z.array(
      z.string({ required_error: "Nature of the reported is required" })
    ),
    subjectOfTheComplaint: z.object({
      name: z.string({ required_error: "Subject name is required" }),
      email: z
        .string({ required_error: "Subject email is required" })
        .email("Invalid subject email"),
      employee: z.enum(
        ["initiator", "respondent", "juror", "moderator", "unknownField"],
        { required_error: "Employee type is required" }
      ),
    }),
    description: z.string({ required_error: "Description is required" }),
    supportingDocument: z
      .array(z.string({ required_error: "Supporting documents are required" }))
      .optional(),
    link: z.string({ required_error: "Link is required" }).optional(),
    resolutionRequested: z
      .array(z.string({ required_error: "Resolution requested is required" }))
      .optional(),
    affirmationAndSignature: z.boolean({
      required_error: "Affirmation and signature is required",
    }),
  }),
});

const updateMisuseReportNotification = z.object({
  body: z.object({
    userName: z.string({ required_error: "User name is required" }).optional(),
    caseId: z.string({ required_error: "Case ID is required" }).optional(),
    khowThisPerson: z
      .boolean({ required_error: "Know this person is required" })
      .optional(),
    natureOfTheReported: z
      .array(z.string({ required_error: "Nature of the reported is required" }))
      .optional(),
    subjectOfTheComplaint: z.object({
      name: z.string({ required_error: "Subject name is required" }),
      email: z
        .string({ required_error: "Subject email is required" })
        .email("Invalid subject email"),
      employee: z.enum(
        ["initiator", "respondent", "juror", "moderator", "unknownField"],
        { required_error: "Employee type is required" }
      ),
    }),
    description: z.string({ required_error: "Description is required" }),
    supportingDocument: z
      .array(z.string({ required_error: "Supporting documents are required" }))
      .optional(),
    link: z.string({ required_error: "Link is required" }).optional(),
    resolutionRequested: z
      .array(z.string({ required_error: "Resolution requested is required" }))
      .optional(),
    affirmationAndSignature: z
      .boolean({ required_error: "Affirmation and signature is required" })
      .optional(),
  }),
});

export const MisuseReportValidation = {
  sendMisuseReportNotification,
  updateMisuseReportNotification,
};
