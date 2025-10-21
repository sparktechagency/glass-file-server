import catchAsync from "../../../shared/catchAsync";
import { AppealRequestFormService } from "./appealRequestForm.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const createAppealRequestForm = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AppealRequestFormService.createAppealRequestFormIntoDB(
      req.user!,
      req.body
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Appeal request form created successfully",
      data: result,
    });
  }
);

const getAllAppealRequestForm = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AppealRequestFormService.getAllAppealRequestFormFromDB(
      req.query
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Appeal request form retrieved successfully",
      pagination: result.meta,
      data: result?.result,
    });
  }
);

const getSingleAppealRequestForm = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AppealRequestFormService.getSingleAppealRequestFormFromDB(
        req.params.id
      );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Appeal request form retrieved successfully",
      data: result,
    });
  }
);

const updateAppealRequestForm = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AppealRequestFormService.updateAppealRequestFormIntoDB(
      req.params.id,
      req.body
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Appeal request form updated successfully",
      data: result,
    });
  }
);

const deleteAppealRequestForm = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AppealRequestFormService.deleteAppealRequestFormFromDB(
      req.params.id
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Appeal request form deleted successfully",
      data: result,
    });
  }
);

export const AppealRequestFormController = {
  createAppealRequestForm,
  getAllAppealRequestForm,
  getSingleAppealRequestForm,
  updateAppealRequestForm,
  deleteAppealRequestForm,
};
