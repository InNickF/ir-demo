import { useTheme } from "in-ui-react";

import "../styles.css";
import { leasesColors } from "@/modules/assets/utils/leases-colors";
import {
  darkChartColors,
  lightChartColors,
} from "@/commons/utils/chart-colors";

const LegendStackingPlanChart = () => {
  const { theme } = useTheme();
  const chartColors = theme.includes("dark")
    ? darkChartColors
    : lightChartColors;
  const legendColors = leasesColors({ baseColors: chartColors });
  const chartLegends = [
    {
      title: "Lease Expiration",
      legends: {
        "0-12 Months": legendColors["red"],
        "12-24 Months": legendColors["yellow"],
        ">24 Months": legendColors["green"],
      },
    },
    {
      title: "Market Rent Comparison",
      legends: {
        ">5%": legendColors["green"],
        "5% | -5%": legendColors["yellow"],
        "-5% | -20%": legendColors["orange"],
        "=< -20%": legendColors["red"],
      },
    },
  ];

  return (
    <>
      {chartLegends.map((item, index) => {
        const isMarketRentComparison = item.title === "Market Rent Comparison";

        return (
          <div className="debt-stacking-plan-legend__wrapper" key={index}>
            <p className="debt-stacking-plan-legend__title">{item.title}:</p>
            <div className="debt-stacking-plan-legend__item">
              {Object.keys(item.legends).map((key, index) => (
                <div className="flex" key={index}>
                  <div
                    className={`w-4 h-4 ${
                      isMarketRentComparison &&
                      "debt-stacking-plan-legend__item--bordered"
                    }`}
                    style={{
                      backgroundColor: isMarketRentComparison
                        ? "transparent"
                        : item.legends[key],
                      borderColor: item.legends[key],
                    }}
                  />
                  <p className="debt-stacking-plan-legend__item--label">
                    {key}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default LegendStackingPlanChart;
