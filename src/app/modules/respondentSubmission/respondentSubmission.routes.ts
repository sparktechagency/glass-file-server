import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLES } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { RespondentSubmissionController } from "./respondentSubmission.controller";
import { RespondentSubmissionValidation } from "./respondentSubmission.validation";
import fileUploadHandler from "../../middlewares/fileUploaderHandler";
import { getMultipleFilesPath } from "../../../shared/getFilePath";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";

const router = Router();

router
  .route("/submission")

  // create respondent submission
  .post(
    auth(
      USER_ROLES.USER,
      USER_ROLES.MODERATOR,
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.JUROR,
      USER_ROLES.DOCUMENTS
    ),
    fileUploadHandler() as any,
    validateRequest(
      RespondentSubmissionValidation.createRespondentSubmissionValidation
    ),
    async (req: Request, _res: Response, next: NextFunction) => {
      try {
        const payload = req.body;
        const evidence = getMultipleFilesPath(req.files, "evidence");
        if (!evidence) {
          return next(
            new ApiError(StatusCodes.BAD_REQUEST, "Evidence are required")
          );
        }
        req.body = {
          ...payload,
          evidence,
        };
        next();
      } catch (error) {
        next(error);
      }
    },
    RespondentSubmissionController.createRespondentSubmission
  )

  // get all respondent submission
  .get(
    auth(
      USER_ROLES.USER,
      USER_ROLES.MODERATOR,
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.JUROR
    ),
    RespondentSubmissionController.getAllRespondentSubmission
  );

/**
 * get single respondent submission
 * update respondent submission
 * delete respondent submission
 * */
router
  .route("/submission/:id")
  .get(
    auth(
      USER_ROLES.USER,
      USER_ROLES.MODERATOR,
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.JUROR
    ),
    RespondentSubmissionController.getSingleRespondentSubmission
  )
  .patch(
    auth(
      USER_ROLES.USER,
      USER_ROLES.MODERATOR,
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.JUROR
    ),
    fileUploadHandler() as any,
    async (req: Request, _res: Response, next: NextFunction) => {
      try {
        const payload = req.body;
        const evidence = getMultipleFilesPath(req.files, "evidence");
        req.body = {
          ...payload,
          evidence,
        };
        next();
      } catch (error) {
        next(error);
      }
    },
    validateRequest(
      RespondentSubmissionValidation.updateRespondentSubmissionValidation
    ),
    RespondentSubmissionController.updateRespondentSubmission
  )
  .delete(
    auth(
      USER_ROLES.USER,
      USER_ROLES.MODERATOR,
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.JUROR
    ),
    RespondentSubmissionController.deleteRespondentSubmission
  );

export const RespondentSubmissionRoutes = router;
