import { Map } from "@/commons/components/maps/Map";
import { MarkerCustomProps } from "@/commons/typings";
import {
  darkChartColors,
  lightChartColors,
} from "@/commons/utils/chart-colors";
import { GetAssetLocationTenantsByPropertyFilters } from "@/modules/assets/services/api/asset-growth";
import { AssetLocationTenantByProperty } from "@/modules/assets/typings/asset-growth";
import { useTheme } from "in-ui-react";
import { FC, useMemo } from "react";
import { CustomPropertyPopup } from "./CustomPopUp";

interface IGeneratePieChart {
  data: AssetLocationTenantByProperty;
  colors: string[];
  keys: string[];
  filter?: GetAssetLocationTenantsByPropertyFilters["metric"];
  view?: GetAssetLocationTenantsByPropertyFilters["group_by"];
  value?: number;
}

const convertFromHumanToSnakeCase = (str: string) => {
  // replace spaces and "-" with "_" and "null" to ""
  return str.replace(/[\s-]/g, "_").replace("null", "").toLowerCase();
};

const generatePieChart = ({
  data,
  colors,
  keys,
  filter,
  view,
  value,
}: IGeneratePieChart): string => {
  const scale = filter === "annual_rent" ? 80000 : 8000;

  const width = value / scale;
  const height = value / scale;
  const radius = Math.min(width, height) / 2;

  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" version="1.1">`;

  const total = data.values.reduce(
    (sum, item) => Number(sum) + Number(item.value),
    0
  );

  const nonZeroDataKeys = data.values
    .filter((entry) => Number(entry.value) > 0)
    .map((entry) => entry.label);

  let startAngle = 0;
  let endAngle = 0;

  if (Number(total) > 1 && view !== "region" && nonZeroDataKeys.length > 1) {
    data.values
      .filter((item) => !!item.value)
      .forEach((item) => {
        const value = item.value;
        const angle = (Number(value) / Number(total)) * 2 * Math.PI;
        const color = colors[keys?.indexOf(item.label)];
        endAngle += angle;

        const x1 = width / 2 + radius * Math.cos(startAngle);
        const y1 = height / 2 + radius * Math.sin(startAngle);
        const x2 = width / 2 + radius * Math.cos(endAngle);
        const y2 = height / 2 + radius * Math.sin(endAngle);

        svg += `<path d="M ${width / 2},${
          height / 2
        } L ${x1},${y1} A ${radius},${radius} 0 ${
          angle > Math.PI ? 1 : 0
        },1 ${x2},${y2} Z" fill="${color}" fill-opacity="0.7"/>`;

        startAngle = endAngle;
      });

    svg += "</svg>";
    return svg;
  }

  if (Number(total) > 1 && view === "region") {
    const itemLabel = data.values.find((item) => !!item.value)?.label;
    const color = colors[keys?.indexOf(itemLabel) || 0];
    return `<div style="background-color:${color}; width: ${width}px; height:${height}px; border-radius: 100%; opacity:0.7;"></div>`;
  }
  if (Number(total) === 1 || nonZeroDataKeys.length === 1) {
    const color =
      colors[
        keys?.indexOf(convertFromHumanToSnakeCase(String(data.values[0].label)))
      ] || colors[0];
    return `<div style="background-color:${color}; width: ${width}px; height:${height}px; border-radius: 100%; opacity:0.7;"></div>`;
  }
};

const getMarkerData = (
  data: AssetLocationTenantByProperty[],
  colors: string[],
  filters: GetAssetLocationTenantsByPropertyFilters,
  labels: string[]
): MarkerCustomProps[] => {
  if (data?.length > 0) {
    const value =
      filters?.metric === "rentable_area" ? "rentable_area" : "annual_rent";

    const markers = data?.map((item, index) => {
      const pieChart = generatePieChart({
        data: item,
        colors,
        keys: labels,
        filter: value,
        view: filters?.group_by,
        value: item[value],
      });

      const sanitizedHTML = { __html: pieChart };
      return {
        latitude: Number(item?.latitude),
        longitude: Number(item?.longitude),
        customPopup: <CustomPropertyPopup key={index} property={item} />,
        customMarker: (
          <div>
            <div dangerouslySetInnerHTML={sanitizedHTML} />
          </div>
        ),
        ...item,
      };
    });
    return markers;
  }
};

export const AssetGrowthMap: FC<{
  data: AssetLocationTenantByProperty[];
  filters: GetAssetLocationTenantsByPropertyFilters;
  labels: string[];
}> = ({ data, filters, labels }) => {
  const { theme } = useTheme();
  const colors = theme.includes("dark") ? darkChartColors : lightChartColors;
  const defaultMarkers = useMemo(() => {
    return getMarkerData(data, colors, filters, labels);
  }, [data, labels, colors, filters]);

  return <Map markers={defaultMarkers} />;
};
