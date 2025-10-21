import { InitialSubmission } from "../initialSubmission/initialSubmission.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { MisuseReportModal } from "../misuseReport/misuseReport.model";
import { AppealRequestForm } from "../appealRequestForm/appealRequestForm.model";
import { RespondentSubmission } from "../respondentSubmission/respondentSubmission.model";
import { STATUS } from "../../../enums/status";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";

// initial submission service
const getDashboardIntialSubmission = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(InitialSubmission.find({}), query)
    .paginate()
    .sort()
    .filter()
    .search([
      "fastName",
      "middleName",
      "lastName",
      "respondentFastName",
      "respondentMiddleName",
      "respondentLastName",
      "respondentEmail",
      "allegation",
      "evidence",
      "link",
      "document",
      "status",
      "paymentIntentId",
      "caseId",
      "isPaid",
      "submittionType",
    ])
    .fields();
  const data = await result.modelQuery.lean().exec();
  const meta = await result.getPaginationInfo();
  if (!data) {
    return {
      data: [],
      meta,
    };
  }
  return { data, meta };
};

// misuse report dashboard service
const getDashboardMisuseReport = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(MisuseReportModal.find({}), query)
    .paginate()
    .sort()
    .filter()
    .search([
      "userName",
      "caseId",
      "khowThisPerson",
      "natureOfTheReported",
      "subjectOfTheComplaint",
      "description",
      "supportingDocument",
      "link",
      "resolutionRequested",
      "affirmationAndSignature",
      "submissionType",
      "progressStatus",
      "user",
    ]);
  const data = await result.modelQuery.lean().exec();
  const meta = await result.getPaginationInfo();
  if (!data) {
    return {
      data: [],
      meta,
    };
  }
  return { data, meta };
};

// appeal request dashboard service
const getDashboardAppealRequest = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(AppealRequestForm.find({}), query)
    .paginate()
    .sort()
    .filter()
    .search([
      "appealGrounds",
      "supportingDocument",
      "justification",
      "reviewOption",
      "declarationAndSubmission",
      "submissionType",
      "progressStatus",
      "user",
    ]);
  const data = await result.modelQuery.lean().exec();
  const meta = await result.getPaginationInfo();
  if (!data) {
    return {
      data: [],
      meta,
    };
  }
  return { data, meta };
};

// respondent submission dashboard service
const getDashboardRespondentSubmission = async (
  query: Record<string, unknown>
) => {
  const result = new QueryBuilder(RespondentSubmission.find({}), query)
    .paginate()
    .sort()
    .filter()
    .search([
      "responseDeclaration",
      "evidence",
      "signature",
      "signatureDate",
      "ipAddress",
      "submissionType",
      "progressStatus",
      "user",
    ]);
  const data = await result.modelQuery.lean().exec();
  const meta = await result.getPaginationInfo();
  if (!data) {
    return {
      data: [],
      meta,
    };
  }
  return { data, meta };
};

//TODO: update status of initial submission
const updateStatusOfInitialSubmission = async (id: string, status: STATUS) => {
  const initialSubmission = await InitialSubmission.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  )
    .lean()
    .exec();
  if (!initialSubmission) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Failed to update initial submission"
    );
  }
  return initialSubmission;
};

// update status of misuse report
const updateStatusOfMisuseReport = async (id: string, status: STATUS) => {
  const misuseReport = await MisuseReportModal.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  )
    .lean()
    .exec();
  if (!misuseReport) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Failed to update misuse report"
    );
  }
  return misuseReport;
};

// update status of appeal request
const updateStatusOfAppealRequest = async (id: string, status: STATUS) => {
  const appealRequest = await AppealRequestForm.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  )
    .lean()
    .exec();
  if (!appealRequest) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Failed to update appeal request"
    );
  }
  return appealRequest;
};

// update status of respondent submission
const updateStatusOfRespondentSubmission = async (
  id: string,
  status: STATUS
) => {
  const respondentSubmission = await RespondentSubmission.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  )
    .lean()
    .exec();
  if (!respondentSubmission) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Failed to update respondent submission"
    );
  }
  return respondentSubmission;
};

// TODO: get single submission
const getSingleInitialSubmission = async (id: string) => {
  const initialSubmission = await InitialSubmission.findById(id).lean().exec();
  if (!initialSubmission) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Initial submission not found");
  }
  return initialSubmission;
};

const getSingleMisuseReport = async (id: string) => {
  const misuseReport = await MisuseReportModal.findById(id).lean().exec();
  if (!misuseReport) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Misuse report not found");
  }
  return misuseReport;
};

const getSingleAppealRequest = async (id: string) => {
  const appealRequest = await AppealRequestForm.findById(id).lean().exec();
  if (!appealRequest) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Appeal request not found");
  }
  return appealRequest;
};

const getSingleRespondentSubmission = async (id: string) => {
  const respondentSubmission = await RespondentSubmission.findById(id)
    .lean()
    .exec();
  if (!respondentSubmission) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Respondent submission not found"
    );
  }
  return respondentSubmission;
};

export const DashboardSubmittionService = {
  getDashboardIntialSubmission,
  getDashboardMisuseReport,
  getDashboardAppealRequest,
  getDashboardRespondentSubmission,

  //   update status
  updateStatusOfInitialSubmission,
  updateStatusOfMisuseReport,
  updateStatusOfAppealRequest,
  updateStatusOfRespondentSubmission,
  //   get single submission
  getSingleInitialSubmission,
  getSingleMisuseReport,
  getSingleAppealRequest,
  getSingleRespondentSubmission,
};
