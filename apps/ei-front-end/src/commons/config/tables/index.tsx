import { MetricsDnDContainer } from "@/commons/components/data-entry/GenericMetricsVisibilityAndOrderingModal/components/MetricsDnDContainer";
import { GenericMetricsVisibilityAndOrderingDndContext } from "@/commons/components/data-entry/GenericMetricsVisibilityAndOrderingModal/context/GenericMetricsVisibilityAndOrderingDndContext";
import { GenericMetricsVisibilityAndOrderingStateProvider } from "@/commons/components/data-entry/GenericMetricsVisibilityAndOrderingModal/context/GenericMetricsVisibilityAndOrderingSharedState";
import { GenericMetricsVisibilityAndOrderingSortableDndContext } from "@/commons/components/data-entry/GenericMetricsVisibilityAndOrderingModal/context/GenericMetricsVisibilityAndOrderingSortableDndContext";
import { buildConfigWithDefaultPreset } from "@/commons/model-in/configs";
import { ConfigItemContainer } from "@/commons/model-in/configs/components/ConfigContainer";
import { ModelSchema } from "@/commons/model-in/types";
import { defaultProfile } from "@/commons/profiles";
import { createUUID } from "@/commons/utils/uuid";
import {
  createTableColumnsVisAndOrderWidgetConfigSchema,
  CreateTableColumnsVisAndOrderWidgetConfigSchemaParams,
} from "./schemas";
import { HeaderFormatter } from "@/commons/model-in/formatters/types";

export interface CreateTableColumnsVisAndOrderWidgetConfigParams<
  TModelSchema extends ModelSchema
> extends CreateTableColumnsVisAndOrderWidgetConfigSchemaParams<TModelSchema> {
  modelHeaderFormatter?: HeaderFormatter<Zod.infer<TModelSchema>>;
}

export function createTableVisAndOrderWidgetConfig<
  TModelSchema extends ModelSchema
>(params: CreateTableColumnsVisAndOrderWidgetConfigParams<TModelSchema>) {
  return buildConfigWithDefaultPreset({
    profile: defaultProfile,
    id: "table-vis-and-order",
    label: "Columns",
    schema: createTableColumnsVisAndOrderWidgetConfigSchema(params),
    Component: ({ settings, setSettings }) => {
      return (
        <ConfigItemContainer>
          <GenericMetricsVisibilityAndOrderingStateProvider
            defaultValue={{
              dndId: createUUID(),
              visibilityState: settings?.columnVisibility,
              orderState: settings?.columnOrdering,
              modelHeaderFormatter: params.modelHeaderFormatter,
              onChangeOrder: (newOrder) => {
                setSettings({
                  ...settings,
                  columnOrdering: newOrder as [string, ...string[]],
                });
              },
              onChangeVisibility(newVisibility) {
                setSettings({
                  ...settings,
                  columnVisibility: newVisibility,
                });
              },
              uiHiddenKeys: [
                String(params.entityLabelKey),
                String(params.entityIdKey),
                ...(params.keysToIgnore as string[]),
              ],
            }}
          >
            <GenericMetricsVisibilityAndOrderingDndContext>
              <GenericMetricsVisibilityAndOrderingSortableDndContext>
                <MetricsDnDContainer />
              </GenericMetricsVisibilityAndOrderingSortableDndContext>
            </GenericMetricsVisibilityAndOrderingDndContext>
          </GenericMetricsVisibilityAndOrderingStateProvider>
        </ConfigItemContainer>
      );
    },
  }).build();
}
