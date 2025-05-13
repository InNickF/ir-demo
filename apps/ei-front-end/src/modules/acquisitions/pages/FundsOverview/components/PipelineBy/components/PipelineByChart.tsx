import { PipelineBy } from "@/acquisitions/typings/deals";
import am5, { setChartTheme, setTooltip } from "@/commons/utils/amcharts5";
import { dealPhaseNameFormatter } from "@/modules/acquisitions/utils/formatters/phases-formatters";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect, useRef } from "react";

interface PipelineByChartProps {
  id: string;
  data: PipelineBy[];
  by: string;
}
const PipelineByChart: FC<PipelineByChartProps> = ({ id, data = [], by }) => {
  const wasRotated = useRef(false);

  const { theme } = useTheme();
  useEffect(() => {
    const root = am5.Root.new(id);
    setChartTheme({ root, theme });
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
      })
    );

    const finalData = data?.map((phase) => {
      const formatter = dealPhaseNameFormatter[phase.label];
      const label = formatter ? formatter(phase.label) : phase.label;
      return { phase: label, value: phase.value };
    });

    // Create Y-axis
    const yAxisCommonProps = {
      renderer: am5xy.AxisRendererY.new(root, {}),
    };

    const yAxisProps =
      by === "Equity"
        ? {
            numberFormatter: am5.NumberFormatter.new(root, {
              numberFormat: "$#a",
              bigNumberPrefixes: [
                { number: 1e3, suffix: "K" },
                { number: 1e6, suffix: "M" },
                { number: 1e9, suffix: "B" },
              ],
            }),
          }
        : {};
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, { ...yAxisCommonProps, ...yAxisProps })
    );

    const styles = getComputedStyle(document.documentElement);
    const labelsColor = am5.color(styles.getPropertyValue("--silver"));
    yAxis.get("renderer").labels.template.setAll({
      fill: labelsColor,
    });

    // Create X-Axis
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30,
        }),
        categoryField: "phase",
      })
    );
    xAxis.get("renderer").labels.template.setAll({
      fill: labelsColor,
      fontSize: 12,
    });
    xAxis.data.setAll(finalData);

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

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Phase",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "phase",
        tooltip: setTooltip({
          theme,
          root,
          labelText:
            by === "Equity"
              ? "{categoryX}: ${valueY}"
              : "{categoryX}: {valueY}",
        }),
      })
    );
    series.data.setAll(finalData);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));
    // chart.set(
    //   "scrollbarX",
    //   am5.Scrollbar.new(root, {
    //     orientation: "horizontal",
    //   })
    // );
    chart.appear(1000, 100);
    chart.series.each((series) => {
      series.appear(1000, 100);
    });
    return () => {
      root.dispose();
    };
  }, [theme, id, data, by]);

  return <div id={id} className="acq-pipeline-by-chart"></div>;
};

export default PipelineByChart;
