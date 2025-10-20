import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { InitialSubmissionRoutes } from "../modules/initialSubmission/initialSubmission.routes";
import { MisuseReportRoutes } from "../modules/misuseReport/misuseReport.routes";
import { TechnicalSupportRoutes } from "../modules/technicalSupport/technicalSupport.routes";
import { initialSubmissionPayRoutes } from "../modules/initialSubmissionPay/initialSubmissionPay.routes";
import { ConnectingAccountRoutes } from "../modules/connectingAccount/connectingAccount.routes";

const router = express.Router();

const apiRoutes = [
  { path: "/user", route: UserRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/initial", route: InitialSubmissionRoutes },
  { path: "/misuse", route: MisuseReportRoutes },
  { path: "/technical", route: TechnicalSupportRoutes },
  { path: "/initial-submission", route: initialSubmissionPayRoutes },
  { path: "/connecting-account", route: ConnectingAccountRoutes },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
