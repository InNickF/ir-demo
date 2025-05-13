import { GenericChartXYDateToChart } from "@/commons/typings/charts";
import am5, { setChartTheme } from "@/commons/utils/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect, useRef } from "react";
import "./styles.css";

export interface GenericPercentageLineChartProps {
  id: string;
  data: GenericChartXYDateToChart[];
  hasBullets?: boolean;
  hasZoom?: boolean;
  scaleValues?: boolean;
  zoomToBeginning?: boolean;
  endZoomFactor?: number;
  beginZoomYears?: number;
  animated?: boolean;
}

const GenericPercentageLineChart: FC<GenericPercentageLineChartProps> = ({
  id,
  data = [],
  hasBullets = true,
  hasZoom,
  scaleValues,
  zoomToBeginning = false,
  endZoomFactor = 0.2,
  beginZoomYears = 3,
  animated = false,
}) => {
  const wasRotated = useRef(false);
  const { theme } = useTheme();

  useEffect(() => {
    const root = am5.Root.new(id);
    setChartTheme({ root, theme });
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,
        maxTooltipDistance: 0,
      })
    );

    // Create Y-axis
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

    // Create X-Axis
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

    xAxis.get("dateFormats")["year"] = "yyyy";

    const xRenderer = xAxis.get("renderer");
    xRenderer.labels.template.setAll({
      rotation: -45,
      centerY: am5.p50,
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
          rotation: -45,
          centerY: am5.p50,
        });
        wasRotated.current = true;
      }
    });

    // Create series
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "y",
        valueXField: "x",
        tooltip: am5.Tooltip.new(root, {
          labelText: "Date: {valueX} Value: {valueY.formatNumber('#.##')}%",
        }),
      })
    );

    if (hasBullets) {
      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 3.5,
            fill: am5.color(theme.includes("dark") ? "#ffffff" : "#5b5c58"),
          }),
        });
      });

      series.strokes.template.set("strokeWidth", 2);
    }

    root.dateFormatter.setAll({
      dateFormat: "yyyy-MM",
      dateFields: ["valueX"],
    });

    // series.get("tooltip").label.set("text", "{valueX.formatDate()}: {valueY}");
    series.data.setAll(data);

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

    // Add cursor
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        // behavior: "zoomXY",
        xAxis: xAxis,
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

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    yAxis.get("renderer").labels.template.adapters.add("text", (text) => {
      const value = scaleValues ? parseFloat(text) * 100 : parseFloat(text);
      return `${value.toFixed(2)}%`;
    });

    yAxis.get("tooltip").label.adapters.add("text", (text) => {
      const value = scaleValues ? parseFloat(text) * 100 : parseFloat(text);
      return `${value.toFixed(2)}%`;
    });

    series.get("tooltip").label.adapters.add("text", (text, target) => {
      if (target.dataItem) {
        const dataContext: GenericChartXYDateToChart =
          target.dataItem.dataContext;

        const date = new Date(dataContext.x);
        const mmDDYYYY = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;

        const value = scaleValues
          ? (Number(dataContext.y) * 100).toFixed(2)
          : Number(dataContext.y).toFixed(2);

        return `Date: ${mmDDYYYY} Value: ${value}%`;
      }
      return text;
    });

    const minDataAmountToMakeZoom = 4;
    if (hasZoom && data.length && data.length >= minDataAmountToMakeZoom) {
      const dateObjects = data.map((item) => new Date(item.x));
      if (!zoomToBeginning) {
        const startIndex = Math.floor(dateObjects.length * (1 - endZoomFactor));
        const startDate = dateObjects[startIndex];
        const endDatePlusOneMonth = new Date(
          dateObjects[dateObjects.length - 1].setMonth(startDate.getMonth() + 1)
        );
        // Apply zoom
        setTimeout(() => {
          xAxis.zoomToDates(startDate, endDatePlusOneMonth, animated ? 250 : 0);
        }, 100);
      }
      if (zoomToBeginning) {
        const sortedDates = dateObjects.sort(
          (a, b) => a.getTime() - b.getTime()
        );
        const startIndex = 0;
        const startDate = sortedDates[startIndex];
        const endDate =
          sortedDates.length &&
          new Date(
            sortedDates[1].setFullYear(startDate.getFullYear() + beginZoomYears)
          );

        // Apply zoom
        setTimeout(() => {
          xAxis.zoomToDates(startDate, endDate, animated ? 250 : 0);
        }, 100);
      }
    }
    if (animated) {
      chart.appear(1000, 100);
    }

    return () => {
      root.dispose();
    };
  }, [
    theme,
    id,
    data,
    hasBullets,
    hasZoom,
    scaleValues,
    zoomToBeginning,
    endZoomFactor,
    beginZoomYears,
    animated,
  ]);

  return <div id={id} className="acq-generic-percentage-line-chart"></div>;
};

export default GenericPercentageLineChart;
