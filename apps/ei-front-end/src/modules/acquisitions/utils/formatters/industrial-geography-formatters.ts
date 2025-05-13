import { IndustrialGeographiesPropertiesWithMetrics } from "@/acquisitions/typings/market-analytics";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  numberToPercent,
  readableNumber,
} from "@/commons/model-in/formatters/utils/amount-conversions";

export type IndustrialGeographiesPropertiesWithMetricsFormatter = {
  [Key in keyof IndustrialGeographiesPropertiesWithMetrics]: (
    value: IndustrialGeographiesPropertiesWithMetrics[Key]
  ) => string;
};

export const industrialGeographiesPropertiesWithMetricsFormatter: IndustrialGeographiesPropertiesWithMetricsFormatter =
  {
    centroid: (value) => value.join(", "),
    geography_name: (value) => genericGetValue(value),
    geography_type: (value) => genericGetValue(value),
    leasing_activity: (value) => readableNumber(value),
    supply_growth: (value) => readableNumber(value),
    vacancy_rate: (value) => numberToPercent(value),
    construction_size: (value) => numberToPercent(value),
    land_vacancy_rate: (value) => numberToPercent(value),
    parcel_vacancy_rate: (value) => numberToPercent(value),
  };
