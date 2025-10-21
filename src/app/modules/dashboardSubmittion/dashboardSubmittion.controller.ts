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

// update status
const updateStatusOfInitialSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await DashboardSubmittionService.updateStatusOfInitialSubmission(
        req.params.id,
        req.body.status
      );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Status updated successfully",
      data: result,
    });
  }
);

// update status of misuse report
const updateStatusOfMisuseReport = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DashboardSubmittionService.updateStatusOfMisuseReport(
      req.params.id,
      req.body.status
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Status updated successfully",
      data: result,
    });
  }
);

// update status of appeal request
const updateStatusOfAppealRequest = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DashboardSubmittionService.updateStatusOfAppealRequest(
      req.params.id,
      req.body.status
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Status updated successfully",
      data: result,
    });
  }
);

// update status of respondent submission
const updateStatusOfRespondentSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await DashboardSubmittionService.updateStatusOfRespondentSubmission(
        req.params.id,
        req.body.status
      );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Status updated successfully",
      data: result,
    });
  }
);

// get single submission
const getSingleInitialSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DashboardSubmittionService.getSingleInitialSubmission(
      req.params.id
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Initial submission retrieved successfully",
      data: result,
    });
  }
);

const getSingleMisuseReport = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DashboardSubmittionService.getSingleMisuseReport(
      req.params.id
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Misuse report retrieved successfully",
      data: result,
    });
  }
);

const getSingleAppealRequest = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DashboardSubmittionService.getSingleAppealRequest(
      req.params.id
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Appeal request retrieved successfully",
      data: result,
    });
  }
);

const getSingleRespondentSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await DashboardSubmittionService.getSingleRespondentSubmission(
        req.params.id
      );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Respondent submission retrieved successfully",
      data: result,
    });
  }
);

export const DashboardSubmittionController = {
  getDashboardIntialSubmission,
  getDashboardMisuseReport,
  getDashboardAppealRequest,
  getDashboardRespondentSubmission,
  //   update status
  updateStatusOfInitialSubmission,
  updateStatusOfMisuseReport,
  updateStatusOfAppealRequest,
  updateStatusOfRespondentSubmission,
  //   get single submission
  getSingleInitialSubmission,
  getSingleMisuseReport,
  getSingleAppealRequest,
  getSingleRespondentSubmission,
};
