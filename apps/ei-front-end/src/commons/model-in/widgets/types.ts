import { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";
import { Preset } from "../configs/presets/types";
import { Config, ConfigSettingsSchema } from "../configs/types";
import { Filter } from "../resources/filters/types";
import {
  BuildStep,
  DataResolverSchema,
  IdAndLabel,
  IdAndLabels,
  IdObject,
  FilterSchema,
  ModelSchema,
  SharedFilterSchema,
  WidgetConfig,
} from "../types";
import {
  useConfig,
  useFilters,
  useModel,
  useResource,
  useWidgetMetadata,
} from "./hooks";
import { WidgetTag } from "./widget-tags";
export interface WidgetRegistry<
  TSharedFilterSchema extends SharedFilterSchema
> {
  readonly widgets: Widget<TSharedFilterSchema, WidgetConfig>[];
  readonly registerWidget: (params: {
    widget: Widget<TSharedFilterSchema, WidgetConfig>;
  }) => void;
}

export interface WidgetInstanceMetadata extends IdObject {
  metadata: WidgetMetadata;
}

export interface WidgetInstance<
  TSharedFilterSchema extends SharedFilterSchema,
  TConfig extends WidgetConfig
> extends WidgetInstanceMetadata {
  widget: Widget<TSharedFilterSchema, TConfig>;
}

export interface WidgetMetadata {
  readonly id: string;
  readonly label: string;
  readonly app?: IdAndLabel;
  readonly module?: IdAndLabel;
  readonly entity?: IdAndLabels;
  readonly model?: IdAndLabels;
  /**
   * needsEntityId: is a flag that indicates if the widget require an id as a filter
   * and it doesn't have a UI filter to handle it.
   */
  readonly needsEntityId: boolean;
  /**
   * Tags: is a list of tags that can be used to filter widgets
   */
  readonly tags: WidgetTag[];
}

export interface WidgetComponentProps<
  TSharedFilterSchema extends SharedFilterSchema
> {
  title?: string;
  instanceId?: string;
  className?: string;
  filters?: z.infer<TSharedFilterSchema>;
  widgetMetadata?: WidgetMetadata;
  onConnect?: WidgetConnectFn;
  onDisconnect?: WidgetDisconnectFn;
  view?: string;
}

export type WidgetComponent<TSharedFilterSchema extends SharedFilterSchema> =
  React.ComponentType<WidgetComponentProps<TSharedFilterSchema>>;

export interface Widget<
  TSharedFilterSchema extends SharedFilterSchema,
  TConfig extends WidgetConfig
> extends IdAndLabel {
  readonly metadata: WidgetMetadata;
  readonly Component: WidgetComponent<TSharedFilterSchema>;
  readonly config: TConfig;
}

export interface WidgetConnectedData {
  widgetMetadata: WidgetMetadata;
  resourceFilters: Filter<z.AnyZodObject>;
}
export type WidgetConnectFn = (params: WidgetConnectedData) => void;

export type WidgetDisconnectedData = Pick<
  WidgetConnectedData,
  "widgetMetadata"
>;

export type WidgetDisconnectFn = (params: WidgetDisconnectedData) => void;

export type AddRawComponentStepCallback<
  TModelSchema extends ModelSchema,
  TDataSchema extends DataResolverSchema,
  TSharedFilterSchema extends SharedFilterSchema,
  TFilterSchema extends FilterSchema,
  TConfig extends WidgetConfig | undefined
> = () => {
  Component: RawWidgetComponent<
    TModelSchema,
    TDataSchema,
    TSharedFilterSchema,
    TFilterSchema,
    TConfig
  >;
};

export type AddRawComponentStep<
  TModelSchema extends ModelSchema,
  TResourceDataSchema extends DataResolverSchema,
  TSharedFilterSchema extends SharedFilterSchema,
  TFilterSchema extends FilterSchema,
  TConfig extends WidgetConfig | undefined
> = {
  addRawComponent: (
    callback: AddRawComponentStepCallback<
      TModelSchema,
      TResourceDataSchema,
      TSharedFilterSchema,
      TFilterSchema,
      TConfig
    >
  ) => BuildStep<Widget<TSharedFilterSchema, TConfig>>;
};

export interface RawWidgetComponentConfigProps<
  TConfigSchema extends ConfigSettingsSchema
> extends Partial<Config<TConfigSchema, Preset<TConfigSchema>[]>> {
  query?: UseQueryResult<z.infer<TConfigSchema>>;
  queryKey?: unknown[];
  setConfig?: (config: z.infer<TConfigSchema>) => void;
}

export interface RawWidgetComponentProps<
  TModelSchema extends ModelSchema,
  TData extends DataResolverSchema,
  TSharedFilterSchema extends SharedFilterSchema,
  TFilterSchema extends FilterSchema,
  TConfig extends WidgetConfig<ConfigSettingsSchema> | undefined = undefined
> {
  instanceId?: string;
  title?: string;
  useWidgetMetadata: typeof useWidgetMetadata;
  useResource: typeof useResource<TData, TSharedFilterSchema>;
  useModel: typeof useModel<TModelSchema>;
  useConfig: TConfig extends null
    ? undefined
    : typeof useConfig<TConfig["schema"]>;
  useFilters: TFilterSchema extends null
    ? never
    : typeof useFilters<TFilterSchema>;
  className?: string;
}
export type RawWidgetComponent<
  TModelSchema extends ModelSchema,
  TData extends DataResolverSchema = TModelSchema,
  TSharedFilterSchema extends SharedFilterSchema = SharedFilterSchema,
  TFilterSchema extends FilterSchema = FilterSchema,
  TConfig extends WidgetConfig | undefined = undefined
> = React.ComponentType<
  RawWidgetComponentProps<
    TModelSchema,
    TData,
    TSharedFilterSchema,
    TFilterSchema,
    TConfig
  >
>;

export type RawWidgetComponentWithExtraProps<
  TProps,
  TModelSchema extends ModelSchema,
  TData extends DataResolverSchema = TModelSchema,
  TSharedFilterSchema extends SharedFilterSchema = SharedFilterSchema,
  TFilterSchema extends FilterSchema = FilterSchema,
  TConfig extends WidgetConfig | undefined = undefined
> = React.ComponentType<
  RawWidgetComponentProps<
    TModelSchema,
    TData,
    TSharedFilterSchema,
    TFilterSchema,
    TConfig
  > &
    TProps
>;
