import { GenericLabelValueObject } from "@/commons/typings";
import am5, { setChartTheme, setTooltip } from "@/commons/utils/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import { useTheme } from "in-ui-react";
import { FC, useEffect } from "react";
import { z } from "zod";
import "./styles.css";

interface GenericLabelValuePieChartProps {
  id: string;
  data: GenericLabelValueObject<z.ZodNumber>[];
  className?: string;
  valueNumberFormat?: string;
  chartSettings?: am5percent.IPieSeriesSettings;
}
const GenericLabelValuePieChart: FC<GenericLabelValuePieChartProps> = ({
  id,
  data,
  className,
  valueNumberFormat,
  chartSettings,
}) => {
  const { theme } = useTheme();
  const getClasses = () => {
    const classes = ["commons-generic-date-pie-chart"];
    className && classes.push(className);
    return classes.join(" ");
  };

  useEffect(() => {
    const root = am5.Root.new(id);
    setChartTheme({ root, theme });

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        radius: am5.percent(80),
        innerRadius: am5.percent(45),
        layout: root.verticalLayout,
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        categoryField: "nameToShow",
        valueField: "value",
        legendLabelText: "{nameToShow}: {value}",
        tooltip: setTooltip({
          theme,
          root,
          labelText: `{nameToShow}: {value}`,
        }),
        ...chartSettings,
      })
    );
    const formatterData = data?.map((item) => ({
      ...item,
      nameToShow: item.label,
    }));

    if (valueNumberFormat) {
      root.numberFormatter.setAll({
        numberFormat: valueNumberFormat,
        numericFields: ["value"],
      });
    }

    series.data?.setAll(formatterData);
    series.labels.template.set("forceHidden", true);
    series.ticks.template.set("forceHidden", true);

    const styles = getComputedStyle(document.documentElement);
    const labelsColor = am5.color(styles.getPropertyValue("--silver"));

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginBottom: 5,
        height: am5.percent(45),
        verticalScrollbar: am5.Scrollbar.new(root, {
          orientation: "vertical",
        }),
      })
    );
    legend.valueLabels.template.set("forceHidden", true);

    legend.labels.template.set("fill", labelsColor);

    legend.data.setAll(series.dataItems);

    legend.markers.template.setAll({
      width: 8,
      height: 8,
    });

    legend.markerRectangles.template.setAll({
      cornerRadiusTL: 8,
      cornerRadiusTR: 8,
      cornerRadiusBL: 8,
      cornerRadiusBR: 8,
    });

    legend.labels.template.setAll({
      fontSize: 10,
    });

    legend.valueLabels.template.setAll({
      fontSize: 10,
    });

    chart.appear(1000, 100);
    chart.series.each((series) => {
      series.appear(1000, 100);
    });
    return () => {
      root.dispose();
    };
  }, [theme, data, id, valueNumberFormat, chartSettings]);

  return <div id={id} className={getClasses()}></div>;
};

export default GenericLabelValuePieChart;
