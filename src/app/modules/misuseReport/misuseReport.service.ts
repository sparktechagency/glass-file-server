import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IMisuseReport } from "./misuseReport.interface";
import { MisuseReportModal } from "./misuseReport.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { JwtPayload } from "jsonwebtoken";

/**
 * create misuse report into DB
 */
const createMisuseReportIntoDB = async (
  payload: IMisuseReport,
  user: JwtPayload
) => {
  payload.user = user.id;
  const result = await MisuseReportModal.create(payload);
  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Failed to create misuse report"
    );
  }
  return result;
};

/**
 * get all misuse report from DB
 */

const getAllMisuseReportFromDB = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(MisuseReportModal.find().lean(), query)
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

/**
 * get single misuse report from DB
 */

const getSingleMisuseReportFromDB = async (id: string) => {
  const result = await MisuseReportModal.findById(id);
  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to get misuse report");
  }
  return result;
};

/**
 * update misuse report into DB
 */

const updateMisusReportFromDB = async (id: string, payload: IMisuseReport) => {
  const result = await MisuseReportModal.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result || !result._id) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Failed to update misuse report`
    );
  }
  return result;
};

/**
 * delete misuse report from DB
 */

const deleteMisuseReportFromDB = async (id: string) => {
  const result = await MisuseReportModal.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Failed to delete misuse report"
    );
  }
  return result;
};

export const MisuseReportService = {
  createMisuseReportIntoDB,
  getAllMisuseReportFromDB,
  getSingleMisuseReportFromDB,
  updateMisusReportFromDB,
  deleteMisuseReportFromDB,
};
