import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ConfigSettingsSchema } from "../configs/types";
import { useFindOrCreateWidgetConfig } from "../db/services/queries";
import { Model } from "../entities/models/types";
import {
  useIsQueryEnabled,
  useRequiredFilterKeys,
  useResourceFilters,
  UseResourceFiltersReturn,
} from "../resources/filters/hooks";
import { Resource } from "../resources/types";
import {
  DataResolverSchema,
  FilterSchema,
  ModelSchema,
  SharedFilterSchema,
  WidgetConfig,
} from "../types";
import {
  ConfigProvider,
  UseConfigContextValue,
} from "./contexts/ConfigContext";
import {
  FiltersProvider,
  UseFiltersContextValue,
} from "./contexts/FilterContext";
import { ModelProvider, UseModelContextValue } from "./contexts/ModelContext";
import {
  ResourceProvider,
  UseResourceContextValue,
} from "./contexts/ResourceContext";
import { WidgetMetadataProvider } from "./contexts/WidgetMetadataContext";
import {
  useConfig,
  useFilters,
  useMergeAppliedWidgetFilters,
  useMergeWidgeTSharedFilterSchemas,
  useModel,
  useModelResourceQuery,
  useResource,
  useWidgetConnectOnMount,
  useWidgetMetadata,
} from "./hooks";
import {
  RawWidgetComponent,
  RawWidgetComponentProps,
  Widget,
  WidgetComponent,
  WidgetMetadata,
} from "./types";
import { needsEntityId } from "./utils";
import { WidgetTag } from "./widget-tags";
import { Loader } from "in-ui-react";
interface WidgetBuilderInput<
  TModel extends Model<
    ModelSchema,
    Resource<DataResolverSchema, SharedFilterSchema, FilterSchema>
  >,
  TConfig extends WidgetConfig | undefined
> {
  id: string;
  label: string;
  model: TModel;
  tags?: WidgetTag[];
  config?: TConfig;
}

export const buildWidget = <
  TModel extends Model<
    ModelSchema,
    Resource<DataResolverSchema, SharedFilterSchema, FilterSchema>
  >
>(
  params: Omit<WidgetBuilderInput<TModel, never>, "config">
) => {
  return new WidgetBuilder({ ...params });
};

class WidgetBuilder<
  TModel extends Model<
    ModelSchema,
    Resource<DataResolverSchema, SharedFilterSchema, FilterSchema>
  >,
  TConfig extends WidgetConfig | undefined = undefined
> {
  private actual: WidgetBuilderInput<TModel, TConfig>;
  constructor(actual: WidgetBuilderInput<TModel, TConfig>) {
    this.actual = actual;
  }

  withConfig<TNewConfig extends WidgetConfig>(config: TNewConfig) {
    return new WidgetBuilder({ ...this.actual, config });
  }

  addRawComponent(
    callback: () => {
      Component: RawWidgetComponent<
        TModel["schema"],
        TModel["resource"]["schema"],
        TModel["resource"]["sharedFilters"]["schema"],
        TModel["resource"]["filters"]["schema"],
        TConfig
      >;
    }
  ) {
    const { Component } = callback();

    return new WidgetComponentBuilder({
      id: this.actual.id,
      label: this.actual.label,
      model: this.actual.model,
      tags: this.actual.tags,
      config: this.actual.config,
      Component,
    });
  }
}

interface WidgetComponentBuilderInput<
  T extends Model<
    ModelSchema,
    Resource<DataResolverSchema, SharedFilterSchema, FilterSchema>
  >,
  TConfig extends WidgetConfig | undefined,
  TRawWidgetComponentProps extends RawWidgetComponentProps<
    T["schema"],
    T["resource"]["schema"],
    T["resource"]["sharedFilters"]["schema"],
    T["resource"]["filters"]["schema"],
    TConfig
  >
> extends WidgetBuilderInput<T, TConfig> {
  Component: React.ComponentType<TRawWidgetComponentProps>;
}

class WidgetComponentBuilder<
  TModel extends Model<
    ModelSchema,
    Resource<DataResolverSchema, SharedFilterSchema, FilterSchema>
  >,
  TConfig extends WidgetConfig | undefined,
  TRawWidgetComponentProps extends RawWidgetComponentProps<
    TModel["schema"],
    TModel["resource"]["schema"],
    TModel["resource"]["sharedFilters"]["schema"],
    TModel["resource"]["filters"]["schema"],
    TConfig
  >
