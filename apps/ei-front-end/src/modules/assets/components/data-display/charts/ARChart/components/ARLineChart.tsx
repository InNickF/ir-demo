import am5, { setChartTheme } from "@/commons/utils/amcharts5";
import {
  darkChartColors,
  lightChartColors,
} from "@/commons/utils/chart-colors";
import {
  ARChartItem,
  ARChartValueLabels,
} from "@/modules/assets/typings/portfolio";
import { AR_CHART_VALUE_LABELS } from "@/modules/assets/utils";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect } from "react";
import { arChartDataTransformation, getChartDataWithTotals } from "../utils";
import "./styles.css";

interface ARLineChartProps {
  id: string;
  data: ARChartItem[];
  withPrepay?: boolean;
}
const ARLineChart: FC<ARLineChartProps> = ({
  id,
  data = [],
  withPrepay = true,
}) => {
  const { theme } = useTheme();
  useEffect(() => {
    const transformedData = arChartDataTransformation({ data: [...data] }).map(
      (item) => getChartDataWithTotals({ data: item, usePrepay: withPrepay })
    );

    const root = am5.Root.new(id);
    setChartTheme({ root, theme });
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        paddingLeft: 0,
        layout: root.verticalLayout,
      })
    );

    chart.set(
      "scrollbarY",
      am5.Scrollbar.new(root, {
        orientation: "vertical",
      })
    );

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 10,
      })
    );

    legend.labels.template.setAll({
      width: 40,
    });

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 15,
    });
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "label",
        renderer: yRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    yAxis.data.setAll(transformedData);

    const maxZoom = 20;
    if (transformedData.length > maxZoom) {
      yAxis.zoomToIndexes(
        transformedData.length - maxZoom,
        transformedData.length
      );
    }

    yAxis.get("renderer").labels.template.setAll({
      fontSize: 10,
    });

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxPrecision: 0,
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    const currentThemeColors = theme.includes("dark")
      ? darkChartColors
      : lightChartColors;

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const bodyStyles = window.getComputedStyle(document.body);

    interface MakeSeriesParams {
      name: string;
      fieldName: ARChartValueLabels;
      stacked?: boolean;
    }
    function makeSeries({ fieldName, name, stacked = true }: MakeSeriesParams) {
      const colors: { [key in ARChartValueLabels]: am5.Color } = {
        "1. (0 - 30)": am5.color(currentThemeColors[1]),
        "2. (31 - 60)": am5.color(currentThemeColors[15]),
        "3. (61 - 90)": am5.color(currentThemeColors[4]),
        "4. (+ 90)": am5.color(bodyStyles.getPropertyValue("--error-darker")),
        "5. (Prepay)": am5.color(bodyStyles.getPropertyValue("--silver")),
      };

      const getStringBetweenParenthesis = (str: string) => {
        return str.match(/\(([^)]+)\)/)[1];
      };

      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name:
            fieldName === "5. (Prepay)"
              ? getStringBetweenParenthesis(fieldName)
              : name,
          stacked,
          xAxis: xAxis,
          yAxis: yAxis,
          baseAxis: yAxis,
          fill: colors[fieldName],
          valueXField: fieldName,
          categoryYField: "label",
        })
      );

      series.columns.template.setAll({
        tooltipText: `[bold]{categoryY}[/] (${getStringBetweenParenthesis(
          fieldName
        )}): \${valueX} `,
        tooltipY: am5.percent(90),
      });
      series.data.setAll(transformedData);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/

      legend.data.push(series);
    }
    // Forcing order and stacking
    if (withPrepay) {
      makeSeries({
        fieldName: "5. (Prepay)",
        name: "5. (Prepay)",
        stacked: false,
      });
    }

    AR_CHART_VALUE_LABELS.filter((label) => {
      // Forcing order and stacking
      return label !== "5. (Prepay)";
    }).forEach((label) => {
      makeSeries({
        fieldName: label,
        name: label,
        // Forcing order and stacking
        stacked: label !== "1. (0 - 30)",
      });
    });

    chart.appear(0, 100);
    chart.series.each((series) => {
      series.appear(1000, 100);
    });
    return () => {
      root.dispose();
    };
  }, [theme, id, data, withPrepay]);

  return <div id={id} className="assets-ar-fund-chart"></div>;
};

export default ARLineChart;
