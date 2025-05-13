import am5, {
  setChartTheme,
  lightColors,
  darkColors,
  setTooltip,
} from "@/commons/utils/amcharts5";
import { generateComplementaryColors } from "@/commons/utils/chart-colors";
import { LoanPortfolioStackGraph } from "@/modules/assets/typings/portfolio";
import { Color } from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect, useRef } from "react";

interface LeasePortfolioChartProps {
  id: string;
  data: LoanPortfolioStackGraph[];
  by: string;
}

interface IGetColor {
  name: string;
  by: string;
  labelsByFilter: string[];
  chartColors: string[];
}

const LeasePortfolioChart: FC<LeasePortfolioChartProps> = ({
  id,
  data,
  by,
}) => {
  const { theme } = useTheme();
  const wasRotated = useRef(false);

  const baseColors = theme.includes("dark") ? darkColors : lightColors;

  const chartColors = generateComplementaryColors({
    baseColors,
    numColors: 100,
  });

  useEffect(
    function loadStackingQuarterlyChart() {
      const root = am5.Root.new(id);
      setChartTheme({ root, theme, dataLength: data?.length });
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

      const labelsByFilter: string[] = data
        ?.map((tenant) => {
          const keys = Object.keys(tenant);
          const values = [];
          keys.forEach((key) => {
            if (key !== "year") {
              values.push(key.split("-")?.[0] as string);
            }
          });
          return values;
        })
        .flat()
        .filter((value, index, array) => {
          return array.indexOf(value) === index;
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
            rotation: -45,
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
      function makeSeries(name, fieldName) {
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
          tooltipText:
            "{name}, {categoryX}: \u0024{valueY.formatNumber('#,###.')}",
          tooltipY: am5.percent(10),
        });

        series.data.setAll(data);

        const getSeriesColor = ({
          name,
          labelsByFilter,
          chartColors,
        }: IGetColor): Color => {
          const lender = name.split("-")[0];
          const index = labelsByFilter.indexOf(lender);

          return am5.color(
            chartColors[index] || chartColors[Math.floor(Math.random() * 20)]
          );
        };

        const seriesColors = getSeriesColor({
          name,
          by,
          labelsByFilter,
          chartColors,
        });

        series.columns.template.adapters.add("fill", () => {
          return seriesColors;
        });

        series.columns.template.adapters.add("stroke", () => {
          return seriesColors;
        });

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();
      }
      data?.forEach((tenant) => {
        const keys = Object.keys(tenant);
        keys?.forEach((key) => {
          if (key !== "year") {
            makeSeries(key, key);
          }
        });
      });
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
      return () => {
        root.dispose();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id, data, theme, by]
  );

  return <div id={id} className="asset-stacking-loan-chart" />;
};

export default LeasePortfolioChart;
