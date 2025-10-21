import { JwtPayload } from "jsonwebtoken";
import { IRespondentSubmission } from "./respondentSubmission.interface";
import { RespondentSubmission } from "./respondentSubmission.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";

/**
 * create respondent submission
 * @param user - user id
 * @param payload - respondent submission payload
 * @returns respondent submission
 */
const createRespondentSubmissionIntoDB = async (
  user: JwtPayload,
  payload: IRespondentSubmission
) => {
  payload.user = user.id;
  const result = await RespondentSubmission.create(payload);
  if (!result) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to create respondent submission"
    );
  }
  return result;
};

/**
 * get all respondent submission
 * @param query - query params
 * @returns respondent submission
 */
const getAllRespondentSubmissionFromDB = async (
  query: Record<string, unknown>
) => {
  const queryBuilder = new QueryBuilder(
    RespondentSubmission.find().lean(),
    query
  )
    .filter()
    .sort()
    .search([
      "responseDeclaration",
      "evidence",
      "signature",
      "signatureDate",
      "ipAddress",
      "submissionType",
      "progressStatus",
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

/**
 * get single respondent submission
 * @param id - respondent submission id
 * @returns respondent submission
 */
const getSingleRespondentSubmissionFromDB = async (id: string) => {
  const result = await RespondentSubmission.findById(id).lean().exec();
  if (!result) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "Failed to get respondent submission"
    );
  }
  return result;
};

/**
 * update respondent submission
 * @param id - respondent submission id
 * @param payload - respondent submission payload
 * @returns respondent submission
 */
const updateRespondentSubmissionFromDB = async (
  id: string,
  payload: IRespondentSubmission
) => {
  const result = await RespondentSubmission.findByIdAndUpdate(id, payload, {
    new: true,
  })
    .lean()
    .exec();
  if (!result) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to update respondent submission"
    );
  }
  return result;
};

/**
 * delete respondent submission
 * @param id - respondent submission id
 * @returns respondent submission
 */
const deleteRespondentSubmissionFromDB = async (id: string) => {
  const result = await RespondentSubmission.findByIdAndDelete(id).lean().exec();
  if (!result) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to delete respondent submission"
    );
  }
  return result;
};

export const RespondentSubmissionService = {
  createRespondentSubmissionIntoDB,
  getAllRespondentSubmissionFromDB,
  getSingleRespondentSubmissionFromDB,
  updateRespondentSubmissionFromDB,
  deleteRespondentSubmissionFromDB,
};
