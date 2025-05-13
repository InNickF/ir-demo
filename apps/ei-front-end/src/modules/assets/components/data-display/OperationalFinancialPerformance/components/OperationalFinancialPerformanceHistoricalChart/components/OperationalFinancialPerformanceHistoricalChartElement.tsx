import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { capitalize } from "@/commons/model-in/formatters/utils";
import am5, { setChartTheme } from "@/commons/utils/amcharts5";
import {
  darkChartColors,
  lightChartColors,
} from "@/commons/utils/chart-colors";
import {
  OperationalFinancialPerformanceChartData,
  OperationalFinancialPerformanceComparison,
} from "@/modules/assets/typings/operational-financial-performance";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect } from "react";
import "../styles.css";

export interface OperationalFinancialPerformanceHistoricalChartElementProps {
  id: string;
  data: OperationalFinancialPerformanceChartData[];
  activeComparison: OperationalFinancialPerformanceComparison;
}

const OperationalFinancialPerformanceHistoricalChartElement: FC<
  OperationalFinancialPerformanceHistoricalChartElementProps
> = ({ id, data = [], activeComparison }) => {
  const finalData = data?.map(({ label, value }) => ({
    label: label === "reference" ? humanizeSnakeCase(activeComparison) : label,
    value: value.map(({ x, y }) => ({
      x: x,
      y: y,
    })),
  }));

  const { theme } = useTheme();

  useEffect(() => {
    const root = am5.Root.new(id);
    setChartTheme({ root, theme });
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,
      })
    );
    chart.get("colors").set("step", 3);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.get("renderer").grid.template.set("forceHidden", true);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {}),
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

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const createSeries = ({
      name,
      color,
      data,
    }: {
      name: string;
      color: am5.Color;
      data: OperationalFinancialPerformanceChartData["value"];
    }) => {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "y",
          valueXField: "x",
          stroke: color,
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            getFillFromSprite: false,
            labelText:
              "[bold]{name}[/]\n{x.formatDate()}: [bold]{valueY.formatNumber('$#,###.')}[/]",
          }),
        })
      );

      series.get("tooltip").get("background").setAll({
        fillOpacity: 0.7,
        fill: color,
      });

      series.strokes.template.setAll({
        strokeWidth: 2,
      });

      series.strokes.template.set("strokeWidth", 2);

      series.data.processor = am5.DataProcessor.new(root, {
        numericFields: ["y"],
        dateFields: ["x"],
        dateFormat: "MM-dd-YYYY",
      });

      series.data.setAll(data);
      series.appear(1000);

      return series;
    };

    const series = finalData?.map((dataSet, index) => {
      const colors = theme.includes("dark")
        ? darkChartColors
        : lightChartColors;
      const colorIndex = index % colors.length;
      return createSeries({
        color: theme.includes("dark")
          ? am5.color(darkChartColors[colorIndex])
          : am5.color(lightChartColors[colorIndex]),
        name: capitalize(dataSet?.label),

        data: dataSet?.value,
      });
    });

    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        snapToSeries: [series?.[0], series?.[1]],
      })
    );

    root.dateFormatter.setAll({
      dateFormat: "MM-dd-YYYY",
      dateFields: ["valueX"],
    });

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
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

    // Create legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        verticalScrollbar: am5.Scrollbar.new(root, {
          orientation: "vertical",
        }),
      })
    );
    legend.valueLabels.template.set("forceHidden", true);

    legend.labels.template.set("fill", labelsColor);

    legend.data.setAll(series);

    legend.markers.template.setAll({
      width: 10,
      height: 10,
    });

    legend.labels.template.setAll({
      fontSize: 12,
    });

    legend.valueLabels.template.setAll({
      fontSize: 12,
      fontWeight: "bold",
    });

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, id, data]);

  return (
    <div
      id={id}
      className="ei-operational-financial-performance__chart__element"
    ></div>
  );
};

export default OperationalFinancialPerformanceHistoricalChartElement;
