import { buildLocalPaginatedTableWidgetConfig } from "@/commons/config/tables/array-table";
import { buildWidget } from "@/commons/model-in";
import { buildPreset } from "@/commons/model-in/configs/presets";
import { TableVisibilityState } from "@/commons/model-in/db/utils";
import { ArrayListTable } from "@/commons/widgets/components/raw/tables/ArrayListTable";
import {
  f12NOIsProfile,
  leasedNOIsProfile,
  t12NOIsProfile,
} from "@/modules/assets/profiles";
import {
  F12_NOI_METRICS,
  LEASED_NOI_METRICS,
  T12_NOI_METRICS,
} from "@/modules/assets/utils";
import { propertiesTableKeysToIgnore } from "@/modules/assets/utils/properties";
import { getPropertyURL } from "@/modules/assets/utils/redirects/properties-redirects";
import { assetsListModel } from ".";
import { propertyFormatter } from "../../formatters";
import { PropertySchema } from "../../schema";

const assetTableConfig = buildLocalPaginatedTableWidgetConfig({
  schema: PropertySchema,
  entityLabelKey: "name",
  entityIdKey: "yardi_property_code",
  urlRedirect: getPropertyURL({
    propertyId: "__id__",
    section: "details",
  }),
  keysToIgnore: propertiesTableKeysToIgnore,
  modelHeaderFormatter: propertyFormatter.header,
})
  .withPresets(({ schema }) => {
    const modelSchema = PropertySchema.omit({
      submarket_name: true,
      market_name: true,
      latitude: true,
      longitude: true,
    });

    const leasedVisibility: TableVisibilityState<typeof modelSchema> = {
      ...Object.keys(modelSchema.shape).reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc, key: any) => ({
          ...acc,
          [key]: ![...F12_NOI_METRICS, ...T12_NOI_METRICS].includes(key),
        }),
        {}
      ),
    };
    const t12Visibility = {
      ...Object.keys(modelSchema.shape).reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc, key: any) => ({
          ...acc,
          [key]: ![...LEASED_NOI_METRICS, ...F12_NOI_METRICS].includes(key),
        }),
        {}
      ),
    };
    const f12Visibility = {
      ...Object.keys(modelSchema.shape).reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc, key: any) => ({
          ...acc,
          [key]: ![...LEASED_NOI_METRICS, ...T12_NOI_METRICS].includes(key),
        }),
        {}
      ),
    };

    const leasedPreset = buildPreset({
      profile: leasedNOIsProfile,
      schema,
    })
      .addValue({
        columnVisibility: leasedVisibility,
      })
      .build();

    const t12Preset = buildPreset({
      profile: t12NOIsProfile,
      schema,
    })
      .addValue({
        columnVisibility: t12Visibility,
      })
      .build();

    const f12Preset = buildPreset({
      profile: f12NOIsProfile,
      schema,
    })
      .addValue({
        columnVisibility: f12Visibility,
      })
      .build();

    return [leasedPreset, t12Preset, f12Preset];
  })
  .build();

export const AssetListTableWidget = buildWidget({
  id: "list-table",
  label: "Table",
  model: assetsListModel,
})
  .withConfig(assetTableConfig)
  .addRawComponent(() => ({
    Component: ArrayListTable,
  }))
  .build();
