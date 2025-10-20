import { JwtPayload } from "jsonwebtoken";
import { IAppealRequestForm } from "./appealRequestForm.interface";
import { AppealRequestForm } from "./appealRequestForm.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";

const createAppealRequestFormIntoDB = async (
  user: JwtPayload,
  data: IAppealRequestForm
) => {
  data.user = user.id;
  const result = await AppealRequestForm.create(data);
  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Failed to create appeal request form"
    );
  }
  return result;
};

const getAllAppealRequestFormFromDB = async (
  query: Record<string, unknown>
) => {
  const queryBuilder = new QueryBuilder(AppealRequestForm.find().lean(), query)
    .filter()
    .sort()
    .search([
      "submittionType",
      "appealGrounds",
      "justification",
      "reviewOption",
      "declarationAndSubmission",
    ])
    .paginate()
    .fields();
  const result = await queryBuilder.modelQuery.lean().exec();
  const meta = await queryBuilder.getPaginationInfo();
  if (!result) {
    return {
      data: [],
      meta,
    };
  }
  return { result, meta };
};

const getSingleAppealRequestFormFromDB = async (id: string) => {
  const result = await AppealRequestForm.findById(id).lean();
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Appeal request form not found");
  }
  return result;
};

const updateAppealRequestFormIntoDB = async (
  id: string,
  data: IAppealRequestForm
) => {
  const result = await AppealRequestForm.findByIdAndUpdate(id, data, {
    new: true,
  }).lean();
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Appeal request form not found");
  }
  return result;
};

const deleteAppealRequestFormFromDB = async (id: string) => {
  const result = await AppealRequestForm.findByIdAndDelete(id).lean();
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Appeal request form not found");
  }
  return result;
};

export const AppealRequestFormService = {
  createAppealRequestFormIntoDB,
  getAllAppealRequestFormFromDB,
  getSingleAppealRequestFormFromDB,
  updateAppealRequestFormIntoDB,
  deleteAppealRequestFormFromDB,
};
