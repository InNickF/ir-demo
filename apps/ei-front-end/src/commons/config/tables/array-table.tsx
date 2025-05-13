import { Checkbox, Select } from "in-ui-react";
import {
  buildConfigWithDefaultPreset,
  buildConfigGroup,
} from "../../model-in/configs";
import { ConfigItemContainer } from "../../model-in/configs/components/ConfigContainer";
import { convertToTitleCase } from "../../model-in/formatters/utils";
import { ModelSchema } from "../../model-in/types";
import { ConfigVisibilityButtonGroup } from "../../widgets/components/general/ConfigVisibilityButtonGroup";
import {
  createLocalOrderingWidgetConfigSchema,
  CreateLocalOrderingWidgetConfigSchemaParams,
  createLocalTablePaginationWidgetConfigSchema,
  CreateLocalTablePaginationWidgetConfigSchemaParams,
  createArrayTableStylesWidgetConfigSchema,
  CreateTableStylesWidgetConfigSchemaParams,
} from "./schemas";
import { inUISizes } from "@/commons/utils";
import { defaultProfile } from "../../profiles";
import {
  CreateTableColumnsVisAndOrderWidgetConfigParams,
  createTableVisAndOrderWidgetConfig,
} from ".";

type CreateLocalOrderingWidgetConfigParams<TModelSchema extends ModelSchema> =
  CreateLocalOrderingWidgetConfigSchemaParams<TModelSchema>;

export const createLocalOrderingWidgetConfig = <
  TModelSchema extends ModelSchema
>(
  params: CreateLocalOrderingWidgetConfigParams<TModelSchema>
) => {
  return buildConfigWithDefaultPreset({
    profile: defaultProfile,
    id: "local-row-ordering",
    label: "Row Ordering",
    schema: createLocalOrderingWidgetConfigSchema(params),
    Component: null,
  }).build();
};

type CreateLocalTablePaginationWidgetConfigParams =
  CreateLocalTablePaginationWidgetConfigSchemaParams;
export const createLocalTablePaginationWidgetConfig = (
  params: CreateLocalTablePaginationWidgetConfigParams
) =>
  buildConfigWithDefaultPreset({
    profile: defaultProfile,
    id: "local-table-pagination",
    label: "Pagination",
    schema: createLocalTablePaginationWidgetConfigSchema(params),
    Component: null,
  }).build();

type CreateTableStylesWidgetConfigParams =
  CreateTableStylesWidgetConfigSchemaParams;
export const createArrayTableStylesWidgetConfig = (
  params: CreateTableStylesWidgetConfigParams
) =>
  buildConfigWithDefaultPreset({
    profile: defaultProfile,
    id: "array-table-styles",
    label: "Styles",
    schema: createArrayTableStylesWidgetConfigSchema(params),
    Component: ({ settings, setSettings }) => {
      const options = inUISizes.map((size) => ({
        label: convertToTitleCase(size),
        value: size,
      }));
      return (
        <ConfigItemContainer className="grid grid-cols-1 gap-2">
          <Select
            label="Cell Size"
            options={options}
            defaultValue={{
              label: convertToTitleCase(settings?.size),
              value: settings?.size,
            }}
            onChange={(option) => {
              setSettings({
                ...settings,
                size: option.value,
              });
            }}
          />
          <Checkbox
            className="mt-6"
            checked={!!settings?.spreadsheet}
            onChange={() => {
              setSettings(
                settings
                  ? {
                      ...settings,
                      spreadsheet: !settings.spreadsheet,
                    }
                  : {
                      spreadsheet: true,
                    }
              );
            }}
            label="Spreadsheet"
          />
          <Checkbox
            className="mt-6"
            checked={!!settings?.showPresets}
            onChange={() => {
              setSettings(
                settings
                  ? {
                      ...settings,
                      showPresets: !settings.showPresets,
                    }
                  : {
                      showPresets: true,
                    }
              );
            }}
            label="Show Presets outside"
          />
        </ConfigItemContainer>
      );
    },
  }).build();

export const buildLocalPaginatedTableWidgetConfig = <
  TModelSchema extends ModelSchema
>(
  params: CreateTableColumnsVisAndOrderWidgetConfigParams<TModelSchema>
) =>
  buildConfigGroup({
    configs: [
      createTableVisAndOrderWidgetConfig(params),
      createArrayTableStylesWidgetConfig({ size: "normal", spreadsheet: true }),
      createLocalTablePaginationWidgetConfig({ defaultItemsPerPage: 20 }),
      createLocalOrderingWidgetConfig({
        schema: params.schema,
        initialKey: params.entityLabelKey,
      }),
    ],
    HandlerVisibleConfigComponent: ConfigVisibilityButtonGroup,
  });
