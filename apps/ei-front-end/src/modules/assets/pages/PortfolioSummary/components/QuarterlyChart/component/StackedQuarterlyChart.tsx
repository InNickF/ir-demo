import am5, { setChartTheme, setTooltip } from "@/commons/utils/amcharts5";
import { QuarterlyPortfolio } from "@/modules/assets/typings/portfolio";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect } from "react";

interface StackingPlanChartProps {
  id: string;
  data: QuarterlyPortfolio[];
}

const StackingQuarterlyChart: FC<StackingPlanChartProps> = ({ id, data }) => {
  const { theme } = useTheme();

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
      chart.leftAxesContainer.set("layout", root.verticalLayout);

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      const xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 30,
      });

      const xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "quarter",
          renderer: xRenderer,
          x: am5.percent(100),
          centerX: am5.percent(100),
          tooltip: am5.Tooltip.new(root, {}),
          paddingTop: 10,
        })
      );

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
      const makeSeries = (name: string) => {
        const series = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: name,
            categoryXField: "quarter",
            tooltip: setTooltip({
              root,
              theme,
              args: {
                labelText: "{name}, {categoryX}: ${valueY}",
              },
            }),
          })
        );

        series.columns.template.setAll({
          tooltipText: "{name}, {categoryX}: ${valueY}",
          tooltipY: am5.percent(10),
        });

        series.data.setAll(data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();
      };

      makeSeries("investment");
      makeSeries("appreciation");
      makeSeries("distribution");

      // Create legend
      // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
      const legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.percent(50),
          x: am5.percent(50),
          marginTop: 15,
          marginBottom: 15,
          clickTarget: "none",
          legendLabelText: "{name}",
        })
      );

      legend.valueLabels.template.set("forceHidden", true);

      legend.labels.template.set("fill", labelsColor);

      legend.data.setAll(chart.series.values);

      legend.markers.template.setAll({
        width: 10,
        height: 10,
      });

      legend.markerRectangles.template.setAll({
        cornerRadiusTL: 10,
        cornerRadiusTR: 10,
        cornerRadiusBL: 10,
        cornerRadiusBR: 10,
      });

      legend.labels.template.setAll({
        fontSize: 12,
      });

      legend.valueLabels.template.setAll({
        fontSize: 12,
        fontWeight: "bold",
      });

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
      return () => {
        root.dispose();
      };
    },

    [id, data, theme]
  );

  return <div id={id} className="assets-quarterly-chart" />;
};

export default StackingQuarterlyChart;
