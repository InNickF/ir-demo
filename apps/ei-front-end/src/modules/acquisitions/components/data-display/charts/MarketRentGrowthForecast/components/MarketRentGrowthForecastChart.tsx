import { GenericXYDateChart } from "@/commons/typings/charts";
import am5, { setChartTheme } from "@/commons/utils/amcharts5";
import {
  darkChartColors,
  lightChartColors,
} from "@/commons/utils/chart-colors";
import { MarketRentGrowthAndForecastCharts } from "@/modules/acquisitions/typings/market-analytics";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect, useMemo } from "react";
import "../styles.css";
import { getForecastData } from "./util";

interface MarketRentGrowthForecastChartProps {
  id: string;
  data: MarketRentGrowthAndForecastCharts;
}

const MarketRentGrowthForecastChart: FC<MarketRentGrowthForecastChartProps> = ({
  id,
  data,
}) => {
  const { theme } = useTheme();
  const historicalData = useMemo(
    () =>
      getForecastData({
        data,
        forecast: "historical",
      }),
    [data]
  );
  const costarForecastData = useMemo(
    () =>
      getForecastData({
        data,
        forecast: "costar_forecast",
      }),
    [data]
  );
  const eiBaseModelForecastData = useMemo(
    () =>
      getForecastData({
        data,
        forecast: "ei_base_model_forecast",
      }),
    [data]
  );
  const eiCompositeModelForecastData = useMemo(
    () =>
      getForecastData({
        data,
        forecast: "ei_composite_model_forecast",
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
        layout: root.verticalLayout,
      })
    );
    chart.get("colors").set("step", 3);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.3,
        baseInterval: {
          timeUnit: "month",
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
        // adjust the numberFormatter configuration here
        numberFormatter: am5.NumberFormatter.new(root, {
          numberFormat: "#.####'%'",
          bigNumberPrefixes: [{ number: 1, suffix: "" }],
        }),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const createSeries = ({
      name,
      color,
      dashed,
      data,
    }: {
      name: string;
      color: am5.Color;
      dashed: boolean;
      data: GenericXYDateChart[];
    }) => {
      const series = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "y",
          valueXField: "x",
          stroke: color,
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            getFillFromSprite: false,
            labelText: "[bold]{name}[/]\n{valueX}: [bold]{valueY}%[/]",
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

      if (dashed) {
        series.strokes.template.set("strokeDasharray", [5, 3]);
        series.strokes.template.set("opacity", 0.85);
      }

      series.data.setAll(data);
      series.appear(1000);

      return series;
    };

    const historicalSeries = createSeries({
      color: theme.includes("dark")
        ? am5.color(darkChartColors[0])
        : am5.color(lightChartColors[0]),
      dashed: false,
      name: "Historical",
      data: historicalData,
    });

    const costarForecastSeries = createSeries({
      color: am5.color(darkChartColors[3]),
      dashed: true,
      name: "Costar Forecast",
      data: costarForecastData,
    });

    createSeries({
      color: am5.color(darkChartColors[8]),
      dashed: true,
      name: "EI Base Model Forecast",
      data: eiBaseModelForecastData,
    });

    createSeries({
      color: theme.includes("dark")
        ? am5.color("#ffffff")
        : am5.color("#888888"),
      dashed: true,
      name: "EI Composite Model Forecast",
      data: eiCompositeModelForecastData,
    });

    root.dateFormatter.setAll({
      dateFormat: "MM-dd-YYYY",
      dateFields: ["valueX"],
    });

    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        snapToSeries: [historicalSeries, costarForecastSeries],
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

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [
    theme,
    id,
    data,
    historicalData,
    costarForecastData,
    eiBaseModelForecastData,
    eiCompositeModelForecastData,
  ]);

  return <div id={id} className="acq-market-rent-chart"></div>;
};

export default MarketRentGrowthForecastChart;
