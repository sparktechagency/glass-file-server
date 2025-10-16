import { Request, Response } from "express";
import stripe from "../config/stripe";
import config from "../config";
import { InitialSubmission } from "../app/modules/initialSubmission/initialSubmission.model";

const handleStripeWebhook = async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"] as string;
  const webhookSecret = config.stripe.webhookSecret;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (err: any) {
    console.log("Stripe Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const paymentIntent = event.data.object;

  try {
    if (event.type === "checkout.session.completed") {
      const session = paymentIntent as any;
      const submissionId = session.metadata.submissionId;

      await InitialSubmission.findByIdAndUpdate(submissionId, {
        paymentStatus: "success",
      });

      return res.status(200).send({ received: true });
    } else if (event.type === "checkout.session.async_payment_failed") {
      const session = paymentIntent as any;
      const submissionId = session.metadata.submissionId;

      await InitialSubmission.findByIdAndUpdate(submissionId, {
        paymentStatus: "failed",
      });

      return res.status(200).send({ received: true });
    } else {
      console.log("Unhandled event type:", event.type);
      return res.status(200).send({ received: true });
    }
  } catch (err) {
    console.log("DB Update Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

export default handleStripeWebhook;
