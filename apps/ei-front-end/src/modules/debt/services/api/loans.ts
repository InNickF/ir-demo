import { PaginatedResponseSchema } from "@/commons/schemas/filters";
import { uploadFile } from "@/commons/services/api/processFileToS3";
import { privateAxios } from "@/commons/services/clients";
import { GenericFilterPayload, IPaginatedResponse } from "@/commons/typings";
import { querySerializer } from "@/commons/utils/query-serializer";
import {
  DebLoanAbstractFileSchema,
  DebtLoanCapSchema,
  DebtLoanContractFileSchema,
  DebtLoanCovenantTestingSchema,
  DebtLoanReportingSchema,
  DebtLoanRoomItemSchema,
  DebtLoanSchema,
  DebtLoanStatusSchema,
  DebtLoanSummarySchema,
  DebtLoanTimelineSchema,
} from "../../schemas/loans";
import {
  DebLoanAbstractFile,
  DebtLoan,
  DebtLoanAbstractFilePayload,
  DebtLoanCap,
  DebtLoanContractFile,
  DebtLoanContractFilePayload,
  DebtLoanContractPayload,
  DebtLoanPayload,
  DebtLoanRoomItemPayload,
  DebtLoanStatusPayload,
  DebtLoanTimeline,
  DebtUploadLoanRoomItemToS3,
  LegacyDebtLoanPayload,
} from "../../typings/loans";
import {
  LOAN_FILE_TYPES,
  legacyLoanAbstractFileFormatter,
  loanAbstractFileFormatter,
} from "../../utils";
import { getNewLoanSortingPayload } from "../../utils/getNewLoanSortingPayload";

export const getDebtLoans = async (
  filters: GenericFilterPayload
): Promise<IPaginatedResponse<DebtLoan>> => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/data-debt/loan-summary/${serializedQuery}`
  );

  return PaginatedResponseSchema(DebtLoanSchema).parse(response.data);
};

export const getDebtLoanSummary = async ({
  id,
}: {
  id: string;
} & GenericFilterPayload) => {
  const response = await privateAxios.get(
    `/data-debt/loan-summary/${id}/summary`
  );

  return DebtLoanSummarySchema.parse(response.data);
};

export const legacyPostDebtLoan = async ({
  abstract_file,
  property,
}: LegacyDebtLoanPayload): Promise<DebLoanAbstractFile> => {
  const { file: newFile, fileName } = legacyLoanAbstractFileFormatter({
    file: abstract_file,
    property: property?.value,
  });

  const payload = await uploadFile({
    file: newFile,
    module: "debt",
    s3Account: "data",
    url: `raw/manual_upload/loan_abstracts/${fileName}`,
    args: {
      type: LOAN_FILE_TYPES.LOAN_ABSTRACT_EXCEL_FILE,
      name: fileName,
    } as Omit<DebtLoanAbstractFilePayload, "key">,
  });

  const result = await privateAxios.post<DebLoanAbstractFile>(
    `/debt/loan-summary-attachments/`,
    payload
  );

  return DebLoanAbstractFileSchema.parse(result.data);
};

export const postDebtLoan = async ({
  abstract_file,
  properties,
  loan_name,
}: DebtLoanPayload): Promise<DebLoanAbstractFile> => {
  const { file: newFile, fileName } = loanAbstractFileFormatter({
    file: abstract_file,
    properties,
    loan_name,
  });

  const payload = await uploadFile({
    file: newFile,
    module: "debt",
    s3Account: "data",
    url: `raw/manual_upload/loan_abstracts/${fileName}`,
    args: {
      type: LOAN_FILE_TYPES.LOAN_ABSTRACT_EXCEL_FILE,
      name: fileName,
    } as Omit<DebtLoanAbstractFilePayload, "key">,
  });

  const result = await privateAxios.post<DebLoanAbstractFile>(
    `/debt/loan-summary-attachments/`,
    payload
  );

  return DebLoanAbstractFileSchema.parse(result.data);
};

export const postDebtContract = async ({
  contract_file,
  loan_abstract_id,
}: DebtLoanContractPayload): Promise<DebtLoanContractFile> => {
  if (!loan_abstract_id && !contract_file) {
    throw new Error("Loan id and contract file are required.");
  }

  const payload = await uploadFile({
    file: contract_file,
    module: "debt",
    url: `private/debt/loan_abstracts/${loan_abstract_id}/${contract_file.name}`,
    args: {
      type: LOAN_FILE_TYPES.LOAN_CONTRACT_FILE,
      name: contract_file.name,
      loan_abstract_id,
    } as Omit<DebtLoanContractFilePayload, "key">,
  });

  const result = await privateAxios.post<DebtLoanContractFile>(
    `/debt/loan-summary-attachments/`,
    payload
  );

  return DebtLoanContractFileSchema.parse(result.data);
};

export const getDebtLoanCovenantTesting = async ({
  id,
}: {
  id: string;
} & GenericFilterPayload) => {
  const response = await privateAxios.get(
    `/data-debt/loan-summary/${id}/covenant-testing/`
  );

  return DebtLoanCovenantTestingSchema.parse(response.data);
};

export const getDebtLoanReporting = async ({
  id,
}: {
  id: string;
} & GenericFilterPayload) => {
  const response = await privateAxios.get(
    `/data-debt/loan-summary/${id}/reporting/`
  );

  return DebtLoanReportingSchema.parse(response.data);
};

export const getDebtLoanTimeline = async ({
  filters,
}: {
  filters: GenericFilterPayload;
}) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/debt/loan-summary-timelines/${serializedQuery}`
  );

  return PaginatedResponseSchema(DebtLoanTimelineSchema).parse(response.data);
};

