import { StatusCodes } from "http-status-codes";
import { USER_ROLES } from "../../../enums/user";
import ApiError from "../../../errors/ApiErrors";
import { User } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { IUser } from "../user/user.interface";
import config from "../../../config";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";

// get all users
const getAllUsersFromDB = async (query: Record<string, any>) => {
  // TODO: Need how much submittion this user submit need to implement it.
  const users = new QueryBuilder(User.find(), query)
    .search(["name", "email", "phone"])
    .sort()
    .filter()
    .paginate();
  const data = await users.modelQuery.lean().exec();
  const meta = await users.getPaginationInfo();
  return { data, meta };
};

// take action on user

const takeActionOnUserIntoDB = async (id: string, payload: IUser) => {
  const result = await User.findById(id);
  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User not found");
  }
  const user = await User.findByIdAndUpdate(id, payload, { new: true })
    .lean()
    .exec();
  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User not found");
  }
  return user;
};

// get single user useing id
const getSingleUserFromDBAsAdmin = async (id: string) => {
  // const userDetails = user.id;
  const userData = await User.findById(id);
  if (!userData) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User Not found");
  }
  return userData;
};

//TODO: update user role
const updateUserRole = async (id: string, role: USER_ROLES) => {
  const user = await User.findByIdAndUpdate(id, { role }, { new: true })
    .lean()
    .exec();
  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User not found");
  }
  return user;
};

// create user as a super admin
const createUserAsSuperAdmin = async (data: IUser) => {
  if (!data.email) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Email is required");
  }

  if (!data.role) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User role is required");
  }
  const result = await User.findOne({ email: data.email }).select("+password");

  data.verified = true;

  if (result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User already exists");
  }

  const user = await User.create(data);
  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create user");
  }
  return user;
};

export const DashboardUserManagementService = {
  getAllUsersFromDB,
  updateUserRole,
  createUserAsSuperAdmin,
  takeActionOnUserIntoDB,
  getSingleUserFromDBAsAdmin,
};
