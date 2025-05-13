import { LineStringSchema, PointSchema } from "@/commons/schemas/geojson";
import { GeoFeature } from "@/commons/typings/geojson";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { genericNoDataText } from "@/commons/model-in/formatters/utils";
import { DrivingRoutePropertiesSchema } from "@/modules/acquisitions/schemas/market-analytics";
import { DrivingRouteProperties } from "@/modules/acquisitions/typings/market-analytics";

export const drivingRoutesLineColors = [
  "#a2bd78",
  "#46864f",
  "#40b5a7",
  "#4c94b1",
  "#446fba",
  "#6757a8",
  "#224EA9",
];
interface GenerateComplementaryColorsParams {
  index: number;
}
export const getDrivingColorLines = ({
  index,
}: GenerateComplementaryColorsParams) => {
  const colorIndex = index % drivingRoutesLineColors.length;
  return drivingRoutesLineColors[colorIndex];
};

export const GetLastLineStringFeaturePointAsPointFeature = (
  lineStringFeature: GeoFeature<
    typeof DrivingRoutePropertiesSchema,
    typeof LineStringSchema
  >
) => {
  const lastPoint =
    lineStringFeature?.geometry?.coordinates[
      lineStringFeature?.geometry?.coordinates.length - 1
    ];
  const pointFeature: GeoFeature<
    typeof DrivingRoutePropertiesSchema,
    typeof PointSchema
  > = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: lastPoint,
    },
    properties: lineStringFeature?.properties,
  };

  return pointFeature;
};

export const generateDrivingRoutePopupContent = (
  feature: GeoFeature<typeof DrivingRoutePropertiesSchema>
) => {
  const keysToIgnore: Array<keyof DrivingRouteProperties> = ["name"];
  const otherMetrics =
    Object.keys(feature.properties)
      .filter(
        (key: keyof DrivingRouteProperties) => !keysToIgnore.includes(key)
      )
      .map((key) => {
        const propertyValue = feature.properties[key];

        return `<p class="text-sm">${convertToTitleCase(
          humanizeSnakeCase(key)
        )}: ${propertyValue}</p>`;
      })
      .join("") || genericNoDataText;

  return `<h6 class="break-words whitespace-pre-wrap w-full">${convertToTitleCase(
    humanizeSnakeCase(feature.properties.name)
  )}</h6><div class="my-1 border-b border-silver"></div>${otherMetrics}`;
};
