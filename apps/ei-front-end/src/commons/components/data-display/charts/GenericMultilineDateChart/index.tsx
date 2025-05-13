import { GenericXYDateMultilineToChart } from "@/commons/typings/charts";
import am5, { setChartTheme } from "@/commons/utils/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect, useRef } from "react";
import "./styles.css";

export interface GenericMultilineDateChartProps {
  id: string;
  data: GenericXYDateMultilineToChart[];
  hasBullets?: boolean;
  hasZoom?: boolean;
  zoomToBeginning?: boolean;
  endZoomFactor?: number;
  beginZoomYears?: number;
  animated?: boolean;
  smoothed?: boolean;
  seriesOptions?:
    | Omit<am5xy.SmoothedXYLineSeriesProperties, "xAxis" | "yAxis">
    | Omit<am5xy.ILineSeriesSettings, "xAxis" | "yAxis">;
  yValueFormat?: string;
  yAxisOptions?: Omit<am5xy.IValueAxisSettings<am5xy.AxisRenderer>, "renderer">;
  xAxisOptions?: Omit<am5xy.IDateAxisSettings<am5xy.AxisRenderer>, "renderer">;
  className?: string;
}

const GenericMultilineDateChart: FC<GenericMultilineDateChartProps> = ({
  id,
  data = [],
  hasBullets = true,
  hasZoom,
  zoomToBeginning = false,
  endZoomFactor = 0.2,
  beginZoomYears = 3,
  animated = false,
  smoothed = false,
  seriesOptions,
  yValueFormat,
  yAxisOptions,
  xAxisOptions,
  className,
}) => {
  const wasRotated = useRef(false);
  const { theme } = useTheme();
  const getClasses = () => {
    const classes = ["commons-generic-multiline-date-chart"];
    className && classes.push(className);
    return classes.join(" ");
  };

  useEffect(() => {
    const root = am5.Root.new(id);
    setChartTheme({ root, theme });
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,
        paddingBottom: 40,
        maxTooltipDistance: 0,
      })
    );

    root.dateFormatter.setAll({
      dateFormat: "MM/dd/yyyy",
      dateFields: ["valueX"],
    });

    if (yValueFormat) {
      root.numberFormatter.setAll({
        numberFormat: yValueFormat,
        numericFields: ["valueY"],
      });
    }

    // Create Y-axis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {
          marginLeft: 50,
        }),
        ...yAxisOptions,
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
        ...xAxisOptions,
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
    const makeSeries = (line: GenericXYDateMultilineToChart) => {
      const series = chart.series.push(
        am5xy[smoothed ? "SmoothedXYLineSeries" : "LineSeries"].new(root, {
          name: line.label,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "y",
          valueXField: "x",
          ...seriesOptions,
          tooltip: am5.Tooltip.new(root, {
            labelText: "[bold]{name}[/]\nDate: {valueX} Value: {valueY}",
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
      }

      series.strokes.template.set("strokeWidth", 2);
      series.data.setAll(line.value);

      return series;
    };
    const series = data.map(makeSeries);

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
    const minDataAmountToMakeZoom = 4;
    if (hasZoom && data.length && data.length >= minDataAmountToMakeZoom) {
      const dateObjects = data
        ?.map((line) => line.value)
        .flat()
        .map((item) => new Date(item.x));

      const sortedDates = dateObjects.sort((a, b) => a.getTime() - b.getTime());
      if (!zoomToBeginning) {
        const startIndex = Math.floor(sortedDates.length * (1 - endZoomFactor));
        const startDate = sortedDates[startIndex];
        const endDatePlusFourMonth = new Date(
          sortedDates[sortedDates.length - 1].setMonth(startDate.getMonth() + 4)
        );
        // Apply zoom
        setTimeout(() => {
          xAxis.zoomToDates(
            startDate,
            endDatePlusFourMonth,
            animated ? 250 : 0
          );
        }, 100);
      }
      if (zoomToBeginning) {
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
    return () => {
      root.dispose();
    };
  }, [
    theme,
    id,
    data,
    hasBullets,
    hasZoom,
    zoomToBeginning,
    endZoomFactor,
    beginZoomYears,
    animated,
    smoothed,
    seriesOptions,
    yValueFormat,
    xAxisOptions,
    yAxisOptions,
  ]);

  return <div id={id} className={getClasses()}></div>;
};

export default GenericMultilineDateChart;
