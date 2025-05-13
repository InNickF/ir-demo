import { unexpectedErrorMessage } from "@/acquisitions/utils";
import {
  DjangoObjectsErrorSchema,
  DjangoStringErrorSchema,
} from "@/commons/schemas/errors";
import { DjangoError, DjangoObjectsError } from "@/commons/typings/errors";
import { errorLoggerHandler } from "@/commons/utils/loggers";
import { AxiosError } from "axios";
import { ZodError } from "zod";

export const unauthorizedHttpCodes = [401, 403];

export enum ErrorType {
  HTTP,
  ZOD,
  DJANGO,
  STRING,
  ARRAY,
}

export interface ParsedError {
  type: ErrorType;
  message: string;
  /**
   * HTTP Error code shorthand.
   */
  code?: number;
  rawError: unknown;
}

export type ErrorReturnType = ParsedError | null;

export const parseTypeError = (error: unknown): ErrorReturnType => {
  if (error instanceof ZodError) {
    return {
      type: ErrorType.ZOD,
      message: `Invalid type(s) from API response. ${getZodErrorsAsString(
        error
      )}`,
      code: null,
      rawError: error,
    };
  }
};

type ErrorObject = {
  key: string;
  messages: string[];
};

export const extractZodErrors = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<any, any>,
  keyPrefix = ""
): ErrorObject[] => {
  let errors = [];

  Object.entries(obj).forEach(([key, value]) => {
    const finalKey = isNaN(Number(key)) ? key : "child";
    const newKeyPrefix = keyPrefix ? `${keyPrefix}.${finalKey}` : finalKey;

    if (Array.isArray(value) && key === "_errors" && value.length > 0) {
      errors.push({ key: keyPrefix, messages: value });
    } else if (typeof value === "object" && value !== null) {
      errors = errors.concat(extractZodErrors(value, newKeyPrefix));
    }
  });

  return errors;
};

export const filterZodErrors = (errors: ErrorObject[]): ErrorObject[] => {
  const seen = new Map();

  return errors.filter((error) => {
    const key = error.key;
    const messages = error.messages.sort().toString();

    const keyAndMessages = `${key}:${messages}`;

    if (seen.has(keyAndMessages)) {
      return false;
    } else {
      seen.set(keyAndMessages, true);
      return true;
    }
  });
};

export const formattedZodErrorsToString = (errors: ErrorObject[]): string => {
  return errors
    .map((error) => {
      const key = error.key;
      const messages = error.messages.join(", ");
      return `"${key}": ${messages}.`;
    })
    .join(" | ");
};

export const getZodErrorsAsString = (error: ZodError): string => {
  return formattedZodErrorsToString(
    filterZodErrors(extractZodErrors(error?.format()))
  );
};

export const getZodErrors = (error: ZodError): ErrorObject[] => {
  return filterZodErrors(extractZodErrors(error?.format()));
};

export const parseAxiosError = (error: AxiosError): ErrorReturnType => {
  const isAxiosError = error instanceof AxiosError;
  if (!isAxiosError) {
    return null;
  }

  if ((error?.response?.data as DjangoError)?.result === "error") {
    return parseDjangoError(error?.response?.data);
  }

  return {
    type: ErrorType.HTTP,
    message: error?.message,
    code: error?.response?.status,
    rawError: error,
  };
};

export const parseStringError = (error: unknown): ErrorReturnType => {
  if (typeof error === "string") {
    return {
      type: ErrorType.STRING,
      message: error,
      code: null,
      rawError: error,
    };
  }

  return null;
};

export const parseArrayOfStringsError = (error: unknown): ErrorReturnType => {
  if (!Array.isArray(error)) {
    return null;
  }

  if (error?.every((value) => typeof value === "string")) {
    return {
      type: ErrorType.ARRAY,
      message: error.join(", "),
      code: null,
      rawError: error,
    };
  }
};

export const parseDjangoError = (error: DjangoError): ErrorReturnType => {
  const isDjangoStringError = DjangoStringErrorSchema.safeParse(error);
  const isDjangoObjectError = DjangoObjectsErrorSchema.safeParse(error);

  if (isDjangoStringError.success) {
    return {
      type: ErrorType.DJANGO,
      message: error.detail as string,
      code: null,
      rawError: error,
    };
  }

  if (isDjangoObjectError.success) {
    const errors = (error as DjangoObjectsError)?.detail?.map((error) => {
      return {
        type: ErrorType.DJANGO,
        message: `Error on field "${error?.field}": ${error?.error}`,
        code: null,
        rawError: error,
      };
    });

    return {
      type: ErrorType.DJANGO,
      message: errors.join(" | "),
      code: null,
      rawError: error,
    };
  }

  return null;
};

export const parseError = (
  error: unknown,
  fatalMessage?: string
): string | null => {
  const parsers = [
    parseTypeError,
    parseDjangoError,
    parseAxiosError,
    parseStringError,
    parseArrayOfStringsError,
  ];

  const parsedError = parsers.reduce<ErrorReturnType>((parsedError, parser) => {
    if (parsedError) {
      return parsedError;
    }
    return parser(error);
  }, null);

  errorLoggerHandler({ logger: "sentry", parsedError });
  return parsedError?.message || fatalMessage || unexpectedErrorMessage;
};
