import { NextFunction, Request, Response, Router } from "express";
import { AppealRequestFormController } from "./appealRequestForm.controller";
import { USER_ROLES } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AppealRequestFormValidation } from "./appealRequestForm.validation";
import fileUploadHandler from "../../middlewares/fileUploaderHandler";
import { getMultipleFilesPath } from "../../../shared/getFilePath";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";

const router = Router();

router
  .route("/request")
  .post(
    auth(USER_ROLES.USER),
    fileUploadHandler() as any,
    validateRequest(
      AppealRequestFormValidation.createAppealRequestFormValidation
    ),
    async (req: any, _res: Response, next: NextFunction) => {
      try {
        const supportingDocument = getMultipleFilesPath(
          req.files,
          "supportingDocument"
        );
        if (!supportingDocument || supportingDocument.length === 0) {
          return next(
            new ApiError(
              StatusCodes.BAD_REQUEST,
              "Supporting documents are required"
            )
          );
        }
        req.body = {
          ...req.body,
          supportingDocument,
        };
        next();
      } catch (error) {
        next(
          new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error in creating appeal request form: ${error as string}`
          )
        );
      }
    },
    AppealRequestFormController.createAppealRequestForm
  )
  .get(
    auth(USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.SUPER_ADMIN),
    AppealRequestFormController.getAllAppealRequestForm
  );

router
  .route("/request/:id")
  .get(
    auth(USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.SUPER_ADMIN),
    AppealRequestFormController.getSingleAppealRequestForm
  )
  .patch(
    auth(USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.SUPER_ADMIN),
    fileUploadHandler() as any,
    async (req: any, _res: Response, next: NextFunction) => {
      const supportingDocument = getMultipleFilesPath(
        req.files,
        "supportingDocument"
      );

      req.body = {
        ...req.body,
        supportingDocument,
      };
      next();
    },
    validateRequest(
      AppealRequestFormValidation.updateAppealRequestFormValidation
    ),
    AppealRequestFormController.updateAppealRequestForm
  )
  .delete(
    auth(USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.SUPER_ADMIN),
    AppealRequestFormController.deleteAppealRequestForm
  );

export const AppealRequestFormRoutes = router;
