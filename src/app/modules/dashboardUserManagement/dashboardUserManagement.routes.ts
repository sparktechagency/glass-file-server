import { Router } from "express";
import { USER_ROLES } from "../../../enums/user";
import { DashboardUserManagementController } from "./dashboardUserManagement.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { dashboardUserManagementValidation } from "./dashboardUserManagement.validation";

const router = Router();
router
  .route("/management")
  .post(
    auth(USER_ROLES.SUPER_ADMIN),
    DashboardUserManagementController.createUserAsSuperAdmin
  )
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.MODERATOR),
    DashboardUserManagementController.getAllUsersFromDB
  );

//get single user
router
  .route("/management/:id")
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.MODERATOR),
    DashboardUserManagementController.getSingleUserAsAAdmin
  );

// take action on user
router
  .route("/action/:id")
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.MODERATOR),
    validateRequest(dashboardUserManagementValidation.updateUserManagementData),
    DashboardUserManagementController.takeActionOnUser
  );

export const dashboardUserManagementRoutes = router;
