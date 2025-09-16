import { Router } from "express";
import { MisuseReportController } from "./misuseReport.controller";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import validateRequest from "../../middlewares/validateRequest";
import { MisuseReportValidation } from "./misuseReport.validation";
import fileUploadHandler from "../../middlewares/fileUploaderHandler";
import { NextFunction, Request, Response } from "express";
import { getMultipleFilesPath } from "../../../shared/getFilePath";
const router = Router();

router
  .route("/report")
  .post(
    auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    fileUploadHandler() as any,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
          const payload = req.body;
          const supportingDocument = getMultipleFilesPath(req.files, "supportingDocument");
    
          if (!supportingDocument || supportingDocument.length === 0) {
            return res.status(400).json({ message: "Supporting documents are required" });
          }
    
          req.body = {
            ...payload,
            supportingDocument,
            khowThisPerson: req.body.khowThisPerson === "true",
            affirmationAndSignature: req.body.affirmationAndSignature === "true",
          };
    
          next();
        } catch (error) {
          next(error);
        }
    },
    validateRequest(MisuseReportValidation.createMisuseReportValidation),
    MisuseReportController.createMisuseReport
  )
  .get(
    auth(USER_ROLES.ADMIN, USER_ROLES.USER),
    MisuseReportController.getAllMisuseReport
  );

router
  .route("/report/:id")
  .get(
    auth(USER_ROLES.ADMIN, USER_ROLES.USER),
    MisuseReportController.getSingleMisuseReport
  )
  .patch(
    auth(USER_ROLES.ADMIN, USER_ROLES.USER),
    fileUploadHandler() as any,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const payload = req.body;
        const supportingDocument = getMultipleFilesPath(req.files, "supportingDocument");
        req.body = {
            ...payload,
            supportingDocument,
            khowThisPerson: req.body.khowThisPerson === "true",
            affirmationAndSignature: req.body.affirmationAndSignature === "true",
          };
        next();
      } catch (error) {
        next(error);
      }
    },
    validateRequest(MisuseReportValidation.updateMisuseReportValidation),
    MisuseReportController.updateMisuseReport
  )
  .delete(
    auth(USER_ROLES.ADMIN, USER_ROLES.USER),
    MisuseReportController.deleteMisuseReport
  );

export const MisuseReportRoutes = router;