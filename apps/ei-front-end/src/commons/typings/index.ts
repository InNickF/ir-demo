import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { MarkerProps } from "react-map-gl";
import { z } from "zod";
import {
  GenericFilterPayloadSchema,
  GenericChoiceSchema,
  GenericLabelValueObjectSchema,
  InitialFiltersSchema,
  PaginatedResponseSchema,
} from "../schemas/filters";
import { AsElement, IconProps, LinkProps } from "in-ui-react";
import { AttachmentsCommonKeysSchema } from "../schemas/files";

export const TokensSchema = z.object({
  access: z.string(),
  refresh: z.string(),
});

export type ITokens = z.infer<typeof TokensSchema>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export interface IsLoadingProp {
  isLoading?: boolean;
}
export interface IsRefetchingProp {
  isRefetching?: boolean;
}

export type PaginatedResponse<Result extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof PaginatedResponseSchema<Result>>
>;

export interface IPaginatedResponse<Result> {
  next?: string;
  previous?: string;
  count?: number;
  total_pages?: number;
  results?: Result[];
}

export interface MarkerCustomProps extends MarkerProps {
  customPopup?: JSX.Element;
  customMarker?: JSX.Element;
}

export type InitialFilters = z.infer<typeof InitialFiltersSchema>;

export type LegacyGenericLabelValueObject<
  TValue extends z.ZodType = z.ZodType<string>
> = GenericLabelValueObject<TValue>;

export type GenericLabelValueObject<
  TValue extends z.ZodType = z.ZodType<string>,
  TLabel extends z.ZodType = z.ZodType<string>
> = z.infer<ReturnType<typeof GenericLabelValueObjectSchema<TValue, TLabel>>>;

export type GenericChoice<
  TValue extends z.ZodType = z.ZodType<string>,
  TLabel extends z.ZodType = z.ZodType<string>
> = z.infer<ReturnType<typeof GenericChoiceSchema<TValue, TLabel>>>;

export type GenericChoices<
  TValue extends z.ZodType = z.ZodType<string>,
  TLabel extends z.ZodType = z.ZodType<string>
> = GenericChoice<TValue, TLabel>[];

export type GenericFilterPayload = z.infer<typeof GenericFilterPayloadSchema>;

export type GenericSelectOptions = {
  [key: string]: string | number | null;
};

export type PresignedUrlFields = {
  acl: string;
  content_type: string;
  key: string;
  AWSAccessKeyId: string;
  policy: string;
  signature: string;
};

export type PresignedUrl = {
  url: string;
  fields: PresignedUrlFields;
};

export type HTTPVerbs = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export type NavigationItemProps = {
  href?: LinkProps<"a">["href"];
  label: string;
  description?: ReactNode;
  outlineIcon?: IconProps["svg"];
  regexToMatch?: RegExp;
  linksToMatch?: string[];
};

export type NavigationBarRoutes = {
  href: string;
  linksToMatch?: string[];
  regexToMatch?: RegExp;
  icon: JSX.Element;
  outlineIcon: JSX.Element;
  label: string;
  description?: string;
  as: AsElement;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type StringWithAutocompleteOptions<TOptions> = (string & {}) | TOptions;

export type AttachmentsCommonKeys = z.infer<typeof AttachmentsCommonKeysSchema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string | symbol | number, unknown>;

export type EnsureOneWithKeyValue<T extends object, K extends keyof T, V> = [
  T,
  ...T[]
] extends (infer U)[]
  ? U extends T
    ? U extends Record<K, V>
      ? [U, ...T[]]
      : never
    : never
  : never;
