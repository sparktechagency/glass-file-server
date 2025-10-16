import { StatusCodes } from "http-status-codes";
import { IInitialSubmission } from "./initialSubmission.interface";
import { InitialSubmission } from "./initialSubmission.model";
import ApiError from "../../../errors/ApiErrors";
import QueryBuilder from "../../builder/QueryBuilder";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import stripe from "../../../config/stripe";
import config from "../../../config";
import withTransaction from "../../../util/withTransaction";
/*
    data come from input field
    create initial submission into database
*/

const createInitialSubmissionIntoDB = async (
  data: IInitialSubmission,
  user: JwtPayload
) => {
  return withTransaction(async (session) => {
    data.user = user.id;
    data.caseId = new (require("mongoose").Types.ObjectId)()
      .toString()
      .slice(-6);
    data.paymentStatus = "pending";

    const submission = await InitialSubmission.create([data], { session });
    if (!submission || !submission[0]) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Failed to create initial submission"
      );
    }

    const createdSubmission = submission[0];

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Initial Submission Fee" },
            unit_amount: 10000, // $100
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${
        config.stripe.paymentSuccess
      }?submissionId=${createdSubmission._id.toString()}`,
      cancel_url: `${
        config.stripe.paymentFailed
      }?submissionId=${createdSubmission._id.toString()}`,
      metadata: {
        submissionId: createdSubmission._id.toString(),
        user: user.id,
      },
    });

    if (!checkoutSession || !checkoutSession.id) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Failed to create Stripe Checkout session"
      );
    }

    createdSubmission.paymentIntentId = checkoutSession.id;
    await createdSubmission.save({ session });

    return { submission: createdSubmission, checkout_url: checkoutSession.url };
  });
};

/**
 *  get All Initial Submission
 */
const getAllInitialSubmissionFromDB = async (
  query: Record<string, unknown>
) => {
  const result = new QueryBuilder(InitialSubmission.find().lean(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search([]);
  const data = await result.modelQuery.exec();
  const meta = await result.getPaginationInfo();
  if (!data) {
    return {
      data: [],
      meta,
    };
  }
  return { data, meta };
};

/*
  get single one
*/
const getSingleInitialSubmissionFromDB = async (id: string) => {
  const result = await InitialSubmission.findById(id);
  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Failed to get initial submission`
    );
  }
  return result;
};

/*
update initial submission
*/
const updateInitialSubmissionFromDB = async (
  id: string,
  data: IInitialSubmission
) => {
  const result = await InitialSubmission.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Failed to update initial submission`
    );
  }
  return result;
};

/*
delete initial submission
*/
const deleteInitialSubmissionFromDB = async (id: string) => {
  const result = await InitialSubmission.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Failed to delete initial submission`
    );
  }
  return result;
};

export const InitialSubmissionService = {
  createInitialSubmissionIntoDB,
  getAllInitialSubmissionFromDB,
  getSingleInitialSubmissionFromDB,
  updateInitialSubmissionFromDB,
  deleteInitialSubmissionFromDB,
};
