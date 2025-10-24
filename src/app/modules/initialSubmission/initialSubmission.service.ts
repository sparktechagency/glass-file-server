import { StatusCodes } from "http-status-codes";
import { IInitialSubmission } from "./initialSubmission.interface";
import { InitialSubmission } from "./initialSubmission.model";
import ApiError from "../../../errors/ApiErrors";
import QueryBuilder from "../../builder/QueryBuilder";
import { JwtPayload } from "jsonwebtoken";
/*
    data come from input field
    create initial submission into database
*/

const createInitialSubmissionIntoDB = async (
  data: IInitialSubmission,
  user: JwtPayload
) => {
  data.user = user.id;
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timePart = Date.now().toString().slice(-4);
  data.caseId = `${randomPart}${timePart}`;
  const result = await InitialSubmission.create(data);
  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Failed to create initial submission`
    );
  }
  return result;
};

/**
 *  get All Initial Submission
 */
const getAllInitialSubmissionFromDB = async (
  query: Record<string, unknown>
) => {
  const result = new QueryBuilder(InitialSubmission.find().lean(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search([]);
  const data = await result.modelQuery.exec();
  const meta = await result.getPaginationInfo();
  if (!data) {
    return {
      data: [],
      meta,
    };
  }
  return { data, meta };
};

/*
  get single one
*/
const getSingleInitialSubmissionFromDB = async (id: string) => {
  const result = await InitialSubmission.findById(id);
  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Failed to get initial submission`
    );
  }
  return result;
};

/*
update initial submission
*/
const updateInitialSubmissionFromDB = async (
  id: string,
  data: IInitialSubmission
) => {
  const result = await InitialSubmission.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Failed to update initial submission`
    );
  }
  return result;
};

/*
delete initial submission
*/
const deleteInitialSubmissionFromDB = async (id: string) => {
  const result = await InitialSubmission.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Failed to delete initial submission`
    );
  }
  return result;
};

/**
 * Update submission status.
 * Only Admins or Moderators can perform this action.
 *
 * Flow:
 * 1. Validate input payload (status must be REVIEW ,APPROVED, REJECTED ).
 * 2. Ensure submission exists and not already finalized.
 * 3. Update status atomically and return updated document.
 */
const updateSubmissionStatus = async (
  id: string,
  payload: Partial<IInitialSubmission>
) => {
  const result = await InitialSubmission.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to update");
  }
  return result;
};

export const InitialSubmissionService = {
  createInitialSubmissionIntoDB,
  getAllInitialSubmissionFromDB,
  getSingleInitialSubmissionFromDB,
  updateInitialSubmissionFromDB,
  deleteInitialSubmissionFromDB,

  // for admin
  updateSubmissionStatus,
};
