import { IndustrialGeographiesMetricsKeysSchema } from "@/modules/acquisitions/schemas/market-analytics";

const rules = [
  { limit: 1, color: "#027c02" },
  { limit: 2, color: "#78ca78" },
  { limit: 3, color: "#95ce1b" },
  { limit: 5, color: "#cdcd1b" },
  { limit: 8, color: "#db9514" },
  { limit: Infinity, color: "#db1313" },
];

interface GetColorBasedOnHeatMapMetricAndValueParams {
  metric: keyof typeof IndustrialGeographiesMetricsKeysSchema.Values;
  value: number;
}

const keysToIgnoreColor: GetColorBasedOnHeatMapMetricAndValueParams["metric"][] =
  ["leasing_activity", "supply_growth"];

export const getColorBasedOnHeatMapMetricAndValue = ({
  metric,
  value,
}: GetColorBasedOnHeatMapMetricAndValueParams): string => {
  if (keysToIgnoreColor.includes(metric)) {
    return "#FFFFFF";
  }

  return rules.find((rule) => value < rule.limit)?.color || "#db1313";
};
