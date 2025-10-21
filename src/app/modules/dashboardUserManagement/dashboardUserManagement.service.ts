import { StatusCodes } from "http-status-codes";
import { USER_ROLES } from "../../../enums/user";
import ApiError from "../../../errors/ApiErrors";
import { User } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { IUser } from "../user/user.interface";
import config from "../../../config";
import bcrypt from "bcrypt";

// get all users
const getAllUsersFromDB = async (query: Record<string, any>) => {
  const users = new QueryBuilder(User.find(), query)
    .search(["name", "email", "phone"])
    .sort()
    .filter()
    .paginate();
  const data = await users.modelQuery.lean().exec();
  const meta = users.getPaginationInfo();
  return { data, meta };
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
  if (data.provider === "email") {
    if (!data.password) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Password is required for email provider"
      );
    }
    const saltRounds = Number(config.bcrypt_salt_rounds) || 10;
    data.password = await bcrypt.hash(data.password, saltRounds);
    // optionally remove confirmPassword before create
    (data as any).confirmPassword = "";
  } else {
    data.password = "";
    (data as any).confirmPassword = "";
  }

  data.verified = true;
  const result = await User.findOne({ email: data.email });
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
};
