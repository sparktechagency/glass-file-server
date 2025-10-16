import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { InitialSubmissionPayService } from "./initialSubmissionPay.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

/**
 * Create initial submission pay
 * @param req
 * @param res
 * @returns
 */

const createInitialSubmissionPay = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await InitialSubmissionPayService.createInitialSubmissionPayIntoDB(
        req.user!,
        req.body
      );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Initial submission pay created successfully",
      data: result,
    });
  }
);

/**
 * Get all initial submission pay
 * @param req
 * @param res
 * @returns
 */
const getAllInitialSubmissionPay = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await InitialSubmissionPayService.getAllInitialSubmissionPayFromDB(
        req.query
      );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Initial submission pay fetched successfully",
      data: result,
    });
  }
);

/**
 * Get single initial submission pay
 * @param req
 * @param res
 * @returns
 */
const getSingleInitialSubmissionPay = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await InitialSubmissionPayService.getSingleInitialSubmissionPayFromDB(
        req.params.id
      );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Initial submission pay fetched successfully",
      data: result,
    });
  }
);

/**
 * Delete initial submission pay
 * @param req
 * @param res
 * @returns
 */
const deleteInitialSubmissionPay = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await InitialSubmissionPayService.deleteInitialSubmissionPayFromDB(
        req.params.id
      );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Initial submission pay deleted successfully",
      data: result,
    });
  }
);

export const InitialSubmissionPayController = {
  createInitialSubmissionPay,
  getAllInitialSubmissionPay,
  getSingleInitialSubmissionPay,
  deleteInitialSubmissionPay,
};
