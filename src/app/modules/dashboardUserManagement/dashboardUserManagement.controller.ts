import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import { DashboardUserManagementService } from "./dashboardUserManagement.service";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";

// get all users
const getAllUsersFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardUserManagementService.getAllUsersFromDB(
    req.query
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "All users retrieved successfully",
    // @ts-ignore
    pagination: result.meta,
    // @ts-ignore
    data: result.data,
  });
});

// update user role
const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardUserManagementService.updateUserRole(
    req.params.id,
    req.body.role
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,

    message: "User role updated successfully",
    data: result,
  });
});

// create user as a super admin
const createUserAsSuperAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DashboardUserManagementService.createUserAsSuperAdmin(
      req.body
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "User created successfully",
      data: result,
    });
  }
);

export const DashboardUserManagementController = {
  getAllUsersFromDB,
  updateUserRole,
  createUserAsSuperAdmin,
};
