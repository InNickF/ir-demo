import {
  ErrorType,
  ParsedError,
  unauthorizedHttpCodes,
} from "@/commons/model-in/formatters/utils/errors";
import * as Sentry from "@sentry/nextjs";

export const loggers = ["sentry"] as const;

type Validator = (params: { parsedError: ParsedError }) => boolean;

const unauthValidation: Validator = ({ parsedError }) => {
  const ignoredHTTPCodes = [...unauthorizedHttpCodes, 404];
  return (
    parsedError?.type !== ErrorType.HTTP &&
    !ignoredHTTPCodes.includes(parsedError?.code)
  );
};

const validators: Array<Validator> = [unauthValidation];

export const hasToNotifyError = ({
  parsedError,
}: {
  parsedError: ParsedError;
}): boolean => {
  const shouldNotify = validators.some((validator) => {
    const result = validator({ parsedError });
    return !result;
  });
  return !shouldNotify;
};

interface ErrorLoggerParams {
  parsedError: ParsedError;
}
type ErrorLoggerFn = (params: ErrorLoggerParams) => void;

const sentryLogger: ErrorLoggerFn = ({ parsedError }) => {
  Sentry.captureException(parsedError);
};

interface ErrorLoggerHandlerParams {
  parsedError: ParsedError;
  logger: typeof loggers[number];
}
export const errorLoggerHandler = ({
  logger,
  parsedError,
}: ErrorLoggerHandlerParams): void => {
  if (!hasToNotifyError({ parsedError })) return;

  const loggerMap: Record<ErrorLoggerHandlerParams["logger"], ErrorLoggerFn> = {
    sentry: sentryLogger,
  };
  loggerMap?.[logger]?.({ parsedError });
};
