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
    pagination: result.meta,
    data: result.data,
  });
});

// take action on user
const takeActionOnUser = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardUserManagementService.takeActionOnUserIntoDB(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User action taken successfully",
    data: result,
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

const getSingleUserAsAAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await DashboardUserManagementService.getSingleUserFromDBAsAdmin(
        // @ts-ignore
        // req.user!,
        req.params.id
      );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User fetched successfully",
      data: result,
    });
  }
);

export const DashboardUserManagementController = {
  getAllUsersFromDB,
  updateUserRole,
  createUserAsSuperAdmin,
  takeActionOnUser,
  getSingleUserAsAAdmin,
};
