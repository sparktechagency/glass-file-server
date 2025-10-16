import { z } from "zod";
import { PAYMENT_STATUS } from "../../../enums/paymentStatus";
import { PAYMENT_TYPE } from "../../../enums/paymentType";
import { PRIORITY } from "../../../enums/priority";

const createInitialSubmissionPaySchema = z.object({
  body: z.object({
    submissionId: z.string().min(1).max(255),
    price: z.number().min(1),
    paymentStatus: z.enum([
      PAYMENT_STATUS.PENDING,
      PAYMENT_STATUS.SUCCEEDED,
      PAYMENT_STATUS.FAILED,
    ]),
    paymentType: z.enum([PAYMENT_TYPE.STANDARD, PAYMENT_TYPE.EXPEDITED]),
    priority: z.enum([PRIORITY.STANDARD, PRIORITY.EXPEDITED]),
  }),
});

export const InitialSubmissionPayValidation = {
  createInitialSubmissionPaySchema,
};
