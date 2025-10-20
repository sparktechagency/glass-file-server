import { Request, Response } from "express";
import stripe from "../config/stripe";
import config from "../config";
import { InitialSubmission } from "../app/modules/initialSubmission/initialSubmission.model";
import { errorLogger, logger } from "../shared/logger";
import { PAYMENT_STATUS } from "../enums/paymentStatus";
import { InitialSubmissionPay } from "../app/modules/initialSubmissionPay/initialSubmissionPay.model";
import { handleConnectionAccountCreate } from "./handleConnectionAccountCreate";

/**
 * Webhook Listener
 * Listens for Stripe checkout session events and updates DB accordingly.
 */
const handleStripeWebhook = async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"] as string;
  const webhookSecret = config.stripe.webhookSecret;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (err: any) {
    errorLogger.error("Stripe Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const eventData = event.data.object;

  try {
    switch (event.type) {
      // --- CASE 1: Payment successful ---
      case "checkout.session.completed": {
        const session = eventData as any;
        const submissionId = session.metadata.submissionId;

        await Promise.all([
          InitialSubmission.findByIdAndUpdate(submissionId, {
            paymentStatus: PAYMENT_STATUS.SUCCEEDED,
          }),
          InitialSubmissionPay.findByIdAndUpdate(submissionId, {
            paymentStatus: PAYMENT_STATUS.SUCCEEDED,
          }),
        ]);

        logger.info(`Payment success for submissionId: ${submissionId}`);
        return res.status(200).send({ received: true });
      }

      // --- CASE 2: Payment failed / expired ---
      case "checkout.session.async_payment_failed":
      case "checkout.session.expired": {
        const session = eventData as any;
        const submissionId = session.metadata.submissionId;

        await Promise.all([
          InitialSubmission.findByIdAndUpdate(submissionId, {
            paymentStatus: PAYMENT_STATUS.FAILED,
          }),
          InitialSubmissionPay.findByIdAndUpdate(submissionId, {
            paymentStatus: PAYMENT_STATUS.FAILED,
          }),
        ]);

        logger.info(`Payment failed for submissionId: ${submissionId}`);
        errorLogger.error(`Payment failed for submissionId: ${submissionId}`);
        return res.status(200).send({ received: true });
      }

      // --- CASE 3: Stripe account updated (Connect account) ---
      case "account.updated": {
        await handleConnectionAccountCreate(eventData as any);
        return res.status(200).send({ received: true });
      }

      default: {
        errorLogger.error("⚠️ Unhandled event type:", event.type);
        return res.status(200).send({ received: true });
      }
    }
  } catch (err: any) {
    errorLogger.error("🤡 DB Update Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

export default handleStripeWebhook;
