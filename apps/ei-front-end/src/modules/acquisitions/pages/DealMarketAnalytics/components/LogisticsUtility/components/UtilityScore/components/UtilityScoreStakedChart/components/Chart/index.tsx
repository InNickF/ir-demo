import { GenericLabelValueObject } from "@/commons/typings";
import am5, {
  darkColors,
  lightColors,
  setChartTheme,
  setTooltip,
} from "@/commons/utils/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect, useMemo } from "react";
import { z } from "zod";
import { UtilityScoreStakedChartProps } from "../../props";
import "./styles.css";

const UtilityScoreStakedChart: FC<UtilityScoreStakedChartProps> = ({
  id,
  data = [],
}) => {
  const { theme } = useTheme();
  // value is dollar amount
  const scaledData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      valueText: Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(item.value),
    }));
  }, [data]);

  useEffect(() => {
    const root = am5.Root.new(id);
    setChartTheme({ root, theme });
    const isDarkTheme = theme.includes("dark");
    const chartColors = isDarkTheme ? darkColors : lightColors;

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,
        arrangeTooltips: false,
      })
    );
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "label",
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true,
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
        }),
      })
    );

    const styles = getComputedStyle(document.documentElement);
    const labelsColor = am5.color(styles.getPropertyValue("--silver"));

    yAxis.get("renderer").labels.template.setAll({
      fill: labelsColor,
      visible: false,
      disabled: true,
      scale: 0,
    });

    xAxis.get("renderer").labels.template.setAll({
      fill: labelsColor,
    });

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "value",
        sequencedInterpolation: true,
        clustered: false,
        categoryYField: "label",
        tooltip: setTooltip({
          root,
          theme,
          args: { labelText: "{label}: {valueText}" },
        }),
      })
    );

    yAxis.data.setAll(scaledData);
    series.data.setAll(scaledData);

    series.columns.template.setAll({
      strokeOpacity: 0,
      height: am5.p100,
    });

    series.columns.template.adapters.add("fill", (fill, target) => {
      const index = series.columns.indexOf(target);

      const currentValue = series?.data?.values[
        index
      ] as GenericLabelValueObject<z.ZodType<number>>;

      return currentValue?.value >= 0
        ? am5.color(chartColors[isDarkTheme ? 1 : 0])
        : am5.color(chartColors[isDarkTheme ? 4 : 20]);
    });

    // Add Label bullet
    series.bullets.push(function () {
      const label = am5.Label.new(root, {
        text: "{label}: {valueText}",
        fontSize: 10,
        centerY: am5.p50, // Set a default value
        populateText: true,
      });

      label.adapters.add("centerX", function (value, target) {
        const dataItem = target?.dataItem
          ?.dataContext as GenericLabelValueObject<z.ZodType<number>>;

        if (target.dataItem && dataItem?.value > 0) {
          return am5.p0; // Set centerY to am5.p100 when value is positive
        }
        if (target.dataItem && dataItem?.value < 0) {
          return am5.p100; // Set centerY to 0 when value is negative or zero
        }
        return am5.p50;
      });

      return am5.Bullet.new(root, {
        locationX: 0,
        locationY: 0.5,
        sprite: label,
      });
    });

    chart.set(
      "scrollbarY",
      am5.Scrollbar.new(root, { orientation: "vertical" })
    );

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [id, scaledData, theme]);

  return <div id={id} className="acq-utility-overall-score-staked-chart"></div>;
};

export default UtilityScoreStakedChart;
