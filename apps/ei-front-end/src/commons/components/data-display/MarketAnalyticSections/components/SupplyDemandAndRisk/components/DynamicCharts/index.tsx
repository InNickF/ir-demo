import { ConstructionSize } from "@/acquisitions/components/data-display/charts/ConstructionSize";
import { LeasingActivity } from "@/acquisitions/components/data-display/charts/LeasingActivity";
import { SupplyGrowth } from "@/acquisitions/components/data-display/charts/SupplyGrowth";
import { VacancyRate } from "@/acquisitions/components/data-display/charts/VacancyRate";
import {
  FiltersByMarket,
  FiltersBySubMarket,
} from "@/modules/acquisitions/typings/market-analytics";
import { FiltersPayloadType, Select } from "in-ui-react";
import { FC, useState } from "react";
import "./styles.css";

interface DynamicChartsBaseProps {
  className?: string;
  filters?: FiltersPayloadType;
}

type DynamicChartsProps =
  | (DynamicChartsBaseProps & FiltersByMarket)
  | (DynamicChartsBaseProps & FiltersBySubMarket);

export const DynamicCharts: FC<DynamicChartsProps> = ({
  className,
  filters,
  ...props
}) => {
  const selectOptions = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Vacancy Rate",
      value: "vacancy",
    },
    {
      label: "Leasing Activity",
      value: "leasing",
    },
    {
      label: "Construction / Size",
      value: "construction",
    },
    {
      label: "Supply Growth",
      value: "supply",
    },
  ];

  const [chartSelected, setChartSelected] = useState(selectOptions[1]);

  const getClasses = () => {
    const classes = ["acq-deal-market-analytics__dynamic-charts"];
    className && classes.push(className);
    chartSelected.value === "all" &&
      classes.push("acq-deal-market-analytics__dynamic-charts--all");
    return classes.join(" ");
  };

  const availableCharts = [
    {
      key: "vacancy",
      Chart: VacancyRate,
    },
    {
      key: "leasing",
      Chart: LeasingActivity,
    },
    {
      key: "construction",
      Chart: ConstructionSize,
    },
    {
      key: "supply",
      Chart: SupplyGrowth,
    },
  ];

  const ChartSelector = () => {
    return (
      <Select
        value={chartSelected}
        options={selectOptions}
        onChange={(option) => setChartSelected(option)}
      />
    );
  };

  const isFilteringBySubmarket = "submarket" in props;

  return (
    <div className={getClasses()}>
      <div className="commons-grid">
        {availableCharts
          .filter(
            (chart) =>
              chartSelected.value === "all" || chart.key === chartSelected.value
          )
          .map(({ key, Chart }, index) => (
            <div key={key} className="commons-grid-span-6">
              {isFilteringBySubmarket ? (
                <Chart
                  headerActions={index === 0 ? <ChartSelector /> : null}
                  submarket={props?.submarket}
                  filters={filters}
                />
              ) : (
                <Chart
                  headerActions={index === 0 ? <ChartSelector /> : null}
                  market={props?.market}
                  filters={filters}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
