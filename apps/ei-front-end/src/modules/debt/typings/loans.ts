import { z } from "zod";
import {
  DebLoanAbstractFileSchema,
  DebLoanContractFilePayloadSchema,
  DebtLoanAbstractFilePayloadSchema,
  DebtLoanCapSchema,
  DebtLoanContractFileSchema,
  DebtLoanContractPayloadSchema,
  DebtLoanCovenantTestingContentKeysSchema,
  DebtLoanCovenantTestingDetailSchema,
  DebtLoanPayloadSchema,
  DebtLoanReportingDetailSchema,
  DebtLoanReportingSchema,
  DebtLoanRoomItemSchema,
  DebtLoanSchema,
  DebtLoanStatusPayloadSchema,
  DebtLoanStatusSchema,
  DebtLoanSummaryContentKeysSchema,
  DebtLoanSummaryDetailSchema,
  DebtLoanSummarySchema,
  DebtLoanTimelineSchema,
  DebtLocalLoanRoomItemSchema,
  DebtUploadLoanRoomItemToS3Schema,
  LegacyDebtLoanPayloadSchema,
} from "../schemas/loans";

export type DebtLoan = z.infer<typeof DebtLoanSchema>;

export type DebtLoanSummary = z.infer<typeof DebtLoanSummarySchema>;

export type DebtLoanContentKeys = z.infer<
  typeof DebtLoanSummaryContentKeysSchema
>;

export type DebtLoanCovenantTestingContentKeys = z.infer<
  typeof DebtLoanCovenantTestingContentKeysSchema
>;

export type DebtLoanSummaryDetail = z.infer<typeof DebtLoanSummaryDetailSchema>;

export type DebtLoanCovenantTestingDetail = z.infer<
  typeof DebtLoanCovenantTestingDetailSchema
>;

export type DebtLoanReporting = z.infer<typeof DebtLoanReportingSchema>;

export type DebtLoanReportingDetail = z.infer<
  typeof DebtLoanReportingDetailSchema
>;

export type LegacyDebtLoanPayload = Omit<
  z.infer<typeof LegacyDebtLoanPayloadSchema>,
  "abstract_file"
> & {
  abstract_file?: File;
};

export type DebtLoanPayload = Omit<
  z.infer<typeof DebtLoanPayloadSchema>,
  "abstract_file"
> & {
  abstract_file?: File;
};

export type DebtLoanContractPayload = Omit<
  z.infer<typeof DebtLoanContractPayloadSchema>,
  "contract_file"
> & {
  contract_file?: File;
};

export type DebtLoanAbstractFilePayload = z.infer<
  typeof DebtLoanAbstractFilePayloadSchema
>;
export type DebLoanAbstractFile = z.infer<typeof DebLoanAbstractFileSchema>;

export type DebtLoanContractFilePayload = z.infer<
  typeof DebLoanContractFilePayloadSchema
>;
export type DebtLoanContractFile = z.infer<typeof DebtLoanContractFileSchema>;

export type DebtLoanTimeline = z.infer<typeof DebtLoanTimelineSchema>;

export type DebtLoanRoomItem = z.infer<typeof DebtLoanRoomItemSchema>;

export type DebtLocalLoanRoomItem = z.infer<typeof DebtLocalLoanRoomItemSchema>;

export type DebtLoanRoomItemPayload = z.infer<typeof DebtLoanRoomItemSchema>;

export type DebtUploadLoanRoomItemToS3 = z.infer<
  typeof DebtUploadLoanRoomItemToS3Schema
>;

export type DebtLoanStatusPayload = z.infer<typeof DebtLoanStatusPayloadSchema>;

export type DebtLoanStatus = z.infer<typeof DebtLoanStatusSchema>;

export type DebtLoanCap = z.infer<typeof DebtLoanCapSchema>;
