import { IInitialSubmissionPay } from "./initialSubmissionPay.interface";
import { InitialSubmissionPay } from "./initialSubmissionPay.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import Stripe from "stripe";
import { PAYMENT_STATUS } from "../../../enums/paymentStatus";
import QueryBuilder from "../../builder/QueryBuilder";
import mongoose from "mongoose";
import { InitialSubmission } from "../initialSubmission/initialSubmission.model";

const stripe = new Stripe(config.stripe.stripeSecretKey as string);
/**
 * Create initial submission pay
 * @param data
 * @param user
 * @returns
 */
const createInitialSubmissionPayIntoDB = async (
  user: JwtPayload,
  data: IInitialSubmissionPay
) => {
  // transcestion role back
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // Assign user & default payment status
    data.user = user.id;
    data.paymentStatus = PAYMENT_STATUS.PENDING;

    // Create DB record
    const result = await InitialSubmissionPay.create([data], { session });
    if (!result) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Failed to create submission pay"
      );
    }

    const submission = result[0];

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Initial Submission Payment" },
            unit_amount: data.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${config.stripe.paymentSuccess}?submissionId=${submission._id}`,
      cancel_url: `${config.stripe.paymentFailed}?submissionId=${submission._id}`,
      metadata: {
        submissionId: submission._id.toString(),
        user: user.id,
      },
    });

    if (!checkoutSession.id) {
      // Mark payment as FAILED if Stripe creation fails
      submission.paymentStatus = PAYMENT_STATUS.FAILED;
      await submission.save({ session });
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Failed to create Stripe Checkout session"
      );
    }

    // Save payment intent ID in DB
    submission.paymentIntentId = checkoutSession.id;
    await submission.save();

    //  Mark submission as paid
    await InitialSubmission.findByIdAndUpdate(
      data.submissionId,
      { isPaid: true, paymentIntentId: checkoutSession.id },
      { session }
    );

    await session.commitTransaction();
    return { submission, checkout_url: checkoutSession.url! };
  } catch (error) {
    await session.abortTransaction();
    return `Failed to create submission pay`;
  } finally {
    session.endSession();
  }
};

/**
 * Get all initial submission pay
 * @param query
 * @returns
 */

const getAllInitialSubmissionPayFromDB = async (
  query: Record<string, unknown>
) => {
  const result = new QueryBuilder(InitialSubmissionPay.find().lean(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search([]);
  const data = await result.modelQuery.lean().exec();
  const meta = await result.getPaginationInfo();
  if (!data) {
    return {
      data: [],
      meta,
    };
  }
  return { data, meta };
};

/**
 * Get single initial submission pay
 * @param id
 * @returns
 */
const getSingleInitialSubmissionPayFromDB = async (id: string) => {
  const result = await InitialSubmissionPay.findById(id);
  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Failed to get initial submission pay`
    );
  }
  return result;
};

/**
 * Delete initial submission pay
 * @param id
 * @returns
 */
const deleteInitialSubmissionPayFromDB = async (id: string) => {
  const result = await InitialSubmissionPay.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Failed to delete initial submission pay`
    );
  }
  return result;
};

export const InitialSubmissionPayService = {
  createInitialSubmissionPayIntoDB,
  getAllInitialSubmissionPayFromDB,
  getSingleInitialSubmissionPayFromDB,
  deleteInitialSubmissionPayFromDB,
};