> {
  private widget: WidgetComponentBuilderInput<
    TModel,
    TConfig,
    TRawWidgetComponentProps
  >;
  constructor(
    params: WidgetComponentBuilderInput<
      TModel,
      TConfig,
      TRawWidgetComponentProps
    >
  ) {
    this.widget = params;
  }

  build() {
    type Model = TModel["schema"];
    type Data = TModel["resource"]["schema"];
    type SharedFilters = TModel["resource"]["sharedFilters"]["schema"];
    type Filters = TModel["resource"]["filters"]["schema"];

    const wMetadata: WidgetMetadata = {
      id: this.widget.id,
      label: this.widget.label,
      app: {
        id: this.widget.model.app.id,
        label: this.widget.model.app.label,
      },
      module: {
        id: this.widget.model.module.id,
        label: this.widget.model.module.label,
      },
      entity: {
        id: this.widget.model.entity.id,
        label: this.widget.model.entity.label,
        pluralLabel: this.widget.model.entity.pluralLabel,
      },
      model: {
        id: this.widget.model.id,
        label: this.widget.model.label,
        pluralLabel: this.widget.model.pluralLabel,
      },
      needsEntityId: needsEntityId({
        resource: this.widget.model.resource,
      }),
      tags: this.widget.tags,
    };

    const widgetBase: Omit<Widget<SharedFilters, TConfig>, "Component"> = {
      id: this.widget.id,
      label: this.widget.label,
      metadata: wMetadata,
      config: this?.widget?.config,
    };

    const RawComponent: RawWidgetComponent<
      Model,
      Data,
      SharedFilters,
      Filters,
      TConfig
    > = this.widget.Component;

    const WidgetComponent: WidgetComponent<SharedFilters> = ({
      onConnect,
      onDisconnect,
      filters: sharedAppliedFilters = {},
      widgetMetadata = wMetadata,
      instanceId,
      className,
      title,
      view,
    }) => {
      useWidgetConnectOnMount({
        onConnect,
        onDisconnect,
        widgetMetadata,
        resourceFilters: this.widget?.model?.resource?.sharedFilters,
      });

      const filters: UseResourceFiltersReturn<Filters> = useResourceFilters({
        appId: this.widget.model.app.id,
        moduleId: this.widget.model.module.id,
        resourceId: this.widget.model.resource?.filters?.id,
        resourceFilters: this.widget?.model?.resource?.filters,
      });

      const mergedFiltersSchema = useMergeWidgeTSharedFilterSchemas({
        schemas: [
          this.widget?.model?.resource?.sharedFilters?.schema,
          this.widget?.model?.resource?.filters?.schema,
        ],
      });

      const mergedFilters = useMergeAppliedWidgetFilters({
        general: sharedAppliedFilters,
        local: filters?.filteredOptions,
        schema: mergedFiltersSchema,
      });

      const requiredFilterKeys = useRequiredFilterKeys({
        schemas: [
          this.widget.model.resource.sharedFilters?.schema,
          this.widget.model.resource.filters?.schema,
        ],
      });

      const isQueryEnabled = useIsQueryEnabled({
        requiredFilterKeys,
        mergedFilters,
      });

      const resource = useModelResourceQuery({
        resourceLabel: this.widget.model.resource.label,
        schema: this.widget.model.resource.schema,
        appId: this.widget.model.app.id,
        moduleId: this.widget.model.module.id,
        entityId: this.widget.model.entity.id,
        resourceId: this.widget.model.resource.id,
        filters: mergedFilters,
        resourceResolver: this.widget.model.resource.resolver,
        isQueryEnabled,
      });

      const resourceContextValue: UseResourceContextValue<
        typeof this.widget.model.resource.schema,
        typeof mergedFiltersSchema
      > = useMemo(
        () => ({
          appliedFilters: mergedFilters,
          query: resource.query,
          queryKey: resource.queryKey,
          schema: this.widget.model.resource.schema,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [resource.query, resource.queryKey]
      );

      const modelContextValue: UseModelContextValue<
        typeof this.widget.model.schema
      > = useMemo(
        () => ({
          id: this.widget.model.id,
          label: this.widget.model.label,
          pluralLabel: this.widget.model.pluralLabel,
          formatter: this.widget.model.formatter,
          schema: this.widget.model.schema,
        }),
        []
      );

      const config = useFindOrCreateWidgetConfig({
        filters: {
          id: instanceId,
          widget: widgetMetadata.id,
          entity: widgetMetadata.entity.id,
          module: widgetMetadata.module.id,
          model: widgetMetadata.model.id,
          view,
        },
        configSchema: this.widget?.config?.schema,
      });

      const configContextValue: UseConfigContextValue<
        typeof this.widget.config.schema
      > = useMemo(
        () => ({
          query: config.query,
          queryKey: config.queryKey,
          setSettings: config.setSettings,
          presets: this.widget?.config?.presets,
          Component: this.widget?.config?.Component,
          schema: this.widget.config?.schema,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [config.query.data]
      );

      return (
        <WidgetMetadataProvider value={widgetMetadata}>
          <ModelProvider value={modelContextValue}>
            <ResourceProvider value={resourceContextValue}>
              <FiltersProvider value={filters}>
                <ConfigProvider value={configContextValue}>
                  <RawComponent
                    useConfig={
                      useConfig as unknown as TConfig extends null
                        ? undefined
                        : () => UseConfigContextValue<ConfigSettingsSchema>
                    }
                    useFilters={
                      useFilters as unknown as Filters extends null
                        ? never
                        : () => UseFiltersContextValue<Filters>
                    }
                    useResource={useResource}
                    useModel={useModel}
                    useWidgetMetadata={useWidgetMetadata}
                    instanceId={instanceId}
                    className={className}
                    title={title}
                  />
                </ConfigProvider>
              </FiltersProvider>
            </ResourceProvider>
          </ModelProvider>
        </WidgetMetadataProvider>
      );
    };

    const builtWidget: Widget<SharedFilters, TConfig> = {
      ...widgetBase,
      Component: dynamic(() => Promise.resolve(WidgetComponent), {
        ssr: false,
        loading: () => (
          <div className="flex w-full justify-center items-center h-12">
            <Loader />
          </div>
        ),
      }),
    };

    this.widget.model.registerWidget({ widget: builtWidget });
    return builtWidget;
  }
}
