import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { InitialSubmissionService } from "./initialSubmission.service";

// create initial submission
const createInitialSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const result = await InitialSubmissionService.createInitialSubmissionIntoDB(req.body, req.user!);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Initial submission created successfully',
      data: result,
    });
  }
);




const getAllInitialSubmission = catchAsync(async (req: Request, res: Response) => {
  const result = await InitialSubmissionService.getAllInitialSubmissionFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Initial submission retrieved successfully',
    pagination:result.meta,
    data: result.data,
  });
});

const getSingleInitialSubmission = catchAsync(async (req: Request, res: Response) => {
  const result = await InitialSubmissionService.getSingleInitialSubmissionFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Initial submission retrieved successfully',
    data: result,
  });
});


const updateInitialSubmission = catchAsync(async (req: Request, res: Response) => {
  const result = await InitialSubmissionService.updateInitialSubmissionFromDB(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Initial submission updated successfully',
    data: result,
  });
});


const deleteInitialSubmission = catchAsync(async (req: Request, res: Response) => {
  const result = await InitialSubmissionService.deleteInitialSubmissionFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Initial submission deleted successfully',
    data: result,
  });
});



export const InitialSubmissionController = {
  createInitialSubmission,
  getAllInitialSubmission,
  getSingleInitialSubmission,
  updateInitialSubmission,
  deleteInitialSubmission,
};