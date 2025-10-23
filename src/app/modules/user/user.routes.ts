import express from "express";
import { USER_ROLES } from "../../../enums/user";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import fileUploadHandler from "../../middlewares/fileUploaderHandler";
const router = express.Router();

router.get(
  "/profile",
  auth(USER_ROLES.MODERATOR, USER_ROLES.USER, USER_ROLES.SUPER_ADMIN, USER_ROLES.JUROR, USER_ROLES.DOCUMENTS),
  UserController.getUserProfile
);

router.post(
  "/create-admin",
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);

router
  .route("/")
  .post(UserController.createUser)
  .patch(
    auth(USER_ROLES.MODERATOR, USER_ROLES.USER),
    fileUploadHandler() as any,
    UserController.updateProfile
  );

export const UserRoutes = router;
