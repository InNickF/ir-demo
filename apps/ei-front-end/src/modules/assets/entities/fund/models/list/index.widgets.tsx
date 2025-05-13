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
import { getFundsURL } from "@/modules/assets/utils/redirects/funds-redirects";
import { fundListModel } from ".";
import { fundFormatter } from "../../formatters";

const fundTableConfig = buildLocalPaginatedTableWidgetConfig({
  schema: fundListModel.schema,
  entityLabelKey: "fund_name",
  entityIdKey: "fund_name",
  urlRedirect: getFundsURL({
    id: "__id__",
    section: "details",
  }).URL,
  keysToIgnore: ["year", "quarter"],
  modelHeaderFormatter: fundFormatter.header,
})
  .withPresets(({ schema }) => {
    const modelSchema = fundListModel.schema.omit({
      year: true,
      quarter: true,
      fund_name: true,
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

export const FundListTableWidget = buildWidget({
  id: "list-table",
  label: "Table",
  model: fundListModel,
})
  .withConfig(fundTableConfig)
  .addRawComponent(() => ({
    Component: ArrayListTable,
  }))
  .build();
