import { Request, Response } from "express";
import stripe from "../config/stripe";
import config from "../config";
import { InitialSubmission } from "../app/modules/initialSubmission/initialSubmission.model";
import { errorLogger, logger } from "../shared/logger";
import { PAYMENT_STATUS } from "../enums/paymentStatus";
import { InitialSubmissionPay } from "../app/modules/initialSubmissionPay/initialSubmissionPay.model";

/**
 * Webhook Listener
 * Listens for Stripe checkout session events and updates DB accordingly.
 *
 * Handles:
 *   - checkout.session.completed → mark payment as success
 *   - checkout.session.async_payment_failed → mark payment as failed
 *   - checkout.session.expired → mark payment as failed
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
    // --- CASE 1: Payment successful ---
    if (event.type === "checkout.session.completed") {
      // Payment successful

      const session = eventData as any;
      const submissionId = session.metadata.submissionId;
      // Update both submission and payment collections
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
    } else if (
      event.type === "checkout.session.async_payment_failed" ||
      event.type === "checkout.session.expired"
    ) {
      const session = eventData as any;
      const submissionId = session.metadata.submissionId;

      await InitialSubmission.findByIdAndUpdate(submissionId, {
        paymentStatus: PAYMENT_STATUS.FAILED,
      });

      await InitialSubmissionPay.findByIdAndUpdate(submissionId, {
        paymentStatus: PAYMENT_STATUS.FAILED,
      });
      logger.info(`Payment failed for submissionId: ${submissionId}`);
      errorLogger.error(`Payment failed for submissionId: ${submissionId}`);
      return res.status(200).send({ received: true });
    } else {
      errorLogger.error("⚠️ Unhandled event type:", event.type);
      return res.status(200).send({ received: true });
    }
  } catch (err) {
    errorLogger.error("🤡 DB Update Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

export default handleStripeWebhook;
