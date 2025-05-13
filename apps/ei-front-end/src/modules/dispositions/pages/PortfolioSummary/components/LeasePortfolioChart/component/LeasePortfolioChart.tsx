import am5, {
  setChartTheme,
  darkColors,
  lightColors,
  setTooltip,
} from "@/commons/utils/amcharts5";
import { generateComplementaryColors } from "@/commons/utils/chart-colors";
import { LegacyLeasePortfolio } from "@/modules/assets/typings/portfolio";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect, useRef } from "react";

interface LeasePortfolioChartProps {
  id: string;
  data: LegacyLeasePortfolio[];
  by: string;
}

const LeasePortfolioChart: FC<LeasePortfolioChartProps> = ({
  id,
  data,
  by,
}) => {
  const { theme } = useTheme();
  const wasRotated = useRef(false);

  useEffect(
    function loadStackingQuarterlyChart() {
      const root = am5.Root.new(id);
      setChartTheme({ root, theme });
      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          layout: root.verticalLayout,
        })
      );

      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      chart.set(
        "scrollbarX",
        am5.Scrollbar.new(root, {
          orientation: "horizontal",
        })
      );

      const properties: string[] = data
        ?.map((tenant) => {
          const keys = Object.keys(tenant);
          const values = [];
          keys.forEach((key) => {
            if (key !== "year") {
              values.push(key as string);
            }
          });
          return values;
        })
        .flat()
        .filter((value, index, array) => {
          return array.indexOf(value) === index;
        });

      const baseColors = theme.includes("dark") ? darkColors : lightColors;
      const chartColors = generateComplementaryColors({
        baseColors,
        numColors: properties?.length,
      });

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      const xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 30,
      });
      const xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "year",
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      xAxis.events.on("boundschanged", (ev) => {
        const chartSize = ev.target.gridContainer.width();
        if (chartSize > 450 && wasRotated.current) {
          xRenderer.labels.template.setAll({
            rotation: 0,
            centerY: am5.p100,
          });
        } else {
          xRenderer.labels.template.setAll({
            rotation: -70,
            centerY: am5.p50,
          });
          wasRotated.current = true;
        }
      });

      xRenderer.grid.template.setAll({
        location: 1,
      });

      xAxis.data.setAll(data);

      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          min: 0,
          renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1,
          }),
          numberFormatter: am5.NumberFormatter.new(root, {
            numberFormat: "$#a",
            bigNumberPrefixes: [
              { number: 1e3, suffix: "K" },
              { number: 1e6, suffix: "M" },
              { number: 1e9, suffix: "B" },
            ],
          }),
        })
      );

      const styles = getComputedStyle(document.documentElement);
      const labelsColor = am5.color(styles.getPropertyValue("--silver"));

      yAxis.get("renderer").labels.template.setAll({
        fill: labelsColor,
      });

      xAxis.get("renderer").labels.template.setAll({
        fill: labelsColor,
      });

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      const makeSeries = (name, fieldName) => {
        const series = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: fieldName,
            categoryXField: "year",
            tooltip: setTooltip({
              root,
              theme,
              args: {
                labelText:
                  "{name}, {categoryX}: \u0024{valueY.formatNumber('#,###.')}",
              },
            }),
          })
        );

        series.columns.template.setAll({
          strokeOpacity: 0,
          tooltipText: "{name}, {categoryX}: ${valueY}",
          tooltipY: am5.percent(10),
        });

        series.columns.template.adapters.add("fill", () => {
          const property = name;
          return am5.color(chartColors[properties.indexOf(property)]);
        });

        series.data.setAll(data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();
      };

      properties.forEach((property) => {
        makeSeries(property, property);
      });
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
      return () => {
        root.dispose();
      };
    },
    [id, data, theme, by]
  );

  return <div id={id} className="assets-lease-portfolio-chart" />;
};

export default LeasePortfolioChart;
