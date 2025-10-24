import catchAsync from "../../../shared/catchAsync";
import { MisuseReportService } from "./misuseReport.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";


/**
 * create misuse report
 */
const createMisuseReport = catchAsync(async (req: Request, res: Response) => {
    const result = await MisuseReportService.createMisuseReportIntoDB(req.body, req.user!);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Misuse report created successfully',
      data: result,
    });
})


/**
 * get all misuse report
 */
const getAllMisuseReport = catchAsync(async (req: Request, res: Response) => {
    const result = await MisuseReportService.getAllMisuseReportFromDB(req.query);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Misuse report retrieved successfully',
      pagination:result.meta,
      data: result.data,
    });
})



/**
 * get single misuse report
 */
const getSingleMisuseReport = catchAsync(async (req: Request, res: Response) => {
    const result = await MisuseReportService.getSingleMisuseReportFromDB(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Misuse report retrieved successfully',
      data: result,
    });
})


/**
 * update misuse report
 */
const updateMisuseReport = catchAsync(async (req: Request, res: Response) => {
    const result = await MisuseReportService.updateMisusReportFromDB(req.params.id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Misuse report updated successfully',
      data: result,
    });
})


/**
 * delete misuse report
 */
const deleteMisuseReport = catchAsync(async (req: Request, res: Response) => {
    const result = await MisuseReportService.deleteMisuseReportFromDB(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Misuse report deleted successfully',
      data: result,
    });
})


export const MisuseReportController = {
    createMisuseReport,
    getAllMisuseReport,
    getSingleMisuseReport,
    updateMisuseReport,
    deleteMisuseReport
}