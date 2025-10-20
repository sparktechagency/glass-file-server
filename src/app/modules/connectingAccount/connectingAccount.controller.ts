import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { StatusCodes } from "http-status-codes";
import { connectingAccountService } from "./connectingAccount.service";
import sendResponse from "../../../shared/sendResponse";

const createAccountIntoStripe = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const user = req.user;
    const result = await connectingAccountService.createConnectingAccountIntoDB(
      user
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Account link created successfully",
      data: result,
    });
  }
);

export const connectingAccountController = {
  createAccountIntoStripe,
};
