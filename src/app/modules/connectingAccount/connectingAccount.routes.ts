import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import { connectingAccountController } from "./connectingAccount.controller";

const router = Router();
router
  .route("/create")
  .post(
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    connectingAccountController.createAccountIntoStripe
  );

export const ConnectingAccountRoutes = router;
