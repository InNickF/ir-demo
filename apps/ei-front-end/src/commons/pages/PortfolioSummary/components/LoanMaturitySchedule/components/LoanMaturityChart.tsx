import am5, {
  darkColors,
  lightColors,
  setChartTheme,
  setTooltip,
} from "@/commons/utils/amcharts5";
import { FundMaturityLender } from "@/modules/debt/typings/fund";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect, useMemo, useRef } from "react";
import { transformFundMaturityLenderDataToChart } from "../utils";
import "../styles.css";

interface LoanMaturityChartProps {
  id: string;
  data: FundMaturityLender[];
  lenders: string[];
}

export type FundMaturityLenderChartType = {
  period: string;
} & { [key: string]: number };

const LoanMaturityChart: FC<LoanMaturityChartProps> = ({
  id,
  data = [],
  lenders,
}) => {
  const { theme } = useTheme();
  const wasRotated = useRef(false);
  const transformedData: FundMaturityLenderChartType[] = useMemo(() => {
    return transformFundMaturityLenderDataToChart(data);
  }, [data]);

  useEffect(() => {
    const root = am5.Root.new(id);
    setChartTheme({ root, theme, dataLength: transformedData.length });
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
    const xRenderer = am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      minGridDistance: 30,
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "period",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    xAxis.data.setAll(transformedData);

    xAxis.events.on("boundschanged", (ev) => {
      const chartSize = ev.target.gridContainer.width();

      if (chartSize > 650 && wasRotated.current) {
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

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
          minGridDistance: 20,
        }),
        numberFormatter: am5.NumberFormatter.new(root, {
          numberFormat: "#a",
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
    });

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const makeSeries = (name, color) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          stacked: true,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: name,
          categoryXField: "period",
          fill: am5.color(color),
          tooltip: setTooltip({
            root,
            theme,
            args: {
              labelText: "{name}: \u0024{valueY.formatNumber('#,###.')}",
            },
          }),
        })
      );

      series.columns.template.setAll({
        tooltipText: "{name}: {valueY}",
        tooltipY: am5.percent(10),
      });
      series.data.setAll(transformedData);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();
    };

    lenders?.forEach((lender, lenderIndex) => {
      const colorTheme = theme.includes("dark") ? darkColors : lightColors;
      makeSeries(lender, colorTheme[lenderIndex] || "#");
    });

    return () => {
      root.dispose();
    };
  }, [theme, id, transformedData, lenders]);

  return (
    <>
      <div id={id} className="debt-loan-maturity-schedule-chart"></div>
    </>
  );
};

export default LoanMaturityChart;
