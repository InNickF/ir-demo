import { LogoProps, Size } from "in-ui-react";
import { KeyboardEvent } from "react";
import { GenericLabelValueObjectSchema } from "../schemas/filters";
import { GenericFilterPayload } from "../typings";

export * as amountConversions from "../model-in/formatters/utils/amount-conversions";
export * as dates from "./dates";
export * as googleAddresses from "./google-addresses";
export * as jwt from "./jwt";
export * as maps from "./maps";

export const inUISizes: [Size, ...Size[]] = ["big", "normal", "small"];

export * as notificationMessages from "./notification-messages";

export const defaultPaginatedData = { results: [], count: 0, total_pages: 1 };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setNullEmptyStrings = <T extends Record<any, any>>(obj: T) => {
  const copy = structuredClone(obj);
  Object.keys(copy).forEach((key) => {
    if (copy[key] === "") {
      (copy as Record<string | number | symbol, unknown>)[key] = null;
    } else if (
      typeof copy[key] === "object" &&
      copy[key] !== null &&
      !Array.isArray(copy[key]) &&
      copy[key] !== undefined
    ) {
      setNullEmptyStrings(copy[key]);
    }
  });

  return copy;
};

export const hasDecimals = (num: number): boolean => {
  return Number(num) % 1 !== 0;
};

export const getGenericValueOrString = (element) => {
  const validation = GenericLabelValueObjectSchema().safeParse(element);
  if (!validation.success) return element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return validation.data.value as any;
};

export const isValueEmpty = <T>(value: T): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string" && value.trim() === "") {
    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  }

  return false;
};

const allowedKeys = [
  "Backspace",
  "Delete",
  "ArrowLeft",
  "ArrowRight",
  "Tab",
  "Home",
  "End",
  "Enter",
  "Escape",
  "Control",
  "Meta",
  "Shift",
];

export const preventNonNumericalInput = (
  e: KeyboardEvent<HTMLInputElement>
) => {
  const keyCode = e.keyCode || e.which;
  const string = String.fromCharCode(keyCode);
  const regex = /[0-9]|\./;

  if (
    (e.ctrlKey || e.metaKey) &&
    (e.key === "a" ||
      e.key === "A" ||
      e.key === "Backspace" ||
      e.key === "Delete")
  ) {
    return;
  }

  if (!regex.test(string) && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
};

export const preventMaxLength = (
  e: KeyboardEvent<HTMLInputElement>,
  maxLength: number
) => {
  // Allow combinations like Ctrl/Cmd + A, Ctrl/Cmd + Backspace, Ctrl/Cmd + Delete
  if (
    (e.ctrlKey || e.metaKey) &&
    (e.key === "a" ||
      e.key === "A" ||
      e.key === "Backspace" ||
      e.key === "Delete")
  ) {
    return; // Allow the key combination
  }

  if (
    e.currentTarget.value.length >= maxLength &&
    !allowedKeys.includes(e.key)
  ) {
    e.preventDefault();
  }
};

export const cleanEmptyObjectValues = <T extends GenericFilterPayload>(
  payload: T
): T | null => {
  const result: T = {} as T;

  for (const key in payload) {
    const value = payload[key];
    if (typeof value === "object" && value !== null) {
      // Handle inner objects
      if (!Array.isArray(value)) {
        const innerObj = cleanEmptyObjectValues(value);
        if (innerObj && Object.keys(innerObj).length > 0) {
          result[key] = innerObj as T[Extract<keyof T, string>];
        }
      } else {
        // Handle arrays
        if (value.length > 0) {
          result[key] = value;
        }
      }
    } else if (typeof value === "string" && value.trim() !== "") {
      result[key] = value;
    } else if (typeof value === "boolean") {
      result[key] = value;
    } else if (typeof value === "number") {
      result[key] = value;
    }
  }

  if (Object.keys(result).length === 0) {
    return null;
  }

  return result;
};

export type AppModule = {
  name: LogoProps["name"];
  to: string;
};

export const appModules: AppModule[] = [
  { name: "Acquisitions" as LogoProps["name"], to: "/acquisitions" },
  { name: "Assets" as LogoProps["name"], to: "/assets" },
  { name: "Debt" as LogoProps["name"], to: "/debt" },
  { name: "Insight" as LogoProps["name"], to: "/insight/" },
  { name: "Investor" as LogoProps["name"], to: "/investor" },
  { name: "Tools" as LogoProps["name"], to: "/tools" },
  {
    name: "Dispositions" as LogoProps["name"],
    to: "/dispositions",
  },
];

export const groupBy = <T>(
  list: T[],
  iterator: (obj: T) => string
): Record<string, T[]> =>
  list.reduce((acc, obj) => {
    const key = iterator(obj);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {} as Record<string, T[]>);