export const postDebtLoanTimeline = async (timeline: DebtLoanTimeline) => {
  const response = await privateAxios.post(
    `/debt/loan-summary-timelines/`,
    timeline
  );

  return response.data as string;
};

export const patchDebtLoanTimeline = async (timeline: DebtLoanTimeline) => {
  const response = await privateAxios.patch(
    `/debt/loan-summary-timelines/${timeline?.id}/`,
    timeline
  );

  return response.data as string;
};

export const deleteDebtLoanTimeline = async (timeline: DebtLoanTimeline) => {
  const response = await privateAxios.delete(
    `/debt/loan-summary-timelines/${timeline?.id}/`
  );

  return response.data as string;
};

export const uploadLoanRoomItemToS3 = async ({
  loan_abstract_id,
  item,
}: DebtUploadLoanRoomItemToS3) => {
  const result = await uploadFile({
    url: `/debt/loan_abstracts/${loan_abstract_id}/${item.file.name}`,
    file: item.file,
    args: {
      loan_abstract_id,
      name: item.name,
      type: item.type.value,
    } as Omit<DebtLoanRoomItemPayload, "key">,
  });

  return result;
};

export const uploadLoanRoomAbstractFileToS3 = async ({
  loan_abstract_id,
  item,
}: DebtUploadLoanRoomItemToS3) => {
  const { file, fileName } = legacyLoanAbstractFileFormatter({
    file: item.file,
  });

  const result = await uploadFile({
    file,
    module: "debt",
    s3Account: "data",
    url: `raw/manual_upload/loan_abstracts/${loan_abstract_id}/${fileName}`,
    args: {
      type: LOAN_FILE_TYPES.LOAN_ABSTRACT_EXCEL_FILE,
      name: fileName,
    } as Omit<DebtLoanAbstractFilePayload, "key">,
  });

  return result;
};

export const getDebtLoanRoom = async ({
  filters,
}: {
  filters: GenericFilterPayload;
}) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/debt/loan-summary-attachments/${serializedQuery}`
  );

  return PaginatedResponseSchema(DebtLoanRoomItemSchema).parse(response.data);
};

export const postDebtLoanRoomItem = async (item: DebtLoanRoomItemPayload) => {
  const response = await privateAxios.post(
    `/debt/loan-summary-attachments/`,
    item
  );

  return response.data as string;
};

export const patchDebtLoanRoomItem = async (item: DebtLoanRoomItemPayload) => {
  const body = {
    name: item?.name,
    key: item?.key,
    type: item?.type?.value,
    loan_abstract_id: item?.loan_abstract_id,
  };

  const response = await privateAxios.patch(
    `/debt/loan-summary-attachments/${item?.id}/`,
    body
  );

  return response.data as string;
};

export const deleteDebtLoanRoomItem = async (item: DebtLoanRoomItemPayload) => {
  const response = await privateAxios.delete(
    `/debt/loan-summary-attachments/${item?.id}/`
  );

  return response.data as string;
};

export interface PatchLoanOrderingParams {
  activeItem: DebtLoan;
  overItem: DebtLoan;
  filters?: GenericFilterPayload;
  isBelowOverItem: boolean;
}

export const patchLoanOrdering = async ({
  activeItem,
  overItem,
  isBelowOverItem,
}: PatchLoanOrderingParams) => {
  const payload = getNewLoanSortingPayload({
    activeItem,
    isBelowOverItem,
    overItem,
  });

  const response = await privateAxios.patch(
    `/data-debt/loan-summarys/${activeItem?.id}/`,
    payload
  );

  return DebtLoanSchema.parse(response.data);
};

export type PatchDebtLoanStatus = DebtLoanStatusPayload & {
  loan_abstract_id: string;
};

export const patchDebtLoanStatus = async ({
  is_loan_active,
  loan_name,
}: PatchDebtLoanStatus) => {
  const response = await privateAxios.patch(
    `/data-debt/loan-statuses/${loan_name}/`,
    {
      is_loan_active: is_loan_active,
    }
  );

  return DebtLoanStatusSchema.parse(response.data);
};

export type GetDebtLoanCapMappings = Pick<DebtLoanCap, "loan_name">;

export const getDebtLoanCapMappings = async ({
  loan_name,
}: GetDebtLoanCapMappings) => {
  const serializedQuery = querySerializer({ loan_name });

  const response = await privateAxios.get(
    `/data-debt/loan-cap-mappings/${serializedQuery}`
  );

  return PaginatedResponseSchema(DebtLoanCapSchema).parse(response.data);
};

export type PostDebtLoanCapMappings = DebtLoanCap;

export const postDebtLoanCapMappings = async (
  payload: PostDebtLoanCapMappings
) => {
  const response = await privateAxios.post(
    `/data-debt/loan-cap-mappings/`,
    payload
  );

  return DebtLoanCapSchema.parse(response.data);
};

export const patchDebtLoanCapMappings = async (
  payload: PostDebtLoanCapMappings
) => {
  const response = await privateAxios.patch(
    `/data-debt/loan-cap-mappings/${payload?.loan_name}/`,
    payload
  );

  return DebtLoanCapSchema.parse(response.data);
};
