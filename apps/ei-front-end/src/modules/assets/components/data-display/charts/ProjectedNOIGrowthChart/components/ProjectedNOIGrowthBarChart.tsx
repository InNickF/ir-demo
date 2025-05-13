import am5, { setChartTheme, setTooltip } from "@/commons/utils/amcharts5";

import { GenericStepBarChartData } from "@/commons/typings/charts";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect, useRef } from "react";
import "../styles.css";

export interface ProjectedNOIGrowthBarChartProps {
  id: string;
  data: GenericStepBarChartData[];
}

const ProjectedNOIGrowthBarChart: FC<ProjectedNOIGrowthBarChartProps> = ({
  id,
  data = [],
}) => {
  const wasRotated = useRef(false);
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
      })
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });

    xRenderer.labels.template.setAll({
      textAlign: "center",
      fontSize: 12,
      oversizedBehavior: "wrap",
      maxWidth: 100,
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "category",
        renderer: xRenderer,
      })
    );

    xAxis.gridContainer.setAll({
      visible: false,
    });

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

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 }),
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
      fontSize: 13,
      paddingTop: 10,
    });

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
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
          args: {
            labelText: "{category}: \u0024{displayValue}",
          },
        }),
      })
    );

    series.columns.template.setAll({
      templateField: "columnConfig",
      strokeOpacity: 0,
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
          fontSize: 12,
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

    const colorSet = am5.ColorSet.new(root, {});

    const finalData = data.map((item, index) => {
      return {
        ...item,
        category: convertToTitleCase(item.category),
        columnConfig: {
          fill: colorSet.getIndex(index),
        },
      };
    });

    xAxis.data.setAll(finalData);
    series.data.setAll(finalData);
    stepSeries.data.setAll(finalData);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [theme, id, data]);

  return <div id={id} className="assets-projected-noi-growth-chart"></div>;
};

export default ProjectedNOIGrowthBarChart;
