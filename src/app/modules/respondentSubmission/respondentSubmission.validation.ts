import { z } from "zod";

const createRespondentSubmissionValidation = z.object({
  body: z.object({
    responseDeclaration: z.string().min(1).max(1000),
    signature: z.string().min(1),
    signatureDate: z.string(),
    ipAddress: z.string().min(1),
  }),
});

const updateRespondentSubmissionValidation = z.object({
  body: z.object({
    responseDeclaration: z.string().min(1).max(1000).optional(),
    evidence: z.array(z.string()).min(1).optional(),
    signature: z.string().min(1).optional(),
    signatureDate: z.string().optional(),
    ipAddress: z.string().min(1).optional(),
  }),
});

export const RespondentSubmissionValidation = {
  createRespondentSubmissionValidation,
  updateRespondentSubmissionValidation,
};
