import { Router } from "express";
import { jurorDecissionController } from "./jurorDecisions.controller";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";

const router = Router();
router.patch("/vote/:id", auth(USER_ROLES.JUROR), jurorDecissionController.giveJurorDicisions);


export const jurorDecissionRoutes = router;