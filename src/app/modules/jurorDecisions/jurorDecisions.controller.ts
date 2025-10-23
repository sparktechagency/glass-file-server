import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { jurorDecissionService } from "./jurorDecisions.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const giveJurorDicisions = catchAsync(async (req: Request, res: Response) => {
    const result = await jurorDecissionService.giveInitialSubmittionJorurVote(req.params.id, req.user!, req.body)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Juror Decisions Given Successfully',
        data: result
    })
})


export const jurorDecissionController = {
    giveJurorDicisions
}