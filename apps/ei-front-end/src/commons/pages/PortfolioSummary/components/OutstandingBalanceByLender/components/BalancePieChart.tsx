import am5, { setChartTheme } from "@/commons/utils/amcharts5";
import { FundLender } from "@/modules/debt/typings/fund";
import * as am5percent from "@amcharts/amcharts5/percent";
import { useTheme } from "in-ui-react";
import { FC, useEffect } from "react";
import "../styles.css";

interface BalancePieChartProps {
  id: string;
  data: FundLender[];
}

const BalancePieChart: FC<BalancePieChartProps> = ({ id, data = [] }) => {
  const { theme } = useTheme();
  useEffect(() => {
    const root = am5.Root.new(id);
    setChartTheme({ root, theme });
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        radius: am5.percent(90),
        innerRadius: am5.percent(50),
      })
    );

    // Create series
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "total",
        categoryField: "lender",
        tooltip: am5.Tooltip.new(root, {
          labelText: "[bold]{lender}[/]: \u0024{total.formatNumber('#,###.')}",
        }),
      })
    );

    series.data.setAll(data);

    // Disabling labels and ticks
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    chart.appear(1000, 100);
    chart.series.each((series) => {
      series.appear(1000, 100);
    });

    return () => {
      root.dispose();
    };
  }, [theme, id, data]);

  return <div id={id} className="debt-balance-by-lender-chart" />;
};

export default BalancePieChart;
