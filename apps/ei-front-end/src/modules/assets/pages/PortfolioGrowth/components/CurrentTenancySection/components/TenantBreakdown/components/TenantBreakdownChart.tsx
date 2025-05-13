import am5, { setChartTheme, setTooltip } from "@/commons/utils/amcharts5";
import { LegacyTenantBreakdown } from "@/modules/assets/typings/asset-growth";
import * as am5percent from "@amcharts/amcharts5/percent";
import { useTheme } from "in-ui-react";
import { FC, useEffect } from "react";
import { TenancyCalculationType } from "../../..";
import "../styles.css";

export interface TenantBreakdownChartProps {
  id: string;
  data: LegacyTenantBreakdown[];
  calculationType: TenancyCalculationType;
}

const TenantBreakdownChart: FC<TenantBreakdownChartProps> = ({
  id,
  data = [],
  calculationType,
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    const root = am5.Root.new(id);
    setChartTheme({ root, theme });
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
        tooltip: setTooltip({
          theme,
          root,
          args: {
            labelText:
              calculationType === "annual_rent"
                ? "{category}: \u0024{value.formatNumber('#,###.')}"
                : "{category}: {value.formatNumber('#,###.')}",
          },
        }),
      })
    );

    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    const sortData = data.sort((a, b) => b.value - a.value);
    series.data.setAll(sortData);

    // Create legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
        height: am5.percent(45),
        width: am5.percent(80),
        verticalScrollbar: am5.Scrollbar.new(root, {
          orientation: "vertical",
        }),
        clickTarget: "none",
      })
    );
    legend.valueLabels.template.set("forceHidden", true);

    const styles = getComputedStyle(document.documentElement);
    const labelsColor = am5.color(styles.getPropertyValue("--silver"));

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

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, id, data]);

  return <div id={id} className="assets-tenant-breakdown-chart"></div>;
};

export default TenantBreakdownChart;
