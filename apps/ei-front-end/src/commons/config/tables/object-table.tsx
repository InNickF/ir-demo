import { ModelSchema } from "@/commons/model-in/types";
import { inUISizes } from "@/commons/utils";
import { Checkbox, Select, Size } from "in-ui-react";
import { z } from "zod";
import {
  CreateTableColumnsVisAndOrderWidgetConfigParams,
  createTableVisAndOrderWidgetConfig,
} from ".";
import {
  buildConfigGroup,
  buildConfigWithDefaultPreset,
} from "@/commons/model-in/configs";
import { ConfigVisibilityButtonGroup } from "@/commons/widgets/components/general/ConfigVisibilityButtonGroup";
import { defaultProfile } from "@/commons/profiles";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { ConfigItemContainer } from "@/commons/model-in/configs/components/ConfigContainer";

interface CreateObjectTableStylesWidgetConfigSchemaParams {
  showLongContent?: boolean;
  size?: Size;
  elementsGrow?: boolean;
}

const createObjectTableStylesWidgetConfigSchema = ({
  showLongContent = false,
  size = "normal",
  elementsGrow = false,
}: CreateObjectTableStylesWidgetConfigSchemaParams) =>
  z.object({
    elementsGrow: z.boolean().default(elementsGrow),
    showLongContent: z.boolean().default(showLongContent),
    size: z.enum(inUISizes).default(size),
    showPresets: z.boolean().default(true),
  });

type CreateTableStylesWidgetConfigParams =
  CreateObjectTableStylesWidgetConfigSchemaParams;
export const createArrayTableStylesWidgetConfig = (
  params: CreateTableStylesWidgetConfigParams
) =>
  buildConfigWithDefaultPreset({
    profile: defaultProfile,
    id: "object-table-styles",
    label: "Styles",
    schema: createObjectTableStylesWidgetConfigSchema(params),
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
            checked={!!settings?.showLongContent}
            onChange={() => {
              setSettings(
                settings
                  ? {
                      ...settings,
                      showLongContent: !settings.showLongContent,
                    }
                  : {
                      showLongContent: true,
                    }
              );
            }}
            label="Show "
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

export const buildObjectTableWidgetConfig = <TModelSchema extends ModelSchema>(
  params: CreateTableColumnsVisAndOrderWidgetConfigParams<TModelSchema> &
    CreateObjectTableStylesWidgetConfigSchemaParams
) =>
  buildConfigGroup({
    configs: [
      createTableVisAndOrderWidgetConfig(params),
      createArrayTableStylesWidgetConfig({
        size: params.size,
        showLongContent: params.showLongContent,
        elementsGrow: params.elementsGrow,
        ...params,
      }),
    ],
    HandlerVisibleConfigComponent: ConfigVisibilityButtonGroup,
  });
