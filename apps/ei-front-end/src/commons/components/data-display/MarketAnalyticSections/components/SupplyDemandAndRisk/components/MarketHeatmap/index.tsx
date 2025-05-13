import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GenericLabelValueObject } from "@/commons/typings";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { NoDataOnChartMessage } from "@/modules/acquisitions/components/data-display/NoDataOnChartMessage";
import {
  IndustrialGeographiesMetricsKeysSchema,
  IndustrialGeographiesMetricsSchema,
} from "@/modules/acquisitions/schemas/market-analytics";
import { GetPropertiesWarehousesFilters } from "@/modules/acquisitions/services/api/market-analytics";
import {
  useDealDrivingRoutes,
  useIndustrialGeographies,
  usePropertiesWarehouses,
} from "@/modules/acquisitions/services/queries/market-analytics";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { FiltersByDistance } from "@/modules/acquisitions/typings/market-analytics";
import { MapIcon } from "@heroicons/react/24/outline";
import { ButtonGroup, ButtonGroupItem, CardProps, Select } from "in-ui-react";
import { FC, useRef, useState } from "react";
import { MapRef } from "react-map-gl";
import { BoundariesMap } from "./components/BoundariesMap";
import { WarehousesMap } from "./components/WarehousesMap";
import { HeatmapFilters, useHeatmapFilter } from "./hooks/useHeatMapFilter";

const metricOptions: GenericLabelValueObject<
  typeof IndustrialGeographiesMetricsKeysSchema
>[] = Object.keys(IndustrialGeographiesMetricsSchema.shape).map((key) => ({
  label: convertToTitleCase(humanizeSnakeCase(key)),
  value: key as keyof typeof IndustrialGeographiesMetricsKeysSchema.Values,
}));

interface HeaderActionsProps {
  heatmapFilter: HeatmapFilters;
  heatmapFilterItems: ButtonGroupItem[];
  value: GenericLabelValueObject;
  onChange: (
    value: GenericLabelValueObject<
      typeof IndustrialGeographiesMetricsKeysSchema
    >
  ) => void;
}
const HeaderActions: FC<HeaderActionsProps> = ({
  heatmapFilter,
  heatmapFilterItems,
  onChange,
  value,
}) => {
  return (
    <>
      <Select
        label="Metric"
        options={metricOptions}
        onChange={onChange}
        value={value}
        className={heatmapFilter === "warehouses" ? "hidden" : undefined}
      />
      <ButtonGroup active={heatmapFilter} items={heatmapFilterItems} />
    </>
  );
};

interface MarketHeatmapBaseProps {
  dealId?: Deal["id"];
  zoomLatitude?: number;
  zoomLongitude?: number;
}

type MarketHeatmapBySubmarketProps = CardProps &
  MarketHeatmapBaseProps &
  Pick<FiltersByDistance, "longitude" | "latitude"> & {
    submarket: string;
  };
type MarketHeatmapByMarketProps = CardProps &
  MarketHeatmapBaseProps & {
    market: string;
  };

type MarketHeatmapProps =
  | MarketHeatmapBySubmarketProps
  | MarketHeatmapByMarketProps;

export const MarketHeatmap: FC<MarketHeatmapProps> = ({
  dealId,
  zoomLatitude,
  zoomLongitude,
  ...props
}) => {
  const boundaryMapRef = useRef<MapRef>(null);
  const warehouseMapRef = useRef<MapRef>(null);
  const [filterValue, setFilterValue] = useState<
    GenericLabelValueObject<typeof IndustrialGeographiesMetricsKeysSchema>
  >(metricOptions[0]);

  const {
    heatmapFilter,
    heatmapFilterItems,
    boundariesMapClasses,
    warehousesMapClasses,
  } = useHeatmapFilter({
    onChange: () => {
      setTimeout(() => {
        boundaryMapRef.current?.resize();
        warehouseMapRef.current?.resize();
      }, 0);
    },
  });

  const isFilteringBySubmarket = "submarket" in props;

  const propertiesBoundariesFilters = isFilteringBySubmarket
    ? { submarket: props?.submarket }
    : { market: props?.market };

  const {
    data: propertiesBoundaries,
    isLoading: isLoadingPropertiesBoundaries,
    isRefetching: isRefetchingPropertiesBoundaries,
  } = useIndustrialGeographies({
    page_size: "-1",
    include_metrics: true,
    include_neighbors: true,
    ...propertiesBoundariesFilters,
  });

  const warehouseFilters: GetPropertiesWarehousesFilters =
    isFilteringBySubmarket
      ? {
          submarket: props?.submarket,
          include_neighbors: "true",
        }
      : {
          market: props?.market,
        };

  const {
    data: propertiesWarehouses,
    isLoading: isLoadingPropertiesWarehouses,
    isRefetching: isRefetchingPropertiesWarehouses,
  } = usePropertiesWarehouses({
    ...warehouseFilters,
    page_size: "-1",
  });

  const {
    data: drivingRoutes,
    isLoading: isLoadingDrivingRoutes,
    isRefetching: isRefetchingDrivingRoutes,
  } = useDealDrivingRoutes({
    dealId,
    page_size: "-1",
  });

  const loading = isFilteringBySubmarket
    ? !props?.latitude ||
      !props?.longitude ||
      isLoadingPropertiesWarehouses ||
      isLoadingPropertiesBoundaries ||
      isLoadingDrivingRoutes
    : !props.market ||
      isLoadingPropertiesBoundaries ||
      isLoadingPropertiesWarehouses;

  const refetching = isFilteringBySubmarket
    ? isRefetchingPropertiesWarehouses ||
      isRefetchingPropertiesBoundaries ||
      isRefetchingDrivingRoutes
    : isRefetchingPropertiesWarehouses;
  isRefetchingPropertiesBoundaries;

  const hasBoundariesData = propertiesBoundaries?.results?.length > 0;
  const hasWarehousesData = propertiesWarehouses?.results?.length > 0;
  const hasDrivingRoutesData = drivingRoutes?.results?.length > 0;
  return (
    <CardWithHeader
      title="Market Heatmap"
      icon={<MapIcon />}
      isLoading={loading}
      isRefetching={refetching}
      headerActions={
        <HeaderActions
          value={filterValue}
          onChange={(value) => setFilterValue(value)}
          heatmapFilter={heatmapFilter}
          heatmapFilterItems={heatmapFilterItems}
        />
      }
      {...props}
    >
      <div className={`h-[500px] ${boundariesMapClasses}`}>
        {hasBoundariesData ? (
          <BoundariesMap
            focusedKey={filterValue.value}
            ref={boundaryMapRef}
            data={propertiesBoundaries?.results || []}
            pointLatitude={isFilteringBySubmarket && props?.latitude}
            pointLongitude={isFilteringBySubmarket && props?.longitude}
            zoomLatitude={zoomLatitude}
            zoomLongitude={zoomLongitude}
          />
        ) : (
          <NoDataOnChartMessage />
        )}
      </div>
      <div className={`h-[500px] ${warehousesMapClasses}`}>
        {hasWarehousesData || hasDrivingRoutesData ? (
          <WarehousesMap
            ref={warehouseMapRef}
            warehouses={propertiesWarehouses?.results}
            drivingRoutes={drivingRoutes?.results}
            dealLatitude={isFilteringBySubmarket && props?.latitude}
            dealLongitude={isFilteringBySubmarket && props?.longitude}
            zoomLatitude={zoomLatitude}
            zoomLongitude={zoomLongitude}
          />
        ) : (
          <NoDataOnChartMessage />
        )}
      </div>
    </CardWithHeader>
  );
};
