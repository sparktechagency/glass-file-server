import { Router } from "express";
import { DashboardSubmittionController } from "./dashboardSubmittion.controller";
import { USER_ROLES } from "../../../enums/user";
import auth from "../../middlewares/auth";

const router = Router();
router.get(
  "/initial",
  auth(USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.SUPER_ADMIN),
  DashboardSubmittionController.getDashboardIntialSubmission
);
router.get(
  "/misuse",
  auth(USER_ROLES.USER, USER_ROLES.SUPER_ADMIN, USER_ROLES.JUROR),
  DashboardSubmittionController.getDashboardMisuseReport
);
router.get(
  "/appeal",
  auth(USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.SUPER_ADMIN),
  DashboardSubmittionController.getDashboardAppealRequest
);
router.get(
  "/respondent",
  auth(USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.SUPER_ADMIN),
  DashboardSubmittionController.getDashboardRespondentSubmission
);

export const DashboardSubmittionRoutes = router;
