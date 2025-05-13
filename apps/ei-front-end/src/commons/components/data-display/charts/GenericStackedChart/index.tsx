import { groupBy } from "@/commons/utils";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import am5, {
  darkColors,
  lightColors,
  setChartTheme,
} from "@/commons/utils/amcharts5";
import { generateComplementaryColors } from "@/commons/utils/chart-colors";
import { Color } from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { useEffect, useRef } from "react";
import "./styles.css";

interface GenericStackedChartProps<T> {
  id: string;
  data: T[];
  /**
   * Y Accessor is the key of the object that will be used as the y-axis
   */
  yAccessor: keyof T;
  /**
   * X Accessor is the key of the object that will be used as the x-axis
   */
  xAccessor: keyof T;
  /**
   * Name Accessor is the key of the object that will be used as the name of the series and group items.
   */
  nameAccessor: keyof T;
  yAxisOptions?: Omit<am5xy.IValueAxisSettings<am5xy.AxisRenderer>, "renderer">;
  xAxisOptions?: Omit<
    am5xy.ICategoryAxisSettings<am5xy.AxisRenderer>,
    "renderer"
  >;

  /**
   * colorMapping is used to color the series in specific order based on the index of the name match in the array. Useful when multiple charts are used and the colors need to be sync between them.
   */
  colorMapping?: string[];
}

interface IGetColor {
  name: string;
  labels: string[];
  currentChartColors: string[];
}

const GenericStackedChart = <T extends Record<string, unknown>>({
  id,
  data = [],
  yAccessor,
  xAccessor,
  yAxisOptions,
  xAxisOptions,
  nameAccessor,
  colorMapping,
}: GenericStackedChartProps<T>) => {
  const { theme } = useTheme();
  const wasRotated = useRef(false);

  // Transform data and preserve metadata
  const transformedData = Object.entries(
    groupBy(data, (element) => {
      return String(element[xAccessor]);
    })
  ).map(([key, value]) => ({
    [xAccessor]: key,
    values: value.map((item) => ({
      name: String(item[nameAccessor]),
      value: item[yAccessor],
      metadata: item["metadata"] || null, // Check if metadata exists
    })),
  }));

  const orderedData = transformedData.every((element) => {
    return (
      typeof (element as Record<string, unknown>)[xAccessor as string] ===
      "number"
    );
  })
    ? transformedData.sort((a, b) => {
        return (
          Number((a as Record<string, unknown>)[xAccessor as string]) -
          Number((b as Record<string, unknown>)[xAccessor as string])
        );
      })
    : transformedData;

  useEffect(() => {
    const baseColors = theme.includes("dark") ? darkColors : lightColors;
    const dataLength = orderedData?.length;

    const labels = orderedData
      .map((element) => element.values.map((item) => item.name))
      ?.flat()
      ?.filter((value, index, self) => self.indexOf(value) === index);

    const chartColors = generateComplementaryColors({
      baseColors,
      numColors: labels.length,
    });

    const root = am5.Root.new(id);
    // Set themes
    setChartTheme({ root, theme, dataLength });

    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,
      })
    );

    // Add scrollbar
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    // Create axes
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
    });
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: String(xAccessor),
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
        ...xAxisOptions,
      })
    );

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

    xRenderer.grid.template.setAll({
      location: 1,
    });

    // Ensure data set for axes
    xAxis.data.setAll(
      orderedData.map((d) => ({ [xAccessor]: (d as unknown as T)[xAccessor] }))
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
        numberFormatter: am5.NumberFormatter.new(root, {
          numberFormat: "$#a",
          bigNumberPrefixes: [
            { number: 1e3, suffix: "K" },
            { number: 1e6, suffix: "M" },
            { number: 1e9, suffix: "B" },
          ],
        }),
        ...yAxisOptions,
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

    const getSeriesColor = ({
      name,
      labels,
      currentChartColors,
    }: IGetColor): Color => {
      const index = labels.indexOf(name);

      if (colorMapping) {
        const guideIndex = colorMapping.indexOf(name);

        if (guideIndex !== -1) {
          return (
            currentChartColors?.[guideIndex] &&
            am5.color(currentChartColors?.[guideIndex])
          );
        }
      }

      return am5.color(
        currentChartColors?.[index] ||
          currentChartColors?.[Math.random() * labels?.length]
      );
    };

    // Add series
    function makeSeries(name: string) {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          stacked: true,
          xAxis,
          yAxis,
          valueYField: "value", // Use 'value' from the transformed data
          categoryXField: String(xAccessor),
        })
      );

      series.columns.template.setAll({
        tooltipText: `[bold]{name}[/], {categoryX}: [bold]\u0024{valueY.formatNumber('#,###.')}[/]`,
        tooltipY: am5.percent(10),
      });

      // Check for metadata and include it in the tooltip
      series.columns.template.adapters.add("tooltipText", (text, target) => {
        const dataItem = target.dataItem?.dataContext as unknown as T;
        const matchedItem = orderedData
          .find((item) => item[String(xAccessor)] === dataItem[xAccessor])
          ?.values.find((v) => v.name === name);

        const metadata = matchedItem?.metadata;

        if (metadata) {
          const metadataEntries = Object.entries(metadata)
            .map(
              ([key, value]) =>
                `[bold]${convertToTitleCase(
                  humanizeSnakeCase(key)
                )}:[/] ${value}`
            )
            .join("\n");

          return `${text}\n-\n${metadataEntries}`;
        }

        return text;
      });

      series.data.setAll(
        orderedData.map((d) => ({
          [xAccessor]: (d as unknown as T)[xAccessor],
          value: d.values.find((v) => v.name === name)?.value,
        }))
      );

      const seriesColors = getSeriesColor({
        name,
        labels,
        currentChartColors: chartColors,
      });

      series.columns.template.adapters.add("fill", () => {
        return seriesColors;
      });

      series.columns.template.adapters.add("stroke", () => {
        return seriesColors;
      });

      series.appear();
    }

    labels?.forEach((seriesName) => {
      makeSeries(seriesName);
    });

    chart.appear(1000, 100);
    return () => {
      root.dispose();
    };
  }, [
    id,
    data,
    theme,
    xAccessor,
    yAccessor,
    yAxisOptions,
    xAxisOptions,
    nameAccessor,
    orderedData,
    colorMapping,
  ]);

  return <div id={id} className="commons-generic-stacked-bar-chart" />;
};

export default GenericStackedChart;
