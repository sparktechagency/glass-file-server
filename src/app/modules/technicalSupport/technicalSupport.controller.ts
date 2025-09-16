import catchAsync from "../../../shared/catchAsync";
import { StatusCodes } from "http-status-codes";
import { TechnicalSupportService } from "./technicalSupport.service";
import { NextFunction, Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";


/**
 * create technical support
 */
const createTechnicalSupport = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await TechnicalSupportService.createTechnicalSupportIntoDB(payload, req.user!);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Technical support created successfully',
        data: result,
    })
})

/**
 * get all technical support
 */
const getAllTechnicalSupport = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await TechnicalSupportService.getAllTechnicalSupportFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Technical support retrieved successfully',
        pagination:result.meta,
        data: result.data,
    });
})

/**
 * get single technical support
 */
const getSingleTechnicalSupport = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await TechnicalSupportService.getSingleTechnicalSupportFromDB(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Technical support retrieved successfully',
        data: result,
    });
})



/**
 * update technical support
 */
const updateTechnicalSupport = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await TechnicalSupportService.updateTechnicalSupportFromDB(req.params.id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Technical support updated successfully',
        data: result,
    });
})


/**
 * delete technical support
 */
const deleteTechnicalSupport = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await TechnicalSupportService.deleteTechnicalSupportFromDB(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Technical support deleted successfully',
        data: result,
    });
})

export const TechnicalSupportController = {
    createTechnicalSupport,
    getAllTechnicalSupport,
    getSingleTechnicalSupport,
    updateTechnicalSupport,
    deleteTechnicalSupport
}

