import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import fileUploadHandler from "../../middlewares/fileUploaderHandler";
import { TechnicalSupportController } from "./technicalSupport.controller";
import { NextFunction, Request, Response } from "express";
import { getMultipleFilesPath } from "../../../shared/getFilePath";
import validateRequest from "../../middlewares/validateRequest";
import { TechnicalSupportValidation } from "./technicalSupport.validation";
const router = Router();

router
  .route("/support")
  .post(
    auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    fileUploadHandler() as any,
    validateRequest(TechnicalSupportValidation.createTechnicalSupportValidation),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const payload = req.body;
        const attachment = getMultipleFilesPath(req.files, "attachment");
        if (!attachment) {
          return res.status(400).json({ message: "Attachment is required" });
        }
        req.body = {
          ...payload,
          attachment,
          scheduleCall: req.body.scheduleCall === "true",
        };

        next();
      } catch (error) {
        next(error);
      }
    },
    TechnicalSupportController.createTechnicalSupport
  )
  .get(
    auth(USER_ROLES.ADMIN, USER_ROLES.USER),
    TechnicalSupportController.getAllTechnicalSupport
  );

router
  .route("/support/:id")
  .get(
    auth(USER_ROLES.ADMIN, USER_ROLES.USER),
    TechnicalSupportController.getSingleTechnicalSupport
  )
  .patch(
    auth(USER_ROLES.ADMIN, USER_ROLES.USER),
    fileUploadHandler() as any,
    validateRequest(TechnicalSupportValidation.updateTechnicalSupportValidation),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const payload = req.body;
        const attachment = getMultipleFilesPath(req.files, "attachment");
        req.body = {
          ...payload,
          attachment,
          scheduleCall: req.body.scheduleCall === "true",
        };
        next();
      } catch (error) {
        next(error);
      }
    },
    TechnicalSupportController.updateTechnicalSupport
  )
  .delete(
    auth(USER_ROLES.ADMIN, USER_ROLES.USER),
    TechnicalSupportController.deleteTechnicalSupport
  );


export const TechnicalSupportRoutes = router;
