// =========================================
// initial submittion jorur decision service
// =========================================

import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IInitialSubmission, IJurorDecision } from "../initialSubmission/initialSubmission.interface";
import { InitialSubmission } from "../initialSubmission/initialSubmission.model";
import { JwtPayload } from "jsonwebtoken";

const giveInitialSubmittionJorurVote = async (
  id: string,
  user: JwtPayload,
  payload: { jurorDecisions: IJurorDecision[] }
) => {
  const submission = await InitialSubmission.findById(id);
  if (!submission) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Submission not found");
  }

  payload.jurorDecisions.forEach(decision => {
    if (!decision.juror) decision.juror = user.id as any;
    submission?.jurorDecisions!.push(decision);
  });

  await submission.save();
  return submission;
};


export const jurorDecissionService = {
  giveInitialSubmittionJorurVote,
};
