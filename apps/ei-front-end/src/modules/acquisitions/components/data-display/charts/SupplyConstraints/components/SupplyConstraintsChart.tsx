import { HistoricalMarketStatisticsChartSupplyVSDemand } from "@/acquisitions/typings/market-analytics";
import am5, {
  darkColors,
  lightColors,
  setChartTheme,
} from "@/commons/utils/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect } from "react";
import "../styles.css";

interface SupplyConstraintsChartProps {
  id: string;
  data: HistoricalMarketStatisticsChartSupplyVSDemand[];
  currentMarket?: string;
}

const SupplyConstraintsChart: FC<SupplyConstraintsChartProps> = ({
  id,
  currentMarket,
  data = [],
}) => {
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

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50,
          inversed: true, // Inverse the axis to show the highest value at the top
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true, // Inverse the axis to show the highest value at the top
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.get("renderer").grid.template.set("strokeDasharray", 5);
    yAxis.get("renderer").grid.template.set("strokeDasharray", 5);

    const series0 = chart.series.push(
      am5xy.LineSeries.new(root, {
        calculateAggregates: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "y",
        valueXField: "x",
        tooltip: am5.Tooltip.new(root, {
          labelText:
            "[bold]{geography_name}[/]\nSupply: {valueY} | Demand: {valueX}\nPeriod: {period}",
        }),
      })
    );

    series0.bullets.push(function () {
      const bulletCircle = am5.Circle.new(root, {
        radius: 3.5,
        opacity: 0.5,
        interactive: true,
      });
      bulletCircle.adapters.add("opacity", (fill, target) => {
        const dataItem: HistoricalMarketStatisticsChartSupplyVSDemand =
          target.dataItem?.dataContext;

        if (dataItem?.geography_name === currentMarket) {
          return 1;
        }
        return 0.5;
      });

      bulletCircle.states.create("hover", {
        scale: 1.5,
      });

      bulletCircle.adapters.add("fill", (fill, target) => {
        const dataItem: HistoricalMarketStatisticsChartSupplyVSDemand =
          target.dataItem?.dataContext;

        if (dataItem?.geography_name === currentMarket) {
          return am5.color(
            theme.includes("dark") ? darkColors[0] : lightColors[0]
          );
        }
        // Default color for other bullets
        return am5.color(theme.includes("dark") ? "#ffffff" : "#5b5c58");
      });

      return am5.Bullet.new(root, {
        sprite: bulletCircle,
      });
    });

    series0.strokes.template.set("strokeOpacity", 0);

    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        snapToSeries: [series0],
      })
    );
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );
    series0.data.setAll(data);

    series0.appear(1000);

    chart.appear(1000, 100);

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
  }, [theme, id, data, currentMarket]);

  return <div id={id} className="acq-supply-constraints-chart"></div>;
};

export default SupplyConstraintsChart;
