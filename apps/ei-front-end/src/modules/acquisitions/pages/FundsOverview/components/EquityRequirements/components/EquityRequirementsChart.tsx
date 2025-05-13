import { useLayoutEffect, FC } from "react";
import { useTheme } from "in-ui-react";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5, { setChartTheme, setTooltip } from "@/commons/utils/amcharts5";
import { EquityRequirement } from "@/acquisitions/typings/deals";
import {
  darkChartColors,
  lightChartColors,
} from "@/commons/utils/chart-colors";

interface EquityRequirementsChartProps {
  id: string;
  data: EquityRequirement[];
}
const EquityRequirementsChart: FC<EquityRequirementsChartProps> = ({
  id,
  data,
}) => {
  const { theme } = useTheme();
  useLayoutEffect(() => {
    const root = am5.Root.new(id);
    setChartTheme({ root, theme });
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,
      })
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
    });
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "date",
        renderer: xRenderer,
      })
    );

    xRenderer.grid.template.setAll({
      location: 0,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xRenderer.labels.template.adapters.add("text", (_, target: any) => {
      const labelText = target?.dataItem?.dataContext?.date;
      return `${labelText?.slice(0, 3)}\n${labelText?.slice(-4)}`;
    });

    xRenderer.labels.template.setAll({
      textAlign: "center",
      fontSize: 12,
    });

    xAxis.data.setAll(data);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        numberFormatter: am5.NumberFormatter.new(root, {
          numberFormat: "#a",
          bigNumberPrefixes: [
            { number: 1e3, suffix: "K" },
            { number: 1e6, suffix: "M" },
            { number: 1e9, suffix: "B" },
          ],
        }),
      })
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 20,
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

    legend.labels.template.set("fill", labelsColor);

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const makeSeries = ({ name, color }: { name: string; color?: string }) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          stacked: true,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: name,
          categoryXField: "date",
          fill: am5.color(color),
          tooltip: setTooltip({
            root,
            theme,
            args: {
              pointerOrientation: "horizontal",
              labelText:
                "{name}, {categoryX}: \u0024{valueY.formatNumber('#,###.')}",
            },
          }),
        })
      );
      /* 
      series.columns.template.setAll({
        tooltipY: am5.percent(100),
      }); */

      series.data.setAll(data);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();
      legend.data.push(series);
    };

    const amchartsColors = theme.includes("dark")
      ? darkChartColors
      : lightChartColors;

    const seriesColors = [amchartsColors[0], amchartsColors[21]];

    const seriesNames = Object.keys(data[0]).filter((key) => key !== "date");

    seriesNames.forEach((name, index) => {
      makeSeries({ name, color: seriesColors[index] });
    });

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    chart.appear(1000, 100);

    chart.series.each((series) => {
      series.appear(1000, 100);
    });

    return () => {
      root.dispose();
    };
  }, [theme, id, data]);

  return <div id={id} className="h-full"></div>;
};

export default EquityRequirementsChart;
