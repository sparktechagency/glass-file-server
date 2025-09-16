import z from "zod";

const createMisuseReportValidation = z.object({
  body: z.object({
    fullName: z
      .string({
        required_error: "Full name is required",
      })
      .trim(),

    userName: z.string().trim().optional(),

    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),

    caseId: z
      .string({
        required_error: "Case ID is required",
      })
      .optional(),

    khowThisPerson: z.boolean({
      required_error: "Know this person is required",
    }),

    natureOfTheReported: z.enum(
      [
        "exceedingNormalBudgetaryExpenditures",
        "budgetaryMisapplication",
        "harassmentOrThreatsPerCoerciveFunds",
        "identityMisuseFromWinningUsers",
        "userEndorsementAsConflictOfInterests",
        "assistanceOfStaffInformation",
        "dataMisuseIdentity",
        "unauthorizedMisuseOrSystemForgery",
        "others",
      ],
      {
        required_error: "Nature of the reported is required",
      }
    ),

    subjectOfTheComplaint: z.object({
      name: z
        .string({
          required_error: "Subject name is required",
        })
        .trim(),
      email: z
        .string({
          required_error: "Subject email is required",
        })
        .email("Invalid subject email"),
      employee: z.enum(
        ["initiator", "respondent", "juror", "moderator", "unknownField"],
        {
          required_error: "Employee type is required",
        }
      ),
    }),

    description: z
      .string({
        required_error: "Description is required",
      })
      .trim(),

    supportingDocument: z.array(
      z.string({
        required_error: "Supporting documents are required",
      })
    ),

    link: z.string().trim().optional(),

    resolutionRequested: z.enum(
      [
        "criminalInvestigation",
        "disciplinaryPersonnel",
        "personalSectionCriteria",
        "otherFinancialOrAudit",
        "moneyToBeAddingOrEffective",
        "disciplinaryToEmplyeeAndPersonalTermina",
        "InvestigationToCheckPlacementAndRightToGiveAndContinuesTheCommunity",
        "others",
      ],
      {
        required_error: "Resolution requested is required",
      }
    ),

    affirmationAndSignature: z.boolean({
      required_error: "Affirmation and signature is required",
    }),

    reportSignature: z
      .string({
        required_error: "Report signature is required",
      })
      .trim(),

    DOB: z.coerce.date({
      required_error: "Date of Birth is required",
    })
  }),
});

const updateMisuseReportValidation = z.object({
  body: z.object({
    fullName: z.string().trim().optional(),

    userName: z.string().trim().optional(),

    email: z.string().email("Invalid email address").optional(),

    caseId: z.string().trim().optional(),

    khowThisPerson: z.boolean().optional(),

    natureOfTheReported: z
      .enum([
        "exceedingNormalBudgetaryExpenditures",
        "budgetaryMisapplication",
        "harassmentOrThreatsPerCoerciveFunds",
        "identityMisuseFromWinningUsers",
        "userEndorsementAsConflictOfInterests",
        "assistanceOfStaffInformation",
        "dataMisuseIdentity",
        "unauthorizedMisuseOrSystemForgery",
        "others",
      ])
      .optional(),

    subjectOfTheComplaint: z
      .object({
        name: z.string().trim().optional(),
        email: z.string().email("Invalid subject email").optional(),
        employee: z
          .enum([
            "initiator",
            "respondent",
            "juror",
            "moderator",
            "unknownField",
          ])
          .optional(),
      })
      .optional(),

    description: z.string().trim().optional(),

    supportingDocument: z.array(z.string()).optional(),

    link: z.string().trim().optional(),

    resolutionRequested: z
      .enum([
        "criminalInvestigation",
        "disciplinaryPersonnel",
        "personalSectionCriteria",
        "otherFinancialOrAudit",
        "moneyToBeAddingOrEffective",
        "disciplinaryToEmplyeeAndPersonalTermina",
        "InvestigationToCheckPlacementAndRightToGiveAndContinuesTheCommunity",
        "others",
      ])
      .optional(),

    affirmationAndSignature: z.boolean().optional(),

    reportSignature: z.string().trim().optional(),

    DOB: z.coerce.date().optional(),
  }),
});

export const MisuseReportValidation = {
  createMisuseReportValidation,
  updateMisuseReportValidation,
};
