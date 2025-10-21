import { z } from "zod";

const createAppealRequestFormValidation = z.object({
  body: z.object({
    appealGrounds: z.string().min(1).max(1000),
    // supportingDocument: z.array(z.string()).min(1).max(1000),
    justification: z.string().min(1).max(1000),
    reviewOption: z.enum([
      "NewJurorPanel",
      "ModeratorOnlyReview",
      "PlatformAppealsBoard",
    ]),
    declarationAndSubmission: z.string().min(1).max(1000),
  }),
});

const updateAppealRequestFormValidation = z.object({
  body: z.object({
    appealGrounds: z.string().min(1).max(1000).optional(),
    // supportingDocument: z.array(z.string()).min(1).max(1000).optional(),
    justification: z.string().min(1).max(1000).optional(),
    reviewOption: z
      .enum(["NewJurorPanel", "ModeratorOnlyReview", "PlatformAppealsBoard"])
      .optional(),
    declarationAndSubmission: z.string().min(1).max(1000).optional(),
  }),
});

export const AppealRequestFormValidation = {
  createAppealRequestFormValidation,
  updateAppealRequestFormValidation,
};
