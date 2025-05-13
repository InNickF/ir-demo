import {
  CompstackLandCompsTrendChart,
  CompstackLeaseCompsTrendChart,
  CompstackSalesCompsTrendChart,
  GenericCompstackCompTrendChartElement,
} from "@/acquisitions/typings/market-analytics";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import am5, {
  darkColors,
  lightColors,
  setChartTheme,
} from "@/commons/utils/amcharts5";
import { getChartDateFromString } from "@/commons/utils/charts";
import {
  CompstackLeaseCompsTrendChartSchema,
  CompstackSalesCompsTrendChartSchema,
} from "@/modules/acquisitions/schemas/market-analytics";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect, useMemo } from "react";
import "./styles.css";

interface GenericCompstackCompTrendChartProps {
  id: string;
  data:
    | CompstackLeaseCompsTrendChart[]
    | CompstackSalesCompsTrendChart[]
    | CompstackLandCompsTrendChart[];
  onBulletClick?: (data: GenericCompstackCompTrendChartElement) => void;
  hasZoom?: boolean;
}

const GenericCompstackCompTrendChart: FC<
  GenericCompstackCompTrendChartProps
> = ({ id, data = [], onBulletClick, hasZoom }) => {
  const { theme } = useTheme();
  const formattedData = useMemo(
    () =>
      data
        .map((item) => {
          return getChartDateFromString({
            chartData: item,
            dateKey: "x",
          });
        })
        .sort((a, b) => a.x - b.x),
    [data]
  );
  const formattedLinealRegressionData = useMemo(
    () =>
      "lry" in formattedData[0] && "lrx" in formattedData[0]
        ? formattedData
            .map((item) => {
              return getChartDateFromString({
                chartData: item,
                dateKey: "lrx",
              });
            })
            .sort((a, b) => a.lrx - b.lrx)
        : [],
    [formattedData]
  );

  const sizes: {
    min: number;
    max: number;
  } = useMemo(() => {
    const sizes = formattedData.map((item) => item.size);
    const min = Math.min(...sizes);
    const max = Math.max(...sizes);
    return {
      min,
      max,
    };
  }, [formattedData]);

  useEffect(() => {
    const root = am5.Root.new(id);
    setChartTheme({ root, theme });
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
      })
    );

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

    xAxis.set("baseInterval", {
      timeUnit: "day",
      count: 1,
    });

    xAxis.get("renderer").grid.template.set("forceHidden", true);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );
    const isLeaseData = "execution_date" in formattedData[0].properties;
    const baseTooltipText = "Address: {address}\nSize (SF): {size}\n";

    const getTooltipText = (): string => {
      if (isLeaseData) {
        const keysLength =
          Object.keys(
            CompstackLeaseCompsTrendChartSchema.shape.properties.shape
          ).length - 1;
        const keysText = Object.keys(
          CompstackLeaseCompsTrendChartSchema.shape.properties.shape
        )
          .map((key, index) => {
            const isLastKey = index === keysLength;
            return `${humanizeSnakeCase(key)}: {properties.${key}}${
              isLastKey ? "" : "\n"
            }`;
          })
          .join("");

        return `${baseTooltipText}${keysText}`;
      }

      if (!isLeaseData) {
        const keysLength =
          Object.keys(
            CompstackSalesCompsTrendChartSchema.shape.properties.shape
          ).length - 1;
        const keyText = Object.keys(
          CompstackSalesCompsTrendChartSchema.shape.properties.shape
        )
          .map((key, index) => {
            const isLastKey = index === keysLength;
            return `${convertToTitleCase(
              humanizeSnakeCase(key)
            )}: {properties.${key}}${isLastKey ? "" : "\n"}`;
          })
          .join("");

        return `${baseTooltipText}${keyText}`;
      }

      return `${baseTooltipText}Date: {valueX}\nValue: {valueY}`;
    };

    const series0 = chart.series.push(
      am5xy.SmoothedXYLineSeries.new(root, {
        calculateAggregates: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "y",
        valueXField: "x",
        tension: 0.5,
        tooltip: am5.Tooltip.new(root, {
          labelText: getTooltipText(),
          pointerOrientation: "horizontal",
        }),
      })
    );

    series0.bullets.push(function () {
      const circle = am5.Circle.new(root, {
        fill: am5.color(theme.includes("dark") ? "#ffffff" : "#5b5c58"),
        radius: 3.5,
        fillOpacity: 0.7,
        interactive: true,
      });

      circle.events.on("click", (ev) => {
        if (onBulletClick) {
          onBulletClick(ev.target.dataItem.dataContext);
        }
      });

      circle.states.create("hover", {
        scale: 1.1,
        fillOpacity: 1,
        fill: am5.color(
          theme.includes("dark") ? darkColors[6] : lightColors[6]
        ),
      });

      // Change cursor to pointer on hover
      circle.events.on("pointerover", function () {
        document.body.style.cursor = "pointer";
      });

      // Change cursor back on hover out
      circle.events.on("pointerout", function () {
        document.body.style.cursor = "default";
      });

      circle.adapters.add("radius", function (radius, target) {
        const baseSize = 4;
        const dataItem: GenericCompstackCompTrendChartElement =
          target.dataItem?.dataContext;
        if (!dataItem || !dataItem?.size) {
          return baseSize;
        }
        const interpolatedValue = Math.round(
          ((dataItem?.size - sizes.min) / (sizes.max - sizes.min)) * 13 + 1
        );
        return interpolatedValue + baseSize;
      });

      return am5.Bullet.new(root, {
        sprite: circle,
      });
    });

    series0.strokes.template.set("visible", false);

    let trend: am5xy.LineSeries;
    if (formattedLinealRegressionData.length > 0) {
      trend = chart.series.push(
        am5xy.SmoothedXYLineSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "lry",
          valueXField: "lrx",
          layer: 2,
          tension: 0.8,
          stroke: series0.get("stroke"),
          tooltip: am5.Tooltip.new(root, {
            labelText: "Date: {valueX} Trend: {valueY}",
          }),
        })
      );
      trend.strokes.template.set("strokeWidth", 2);
      trend.data.setAll(formattedLinealRegressionData);
    }

    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        snapToSeries: trend ? [series0, trend] : [series0],
      })
    );

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
        marginTop: 0,
      })
    );

    series0.data.setAll(formattedData);
    root.dateFormatter.setAll({
      dateFormat: "MM-dd-yyyy",
      dateFields: ["valueX"],
    });

    const minDataAmountToMakeZoom = 4;
    if (
      hasZoom &&
      formattedData.length &&
      formattedData.length >= minDataAmountToMakeZoom
    ) {
      const zoomFactor = 0.2;
      const dateObjects = formattedData.map((item) => new Date(item.x));
      const sortedDates = dateObjects.sort((a, b) => a.getTime() - b.getTime());
      const startIndex = Math.floor(sortedDates.length * (1 - zoomFactor));
      const startDate = sortedDates[startIndex];
      const endDatePlusTwoMoreMonth = sortedDates[sortedDates.length - 1];
      const endDate = new Date(
        endDatePlusTwoMoreMonth.setMonth(endDatePlusTwoMoreMonth.getMonth() + 2)
      );

      // Apply zoom
      setTimeout(() => {
        xAxis.zoomToDates(startDate, endDate, 0);
      }, 100);
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

    return () => {
      root.dispose();
    };
  }, [
    theme,
    id,
    onBulletClick,
    formattedData,
    formattedLinealRegressionData,
    sizes,
    hasZoom,
  ]);

  return <div id={id} className="acq-compstack-comp-trend-rent-chart"></div>;
};

export default GenericCompstackCompTrendChart;
