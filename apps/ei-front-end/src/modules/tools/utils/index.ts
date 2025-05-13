import { GenericFilterPayload } from "@/commons/typings";

export const EXCEL_DATA_TYPES = ["CashFlow", "RentRoll"] as const;

export const formatAccountCodeWithHyphens = (code: string) => {
  return code.replace(/(\d{4})(?=\d)/g, "$1-");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformAPIResponseForExport = <T extends Record<string, any>>(
  details: T[]
): GenericFilterPayload[] => {
  return details.map((detail) => {
    const transformedDetail: GenericFilterPayload = {};
    for (const key in detail) {
      const value = detail[key];
      if (typeof value === "number") {
        transformedDetail[key] = value.toString();
      } else {
        transformedDetail[key] = value;
      }
    }
    return transformedDetail;
  });
};
