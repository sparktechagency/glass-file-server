import { NextFunction, Request, Response, Router } from "express";
import { InitialSubmissionController } from "./initialSubmission.controller";
import validateRequest from "../../middlewares/validateRequest";
import { InitialSubmissionValidation } from "./initialSubmission.validation";
import { USER_ROLES } from "../../../enums/user";
import auth from "../../middlewares/auth";
import fileUploadHandler from "../../middlewares/fileUploaderHandler";
import { getMultipleFilesPath } from "../../../shared/getFilePath";
const router = Router();

router
  .route("/submission")
  // create initial submission
  .post(
    auth(USER_ROLES.USER),
    fileUploadHandler() as any,

    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const payload = req.body;
        const evidence = getMultipleFilesPath(req.files, "evidence");
        if (!evidence) {
          res.status(400).json({ message: "Evidence are required" });
        }

        const parsedPayload = {
          ...payload,
          evidence,
        };
        req.body = parsedPayload;
        next();
      } catch (error) {
        console.log(error);
        next(error);
      }
    },
    validateRequest(
      InitialSubmissionValidation.createInitialSubmissionZodSchema
    ),
    InitialSubmissionController.createInitialSubmission
  )

  // get all initial submission
  .get(
    auth(USER_ROLES.MODERATOR, USER_ROLES.USER),
    InitialSubmissionController.getAllInitialSubmission
  );
// get single initial submission
router
  .route("/submission/:id")
  .get(
    auth(USER_ROLES.MODERATOR, USER_ROLES.USER),
    InitialSubmissionController.getSingleInitialSubmission
  )
  // update initial submission
  .patch(
    auth(USER_ROLES.MODERATOR, USER_ROLES.USER),
    fileUploadHandler() as any,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const payload = req.body;
        const evidence = getMultipleFilesPath(req.files, "evidence");

        const parsedPayload = {
          ...payload,
          evidence,
        };
        req.body = parsedPayload;
        next();
      } catch (error) {
        console.log(error);
        next(error);
      }
    },
    validateRequest(
      InitialSubmissionValidation.updateInitialSubmissionZodSchema
    ),
    InitialSubmissionController.updateInitialSubmission
  )

  // delete initial submission
  .delete(
    auth(USER_ROLES.MODERATOR, USER_ROLES.USER),
    InitialSubmissionController.deleteInitialSubmission
  );

export const InitialSubmissionRoutes = router;
