import { DealsBy } from "@/acquisitions/typings/deals";
import am5, { setChartTheme, setTooltip } from "@/commons/utils/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import { useTheme } from "in-ui-react";
import { FC, useEffect, useMemo } from "react";

interface DealsByChartProps {
  id: string;
  data: DealsBy[];
  by: string;
}

// TODO: make labels scrollables
const DealsByChart: FC<DealsByChartProps> = ({ id, data = [], by }) => {
  const { theme } = useTheme();
  const formattedData = useMemo(() => {
    if (by === "Market") {
      return data.filter((deal) => deal.value > 0);
    }
    return data;
  }, [data, by]);

  useEffect(() => {
    const root = am5.Root.new(id);
    if (by === "Status") {
      const chartTheme = am5.Theme.new(root);
      chartTheme
        .rule("ColorSet")
        .set("colors", [
          am5.color("#d8c183"),
          am5.color("#b6d587"),
          am5.color("#c36047"),
          am5.color("#9c9c9c"),
        ]);
      setChartTheme({ root, theme, additionalThemes: [chartTheme] });
    } else {
      setChartTheme({ root, theme, dataLength: formattedData.length });
    }

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        radius: am5.percent(95),
        innerRadius: am5.percent(65),
        layout: root.verticalLayout,
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        categoryField: "nameToShow",
        valueField: "value",
        tooltip: setTooltip({
          theme,
          root,
          labelText: `{nameToShow}: {value}`,
        }),
      })
    );

    const finalData = formattedData.map((deal) => ({
      nameToShow: deal.label,
      value: deal.value,
    }));

    series.data.setAll(finalData);
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    const styles = getComputedStyle(document.documentElement);
    const labelsColor = am5.color(styles.getPropertyValue("--silver"));

    // Create legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
        height: am5.percent(45),
        paddingLeft: 50,
        verticalScrollbar: am5.Scrollbar.new(root, {
          orientation: "vertical",
        }),
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
      <div id={id} className="acq-deals-by-chart"></div>
    </>
  );
};

export default DealsByChart;
