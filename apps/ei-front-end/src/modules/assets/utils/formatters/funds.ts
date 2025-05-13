import { Fund, FundLeaseExpiration } from "@/assets/typings/funds";
import { genericFormatterParseFn } from "@/commons/model-in/formatters";
import { ValueFormatter } from "@/commons/model-in/formatters/types";
import {
  convertToTitleCase,
  genericGetValue,
  humanizeSnakeCase,
} from "@/commons/model-in/formatters/utils";

export type FundsKeyNamesFormatter = {
  [Key in keyof Fund]: () => string;
};

export const fundsKeysObjFormatter: FundsKeyNamesFormatter = {};

export const fundKeyNamesFormatter = ({ key }: { key: keyof Fund }) => {
  const formatter = fundsKeysObjFormatter?.[key];
  return formatter ? formatter() : convertToTitleCase(humanizeSnakeCase(key));
};

export const fundLeaseExpirationFormatter: ValueFormatter<
  FundLeaseExpiration["value"][number]["metadata"]
> = {
  map: {
    property_address: ({ value }) => ({ value: genericGetValue(value) }),
    tenant_code: ({ value }) => ({ value: genericGetValue(value) }),
  },
  format(params) {
    return genericFormatterParseFn({ ...params, map: this.map });
  },
};
