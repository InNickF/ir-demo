export const genericNoDataText = "N/A";

export const genericGetValue = <T>(value: T, checkTruthy = false): T | string =>
  checkTruthy ? value || genericNoDataText : value ?? genericNoDataText;

export const genericNoDataDash = "-";

export const genericGetValueOrDash = <T>(
  value: T,
  checkTruthy = false
): T | string =>
  checkTruthy ? value || genericNoDataDash : value ?? genericNoDataDash;

export const capitalize = (str: string): string => {
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
};

export const noSpaces = (str: string): string => str.replace(/\s/g, "");

export const humanizeSnakeCase = (str: string) => {
  return str
    ? str
        .split("_")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ")
    : "";
};

export const humanizeCamelCase = (str: string) => {
  return str
    ? str
        .split(/(?=[A-Z])/)
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ")
    : "";
};

export const humanizeKebabCase = (str: string) => {
  return str
    ? str
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ")
    : "";
};

export const humanizeSnakeAndKeepCase = (str: string) => {
  return humanizeCamelCase(humanizeKebabCase(str));
};

export const convertToSnakeCase = (str: string) => {
  return str
    ? str
        .match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        .map((x) => x.toLowerCase())
        .join("_")
    : "";
};

interface ConvertToTitleCaseOptions {
  replacerMap?: Record<string, string>;
}
export const convertToTitleCase = (
  str: string,
  options?: ConvertToTitleCaseOptions
): string => {
  if (!str) return "";
  options ||= {};
  options.replacerMap ||= {
    "Over Last 12 Months Noidm": "(T12)",
    "Over Last 12 Months": "",
    "Leased Noidm": "(Leased)",
    "Forward 12 Months Noidm": "(F12)",
  };

  const wordsToIgnore = [
    "and",
    "or",
    "but",
    "the",
    "a",
    "an",
    "in",
    "on",
    "at",
    "to",
    "with",
    "for",
    "of",
    "by",
    "from",
    "is",
    "as",
    "vs.",
    "of:",
  ];

  const specialWords = [
    "NOI",
    "GAV",
    "IRR",
    "MoC",
    "NAV",
    "IC",
    "LTV",
    "SQFT",
    "LCT",
    "LCD",
    "LXD",
    "LIQ",
    "DSCR",
    "URL",
    "UI",
    "UX",
    "LOI",
    "LLC",
    "KPI",
    "KPIs",
    "UW",
    "PSA",
    "PSF",
    "DD",
    "I.R.",
    "A.I.",
    "SF",
    "SOFR",
    "10-Yr",
    "WALT",
    "YR",
    "(YR)",
    "CAPEX",
    "IRR",
    "(Historical)", // This is a special case for a specific string
  ];

  // Split the string into an array of words
  const words = str.toLowerCase().split(" ") as string[];

  // Capitalize the first letter of each word, except for connector words
  const titleCaseWords = words.map((word, index) => {
    const lowercaseWord = word.toLowerCase();
    if (index === 0 || !wordsToIgnore.includes(lowercaseWord)) {
      const specialWordIndex = specialWords.findIndex(
        (specialWord) => specialWord.toLowerCase() === lowercaseWord
      );
      if (specialWordIndex !== -1) {
        return specialWords[specialWordIndex];
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    } else {
      return word;
    }
  });

  let titleCaseStr = titleCaseWords.join(" ");
  Object.keys(options.replacerMap).forEach((key) => {
    titleCaseStr = titleCaseStr.replace(key, options.replacerMap[key]);
  });

  return titleCaseStr;
};

export const humanizeHTMLString = (text: string): string => {
  return text.replace(/<[^>]+>/g, "");
};

export const slicedTextWithEllipsis = ({
  text,
  maxLength,
}: {
  text: string;
  maxLength: number;
}): string => {
  return text && text?.length > maxLength
    ? text.slice(0, maxLength)?.concat("...")
    : text;
};

export const booleanToYesNoString = ({ value }: { value: unknown }): string => {
  if (value === null || value === undefined) return genericNoDataText;

  const isBooleanValue = typeof value === "boolean";

  return isBooleanValue ? (value ? "Yes" : "No") : String(value);
};
export const commonTwoFractionOptions: Intl.NumberFormatOptions = {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
};
export const commonNoFractionOptions: Intl.NumberFormatOptions = {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
};
export const valueShouldBeMonospaceAndAlignedToRight = ({
  value,
}: {
  value: string;
}) => {
  /*
    ^-?: Allows an optional minus sign at the start.
    ^\$?: Ensures that the dollar sign ($) is optional but, if present, it must be at the beginning of the string.
    \d{1,3}(,\d{3})*: Allows groups of digits with optional commas as thousand separators (e.g., 1,000 or 23,213).
    (\.\d+)?$: Allows an optional decimal point followed by one or more digits.
    (\s*,\s*\d+)*: Allows additional numbers separated by commas and optional spaces (e.g., 200, 300).
    |: Allows for an alternative pattern.
    \d+-\d+: Allows a pattern like 500-1.
  */
  const regex = /^-?\$?\d{1,3}(,\d{3})*(\.\d+)?(\s*,\s*\d+)*$|\d+-\d+$/;
  return regex.test(value);
};

interface ValueFormatterParams<T extends string> {
  value: T;
  mustShowRawValue?: boolean;
  maxLength?: number;
}
interface ValueFormatterReturnType<T extends string> {
  formattedValue: string;
  isLongTextValue: boolean;
  original: T;
}
export const ellipseText = <T extends string>({
  value,
  mustShowRawValue,
  maxLength = 50,
}: ValueFormatterParams<T>): ValueFormatterReturnType<T> => {
  const isLongTextValue = value?.length > maxLength;

  if (mustShowRawValue) {
    return { formattedValue: value, isLongTextValue, original: value };
  }

  const formattedValue =
    value === ""
      ? "N/A"
      : isLongTextValue
      ? slicedTextWithEllipsis({
          text: value,
          maxLength: 20,
        })
      : value;

  return { formattedValue, isLongTextValue, original: value };
};

export interface DEPRECATED_EllipseLongTextArgs {
  text: string;
  maxLength?: number;
}
export const deprecated_ellipseLongText = ({
  text,
  maxLength = 20,
}: DEPRECATED_EllipseLongTextArgs) => {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`;
  }
  return text;
};
