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

// update status
router.patch(
  "/initial/:id",
  auth(USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.SUPER_ADMIN),
  DashboardSubmittionController.updateStatusOfInitialSubmission
);

router.patch(
  "/misuse/:id",
  auth(USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.SUPER_ADMIN),
  DashboardSubmittionController.updateStatusOfMisuseReport
);

router.patch(
  "/appeal/:id",
  auth(USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.SUPER_ADMIN),
  DashboardSubmittionController.updateStatusOfAppealRequest
);

router.patch(
  "/respondent/:id",
  auth(USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.SUPER_ADMIN),
  DashboardSubmittionController.updateStatusOfRespondentSubmission
);

// get single submission
router.get(
  "/initial/:id",
  auth(USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.SUPER_ADMIN),
  DashboardSubmittionController.getSingleInitialSubmission
);

router.get(
  "/misuse/:id",
  auth(USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.SUPER_ADMIN),
  DashboardSubmittionController.getSingleMisuseReport
);

router.get(
  "/appeal/:id",
  auth(USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.SUPER_ADMIN),
  DashboardSubmittionController.getSingleAppealRequest
);

router.get(
  "/respondent/:id",
  auth(USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.SUPER_ADMIN),
  DashboardSubmittionController.getSingleRespondentSubmission
);

export const DashboardSubmittionRoutes = router;
