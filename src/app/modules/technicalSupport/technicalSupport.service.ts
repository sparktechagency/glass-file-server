import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { ITechnicalSupportRoutes } from "./technicalSupport.interface";
import { JwtPayload } from "jsonwebtoken";
import { TechnicalSupportModal } from "./technicalSupport.model";
import QueryBuilder from "../../builder/QueryBuilder";

/**
 * create technical support into DB
 */
const createTechnicalSupportIntoDB = async (payload: ITechnicalSupportRoutes, user: JwtPayload) => {
    payload.user = user.id;
    const result = await TechnicalSupportModal.create(payload);
    if (!result) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "Failed to create technical support"
        );
    }
    return result;
};  

/**
 * get all technical support from DB
 */
const getAllTechnicalSupportFromDB = async (query: Record<string, unknown>) => {
    const result = new QueryBuilder(TechnicalSupportModal.find().lean(), query)
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
}


/**
 * get single technical support from DB
 */
const getSingleTechnicalSupportFromDB = async (id: string) => {
    const result = await TechnicalSupportModal.findById(id);
    if (!result) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "Failed to get technical support"
        );
    }
    return result;
}


/**
 * update technical support into DB
 */
const updateTechnicalSupportFromDB = async (id: string, payload: ITechnicalSupportRoutes) => {
    const result = await TechnicalSupportModal.findByIdAndUpdate(id, payload, { new: true });
    if (!result) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            `Failed to update technical support`
        );
    }
    return result;
}

/**
 * delete technical support from DB
 */
const deleteTechnicalSupportFromDB = async (id: string) => {
    const result = await TechnicalSupportModal.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "Failed to delete technical support"
        );
    }
    return result;
}


export const TechnicalSupportService = {
    createTechnicalSupportIntoDB,
    getAllTechnicalSupportFromDB,
    getSingleTechnicalSupportFromDB,
    updateTechnicalSupportFromDB,
    deleteTechnicalSupportFromDB,
}