import am5, { setChartTheme } from "@/commons/utils/amcharts5";
import { FinancialMarketForwardCurvesSOFRCharts } from "@/modules/acquisitions/typings/market-analytics";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect, useMemo } from "react";
import "../styles.css";
import { getSOFRData } from "./util";

export interface SofrChartProps {
  id: string;
  data: FinancialMarketForwardCurvesSOFRCharts;
}

const SofrChart: FC<SofrChartProps> = ({ id, data }) => {
  const { theme } = useTheme();

  const oneMonthTermSOFR = useMemo(
    () =>
      getSOFRData({
        data,
        curve: "1_month_term_sofr",
      }),
    [data]
  );

  const oneMonthTermLibor = useMemo(
    () =>
      getSOFRData({
        data,
        curve: "1_month_term_libor",
      }),
    [data]
  );

  const threeMonthTermSOFR = useMemo(
    () =>
      getSOFRData({
        data,
        curve: "3_month_term_sofr",
      }),
    [data]
  );

  useEffect(() => {
    const root = am5.Root.new(id);
    setChartTheme({ root, theme });
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
      })
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.3,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
        numberFormatter: am5.NumberFormatter.new(root, {
          numberFormat: "#.####'%'",
          bigNumberPrefixes: [{ number: 1, suffix: "" }],
        }),
      })
    );

    // Create series
    const series1 = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "y",
        valueXField: "x",
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "y",
        valueXField: "x",
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // Create series
    const series3 = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "y",
        valueXField: "x",
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    series1.strokes.template.set("strokeWidth", 2);
    series2.strokes.template.set("strokeWidth", 2);
    series3.strokes.template.set("strokeWidth", 2);

    series1.data.setAll(oneMonthTermSOFR);
    series1.get("tooltip").label.set("text", "1 month term SOFR: {valueY}%");
    series2.data.setAll(oneMonthTermLibor);

    series2.get("tooltip").label.set("text", "1 month term Libor: {valueY}%");

    series3.data.setAll(threeMonthTermSOFR);
    series3.get("tooltip").label.set("text", "3 month term SOFR: {valueY}%");

    const dateObjects = oneMonthTermSOFR.map((item) => new Date(item.x));
    const sortedDates = dateObjects.sort((a, b) => a.getTime() - b.getTime());

    const minDataAmountToMakeZoom = 4;
    if (sortedDates.length && sortedDates.length >= minDataAmountToMakeZoom) {
      const startIndex = 0;
      const startDate = sortedDates[startIndex];
      const endDate = new Date(
        sortedDates[1].setFullYear(startDate.getFullYear() + 2)
      );

      // Apply zoom
      setTimeout(() => {
        xAxis.zoomToDates(startDate, endDate);
      }, 100);
    }

    // Add cursor
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        // behavior: "zoomXY",
        xAxis: xAxis,
        snapToSeries: [series1],
      })
    );

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    xAxis.set(
      "tooltip",
      am5.Tooltip.new(root, {
        themeTags: ["axis"],
      })
    );

    yAxis.set(
      "tooltip",
      am5.Tooltip.new(root, {
        themeTags: ["axis"],
      })
    );

    chart.appear(1000, 100);

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

    return () => {
      root.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, id, data]);

  return <div id={id} className="acq-sofr-chart"></div>;
};

export default SofrChart;
