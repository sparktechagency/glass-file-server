import { InitialSubmission } from "../initialSubmission/initialSubmission.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { MisuseReportModal } from "../misuseReport/misuseReport.model";
import { AppealRequestForm } from "../appealRequestForm/appealRequestForm.model";
import { RespondentSubmission } from "../respondentSubmission/respondentSubmission.model";

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

export const DashboardSubmittionService = {
  getDashboardIntialSubmission,
  getDashboardMisuseReport,
  getDashboardAppealRequest,
  getDashboardRespondentSubmission,
};
