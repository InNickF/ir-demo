import { GenericLabelValueObject } from "@/commons/typings";
import { TagProps } from "in-ui-react";
import { CompstackCompTypeWithAllKeySchema } from "../schemas/market-analytics";
import { PatchDealOrderingParams } from "../services/api/deals";
import {
  DealBackOfTheNapkinInformation,
  DealLawClosingProbability,
  DealPhase,
  DealStatus,
} from "../typings/deals";

export const DEAL_PHASES = [
  "SCREENING",
  "LOI",
  "PSA",
  "DD",
  "CLOSING",
  "CLOSED",
  "DEAD",
] as const;

export const DEAL_STATUSES = [
  "PRE-SCREENING",
  "PENDING IC",
  "APPROVED",
] as const;

export const DEAL_LAW_CLOSING_PROBABILITIES = [
  "LOW",
  "MEDIUM",
  "HIGH",
] as const;

export const YEAR_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const DEAL_TIMELINE_KEYS = [
  "LOI_EXECUTED",
  "PSA_EFFECTIVE_DATE",
  "PSA_DEPOSIT_DAYS",
  "PSA_DEPOSIT_DATE",
  "DUE_DILIGENCE_DAYS",
  "GO_HARD_DATE",
  "DAYS_UNTIL_CLOSING",
  "CLOSING",
  "EXTENSION_DAYS_1",
  "EXTENSION_DATE_1",
  "EXTENSION_DAYS_2",
  "EXTENSION_DATE_2",
  "EXTENSION_DEPOSIT",
  "GO_HARD_DEPOSIT",
] as const;

export const MARKET_RENT_TYPES = ["year", "month"] as const;

export const CRITICAL_DATES_TABLE_ACTIVITIES = [
  "LOI EXECUTED",
  "PSA DEPOSIT DATE",
  "GO HARD DATE",
  "CLOSING",
  "EXTENSION DATE 1",
  "EXTENSION DATE 2",
  "PSA DEPOSIT DAYS",
  "DUE DILIGENCE DAYS",
  "DAYS UNTIL CLOSING",
  "EXTENSION DAYS 1",
  "EXTENSION DAYS 2",
] as const;

export interface IClosingProbabilityTags {
  label: string;
  value: DealLawClosingProbability;
  color: TagProps["color"];
}

export const CLOSING_PROBABILITY_TAGS: IClosingProbabilityTags[] = [
  { label: "Low", value: "LOW", color: "error" },
  { label: "Medium", value: "MEDIUM", color: "warning" },
  { label: "High", value: "HIGH", color: "success" },
];

export interface IDealStatusTags {
  label: string;
  value: DealStatus;
  color: TagProps["color"];
}

export const DEAL_STATUS_TAGS: IDealStatusTags[] = [
  { label: "Pre Screening", value: "PRE-SCREENING", color: "primary" },
  { label: "IC Approved", value: "PENDING IC", color: "warning" },
  { label: "IC Pending", value: "APPROVED", color: "success" },
];

export const DEAL_FILE_TYPES_KEYS = [
  "PROPERTY_PICTURE",
  "UW_MODEL",
  "ACTUAL_UW_MODEL",
  "DEVELOPMENT_UW_MODEL",
  "WIRE_INSTRUCTION",
] as const;

export const DEAL_FILE_TYPES = {
  PROPERTY_PICTURE: "PROPERTY_PICTURE",
  UW_MODEL: "UW_MODEL",
  UW_DEVELOPMENT_MODEL: "DEVELOPMENT_UW_MODEL",
  ACTUAL_UW_MODEL: "ACTUAL_UW_MODEL",
  WIRE_INSTRUCTION: "WIRE_INSTRUCTION",
} as const;

export const phasesToUploadUW: DealPhase[] = ["LOI", "PSA", "DD", "CLOSING"];

export const backOfTheNapkinDefaultValues: DealBackOfTheNapkinInformation = {
  transaction_costs_percentage: 3,
  tenant_improvements_psf: 5,
  leasing_commissions_psf: 5,
  capital_expenditures_psf: 5,
  debt_percentage: 50,
};

export const COMP_TYPES = [
  "lease",
  "transitional_property",
  "stabilized_property",
  "land",
] as const;

export const COMPSTACK_COMP_TYPES = ["lease", "sale", "land"] as const;
export const COMPSTACK_COMP_TYPES_WITH_ALL_KEY = [
  "all",
  ...COMPSTACK_COMP_TYPES,
] as const;

export type CompstackCompTypeWithAllKeyLabelValue = GenericLabelValueObject<
  typeof CompstackCompTypeWithAllKeySchema
>;
export const compstackCompTypeLabelValue: CompstackCompTypeWithAllKeyLabelValue[] =
  [
    { label: "All", value: "all" },
    { label: "Lease", value: "lease" },
    { label: "Sale", value: "sale" },
    { label: "Land", value: "land" },
  ];

export const unexpectedErrorMessage = "An unexpected error has occurred.";

export const INDUSTRIAL_GEOGRAPHIES_TYPES = ["Market", "Submarket"] as const;

export const DEAL_VALUE_ADD_TYPES = ["VALUE_ADD", "DEVELOPMENT"] as const;

export const DEAL_DEAD_REASON_TYPES = [
  "NO_AGREEMENT_WITH_SELLER",
  "DIED_AT_IC",
  "DIED_IN_CONTRACT_NEGOTIATION",
  "DIED_IN_DUE_DILIGENCE",
  "DIED_SEEKING_NEW_TERMS_WITH_SELLER",
  "OTHER",
] as const;

export const DEAL_OFFICER_STATUS = [
  "ACTIVELY_NEGOTIATING_LOI",
  "AWAITING_RESPONSE",
  "NOT_INTERESTING_IN_SELLING_AT_LOI_PRICE",
  "NOT_INTERESTED_IN_SELLING_AT_THIS_TIME",
] as const;

type GetDealSmartsheetNewSortingPayloadParams = Pick<
  PatchDealOrderingParams,
  "activeDeal" | "isBelowOverItem" | "overItem"
>;
export const getDealSmartsheetNewSortingPayload = ({
  activeDeal,
  isBelowOverItem,
  overItem,
}: GetDealSmartsheetNewSortingPayloadParams) => {
  const isHeader = "isHeader" in overItem;
  const newSorting = isHeader ? 0 : overItem?.deal?.sorting;
  const overItemPhase = isHeader
    ? overItem?.phase
    : overItem?.deal?.phase?.value;

  const activeSortingBiggerThanNewSorting = activeDeal?.sorting > newSorting;

  const getModifier = (): number => {
    if (activeDeal?.phase?.value !== overItemPhase && !isHeader) {
      return isBelowOverItem === activeSortingBiggerThanNewSorting ? 1 : 0;
    }

    return 0;
  };
  const modifier = getModifier();

  const getFinalSorting = (): number => {
    const hasToPlusModifier =
      isBelowOverItem && activeSortingBiggerThanNewSorting;

    return hasToPlusModifier ? newSorting + modifier : newSorting - modifier;
  };

  const payload: {
    sorting: number;
    phase: DealPhase;
  } = {
    sorting: getFinalSorting(),
    phase: overItemPhase || activeDeal?.phase?.value,
  };

  return payload;
};
