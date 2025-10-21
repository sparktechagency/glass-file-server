import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { DashboardSubmittionService } from "./dashboardSubmittion.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

// get dashboard initial submission
const getDashboardIntialSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await DashboardSubmittionService.getDashboardIntialSubmission(req.query);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Dashboard initial submission retrieved successfully",
      pagination: result.meta,
      data: result.data,
    });
  }
);

// get dashboard misuse report
const getDashboardMisuseReport = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DashboardSubmittionService.getDashboardMisuseReport(
      req.query
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Dashboard misuse report retrieved successfully",
      pagination: result.meta,
      data: result.data,
    });
  }
);

// get dashboard appeal request
const getDashboardAppealRequest = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DashboardSubmittionService.getDashboardAppealRequest(
      req.query
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Dashboard appeal request retrieved successfully",
      pagination: result.meta,
      data: result.data,
    });
  }
);

// get dashboard respondent submission
const getDashboardRespondentSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await DashboardSubmittionService.getDashboardRespondentSubmission(
        req.query
      );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Dashboard respondent submission retrieved successfully",
      pagination: result.meta,
      data: result.data,
    });
  }
);

export const DashboardSubmittionController = {
  getDashboardIntialSubmission,
  getDashboardMisuseReport,
  getDashboardAppealRequest,
  getDashboardRespondentSubmission,
};
