import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { RespondentSubmissionService } from "./respondentSubmission.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

/**
 * create respondent submission
 * @param req - request
 * @param res - response
 * @returns response
 */

const createRespondentSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await RespondentSubmissionService.createRespondentSubmissionIntoDB(
        req.user!,
        req.body
      );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Respondent submission created successfully",
      data: result,
    });
  }
);

/**
 * get all respondent submission
 * @param req - request
 * @param res - response
 * @returns response
 */
const getAllRespondentSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await RespondentSubmissionService.getAllRespondentSubmissionFromDB(
        req.query
      );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Respondent submission retrieved successfully",
      pagination: result.meta,
      data: result.result,
    });
  }
);

/**
 * get single respondent submission
 * @param req - request
 * @param res - response
 * @returns response
 */
const getSingleRespondentSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await RespondentSubmissionService.getSingleRespondentSubmissionFromDB(
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

/**
 * update respondent submission
 * @param req - request
 * @param res - response
 * @returns response
 */
const updateRespondentSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await RespondentSubmissionService.updateRespondentSubmissionFromDB(
        req.params.id,
        req.body
      );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Respondent submission updated successfully",
      data: result,
    });
  }
);

/**
 * delete respondent submission
 * @param req - request
 * @param res - response
 * @returns response
 */
const deleteRespondentSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await RespondentSubmissionService.deleteRespondentSubmissionFromDB(
        req.params.id
      );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Respondent submission deleted successfully",
      data: result,
    });
  }
);

export const RespondentSubmissionController = {
  createRespondentSubmission,
  getAllRespondentSubmission,
  getSingleRespondentSubmission,
  updateRespondentSubmission,
  deleteRespondentSubmission,
};
