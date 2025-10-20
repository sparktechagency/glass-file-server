import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import config from "../../../config";
import stripe from "../../../config/stripe";

const createConnectingAccountIntoDB = async (user: JwtPayload) => {
  const existingUser: any = await User.findById(user.id)
    .select("+accountInformation")
    .lean();
  if (existingUser?.accountInformation?.accountUrl) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "You already connected your bank on Stripe."
    );
  }
  // @ts-ignore
  const account = await stripe.accounts.create({
    type: "express",
    country: "US",
    email: existingUser.email,
    business_type: "individual",
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    individual: {
      first_name: existingUser.name,
      email: existingUser.email,
    },
    business_profile: {
      mcc: 7299,
      product_description: "Glass File service.",
      url: config.stripe.CONNECTED_ACCOUNT_CREATE_URL,
    },
  });
  if (!account) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Account not found");
  }

  // Create an account link for onboarding
  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: config.stripe.CONNECTED_ACCOUNT_CREATE_URL,
    return_url: config.stripe.CONNECTED_ACCOUNT_CREATE_URL,
    type: "account_onboarding",
  });
  
  const updateAccount = await User.findByIdAndUpdate(
    user.id,
    {
      "accountInformation.stripeAccountId": account.id,
      "accountInformation.accountUrl": accountLink.url,
    },
    { new: true }
  );
  if (!updateAccount) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Failed to update account");
  }
  return accountLink.url;
};

export const connectingAccountService = {
  createConnectingAccountIntoDB,
};
