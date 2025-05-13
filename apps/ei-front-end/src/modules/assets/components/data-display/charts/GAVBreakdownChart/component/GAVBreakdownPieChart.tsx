import am5, { setChartTheme, setTooltip } from "@/commons/utils/amcharts5";
import { FundGavBy } from "@/modules/assets/typings/funds";
import * as am5percent from "@amcharts/amcharts5/percent";
import { useTheme } from "in-ui-react";
import { FC, useEffect } from "react";

interface GAVBreakdownPieChartProps {
  id: string;
  data: FundGavBy[];
  onClick?: (filteringKey: string) => void;
}

const GAVBreakdownPieChart: FC<GAVBreakdownPieChartProps> = ({
  id,
  data = [],
  onClick,
}) => {
  const { theme } = useTheme();
  useEffect(() => {
    const root = am5.Root.new(id);

    setChartTheme({ root, theme, dataLength: data.length });

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        categoryField: "filter_value",
        valueField: "gav",
        tooltip: setTooltip({
          theme,
          root,
          labelText: `{filter_value}: \u0024{gav.formatNumber('#,###.')}`,
        }),
      })
    );

    series.labels.template.set("forceHidden", true);
    series.ticks.template.set("forceHidden", true);

    series.slices.template.events.on("click", (ev) => {
      const dataContext = ev.target.dataItem
        .dataContext as unknown as FundGavBy;

      series.slices.each(function (slice) {
        if (slice != ev.target && slice.get("active")) {
          slice.set("active", false);
        }
      });
      onClick(dataContext?.filter_value);
    });

    series.data.setAll(data);

    const styles = getComputedStyle(document.documentElement);
    const labelsColor = am5.color(styles.getPropertyValue("--silver"));

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
        height: am5.percent(35),
        verticalScrollbar: am5.Scrollbar.new(root, {
          orientation: "vertical",
        }),
        clickTarget: "none",
      })
    );
    legend.valueLabels.template.set("forceHidden", true);

    legend.labels.template.set("fill", labelsColor);

    legend.data.setAll(series.dataItems);

    legend.markers.template.setAll({
      width: 10,
      height: 10,
    });

    legend.markerRectangles.template.setAll({
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusBR: 10,
    });

    legend.labels.template.setAll({
      fontSize: 12,
    });

    legend.valueLabels.template.setAll({
      fontSize: 12,
      fontWeight: "bold",
    });

    chart.appear(1000, 100);
    chart.series.each((series) => {
      series.appear(1000, 100);
    });
    return () => {
      root.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, id, data]);

  return (
    <>
      <div id={id} className="assets-gav-breakdown-chart" />
    </>
  );
};

export default GAVBreakdownPieChart;
