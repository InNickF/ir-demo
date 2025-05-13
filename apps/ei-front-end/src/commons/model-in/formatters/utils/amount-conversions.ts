import { genericNoDataText } from ".";
import { commonNoFractionOptions } from ".";

export const numberAbbreviation = ({
  value,
  isCurrency = false,
}: {
  value: number;
  isCurrency?: boolean;
}): string => {
  // Nine Zeroes for Billions
  const finalValue =
    value || value === 0
      ? Math.abs(Number(value)) >= 1.0e9
        ? (Math.abs(Number(value)) / 1.0e9).toFixed(1) + "B"
        : // Six Zeroes for Millions
        Math.abs(Number(value)) >= 1.0e6
        ? (Math.abs(Number(value)) / 1.0e6).toFixed(1) + "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(value)) >= 1.0e3
        ? (Math.abs(Number(value)) / 1.0e3).toFixed(1) + "K"
        : Math.abs(Number(value)).toString()
      : genericNoDataText;

  return isCurrency && finalValue !== genericNoDataText
    ? `$${finalValue}`
    : finalValue;
};

export interface NumberToDollarOptions {
  value: number;
  options?: Intl.NumberFormatOptions;
}
export const numberToDollar = ({
  value,
  options,
}: NumberToDollarOptions): string => {
  options ||= {};
  options.minimumFractionDigits ??= 2;
  options.maximumFractionDigits ??= 2;
  options.style ||= "currency";
  options.currency ||= "USD";

  return value || value === 0
    ? new Intl.NumberFormat("en-US", options).format(value)
    : genericNoDataText;
};

export const numberToPercent = (
  amount?: number,
  scale = false,
  options?: Intl.NumberFormatOptions
): string => {
  if (
    amount === undefined ||
    amount === null ||
    Number.isNaN(amount) ||
    typeof amount !== "number"
  ) {
    return genericNoDataText;
  }
  const finalAmount = scale ? amount * 100 : amount;

  return `${finalAmount.toLocaleString(
    "en-US",
    options || {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )}%`;
};

export const numberToScaledPercent = (params: {
  value: number;
  options?: Intl.NumberFormatOptions;
}): string => {
  if (
    params?.value === undefined ||
    params?.value === null ||
    Number.isNaN(params.value) ||
    typeof params?.value !== "number"
  ) {
    return genericNoDataText;
  }
  return new Intl.NumberFormat("en-US", {
    ...params?.options,
    style: "percent",
  }).format(params?.value);
};

export const numberToPercentX = ({
  value,
  options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
}: {
  value: number;
  options?: Intl.NumberFormatOptions;
}): string => {
  return value || value === 0
    ? `${value.toLocaleString("en-US", options)}x`
    : genericNoDataText;
};

export const readableNumber = (amount?: number): string => {
  return amount || amount === 0
    ? amount.toLocaleString("en-US", {
        minimumFractionDigits: 0,
      })
    : genericNoDataText;
};

export interface ReadableNumberWithOptionsParams {
  value: number;
  options?: Intl.NumberFormatOptions;
}
export const readableNumberWithOptions = ({
  value,
  options = {},
}: ReadableNumberWithOptionsParams): string => {
  return value || value === 0
    ? value.toLocaleString("en-US", options)
    : genericNoDataText;
};

export const floatToTwoDecimal = (amount: number): number => {
  const amountConverted = Number(amount);
  return amountConverted || amountConverted === 0
    ? parseFloat(amountConverted.toFixed(2))
    : null;
};
export const commonNumberToDollarFn = ({ value }: { value: number }) =>
  numberToDollar({
    value,
    options: commonNoFractionOptions,
  });
export const commonNumberToScaledPercent = ({ value }: { value: number }) =>
  numberToScaledPercent({
    value,
    options: {
      maximumFractionDigits: 2,
    },
  });
