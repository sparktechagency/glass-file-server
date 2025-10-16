import { Router } from "express";
import auth from "../../middlewares/auth";
import { InitialSubmissionPayController } from "./initialSubmissionPay.controller";
import { USER_ROLES } from "../../../enums/user";
import validateRequest from "../../middlewares/validateRequest";
import { InitialSubmissionPayValidation } from "./initialSubmissionPay.validation";

const router = Router();
/**
 * Create initial submission pay
 * @access Private
 * @route /api/v1/initialSubmissionPay/pay
 * @method POST | auth(USER_ROLES.USER) | validateRequest() | InitialSubmissionPayController.createInitialSubmissionPay
 * @method GET | auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN) | InitialSubmissionPayController.getAllInitialSubmissionPay
 **/
router
  .route("/pay")
  .post(
    auth(USER_ROLES.USER),
    validateRequest(
      InitialSubmissionPayValidation.createInitialSubmissionPaySchema
    ),
    InitialSubmissionPayController.createInitialSubmissionPay
  )
  .get(
    auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    InitialSubmissionPayController.getAllInitialSubmissionPay
  );

/**
 * Get single initial submission pay
 * @access Private
 * @route /api/v1/initialSubmissionPay/:id
 * @method GET | auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN) | InitialSubmissionPayController.getSingleInitialSubmissionPay
 * @method DELETE | auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN) | InitialSubmissionPayController.deleteInitialSubmissionPay
 *
 **/
router
  .route("/:id")
  .get(
    auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    InitialSubmissionPayController.getSingleInitialSubmissionPay
  )
  .delete(
    auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    InitialSubmissionPayController.deleteInitialSubmissionPay
  );

// Export router
export const initialSubmissionPayRoutes = router;
