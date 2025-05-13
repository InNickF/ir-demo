import { GenericStepBarChartData } from "@/commons/typings/charts";
import am5, { setChartTheme, setTooltip } from "@/commons/utils/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect } from "react";
import "../styles.css";

export interface AssetManagementChartProps {
  id: string;
  data: GenericStepBarChartData[];
}

const AssetManagementChart: FC<AssetManagementChartProps> = ({
  id,
  data = [],
}) => {
  const { theme } = useTheme();

  useEffect(() => {
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

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xRenderer = am5xy.AxisRendererX.new(root, {});

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        visible: false,
        categoryField: "category",
        renderer: xRenderer,
      })
    );

    xAxis.gridContainer.setAll({
      visible: false,
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 50,
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

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        openValueYField: "open",
        categoryXField: "category",
        tooltip: setTooltip({
          theme,
          root,
          args: { labelText: "{category}: \u0024{displayValue}" },
        }),
      })
    );

    series.columns.template.setAll({
      templateField: "columnConfig",
      strokeOpacity: 0,
    });

    const colorSet = am5.ColorSet.new(root, {});

    const finalData = data.map((item, index) => {
      return {
        ...item,
        columnConfig: {
          fill: colorSet.getIndex(index),
        },
      };
    });

    xAxis.data.setAll(finalData);
    series.data.setAll(finalData);

    const styles = getComputedStyle(document.documentElement);
    const labelsColor = am5.color(styles.getPropertyValue("--silver"));

    yAxis.get("renderer").labels.template.setAll({
      fill: labelsColor,
    });

    xAxis.get("renderer").labels.template.setAll({
      fill: labelsColor,
    });

    // Add Label bullet
    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Label.new(root, {
          fill: labelsColor,
          numberFormatter: am5.NumberFormatter.new(root, {
            numberFormat: "$#a",
            bigNumberPrefixes: [
              { number: 1e3, suffix: "K" },
              { number: 1e6, suffix: "M" },
              { number: 1e9, suffix: "B" },
            ],
          }),
          text: "{displayValue.formatNumber('$#.0a')}",
          fontSize: 9,
          centerY: am5.p100,
          centerX: am5.p50,
          populateText: true,
        }),
      });
    });

    const stepSeries = chart.series.push(
      am5xy.StepLineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "stepValue",
        categoryXField: "category",
        noRisers: true,
        locationX: 0.65,
        stroke: root.interfaceColors.get("alternativeBackground"),
      })
    );

    stepSeries.strokes.template.setAll({
      strokeDasharray: [3, 3],
    });

    stepSeries.data.setAll(data);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        nameField: "categoryX",
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
        clickTarget: "none",
      })
    );

    legend.data.setAll(series.dataItems);

    legend.markerRectangles.template.setAll({
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusBR: 10,
      strokeOpacity: 0,
    });

    legend.markers.template.setAll({
      width: 10,
      height: 10,
    });

    legend.labels.template.setAll({
      fontSize: 12,
      fill: labelsColor,
    });

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        yAxis: yAxis,
      })
    );

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [theme, id, data]);

  return <div id={id} className="assets-asset-management-chart"></div>;
};

export default AssetManagementChart;
