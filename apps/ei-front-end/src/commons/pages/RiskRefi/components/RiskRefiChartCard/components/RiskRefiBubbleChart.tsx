import am5, { setChartTheme, setTooltip } from "@/commons/utils/amcharts5";
import { FundLenderByLtv } from "@/modules/debt/typings/fund";
import { Circle } from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect } from "react";
import "../styles.css";
import {
  riskRefiChartBulletSettings,
  riskRefiChartCustomTooltip,
} from "../utils";

interface RiskRefiBubbleChartProps {
  id: string;
  data?: FundLenderByLtv[];
  sortBy?: string;
}

const RiskRefiBubbleChart: FC<RiskRefiBubbleChartProps> = ({
  id,
  data = [],
  sortBy,
}) => {
  const { theme } = useTheme();
  useEffect(() => {
    const root = am5.Root.new(id);
    setChartTheme({ root, theme });
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
      })
    );

    const styles = getComputedStyle(document.documentElement);
    const labelsColor = am5.color(styles.getPropertyValue("--silver"));

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
        tooltip: am5.Tooltip.new(root, {}),
        numberFormatter: am5.NumberFormatter.new(root, {
          numberFormat: "#a%",
        }),
      })
    );

    xAxis.children.push(
      am5.Label.new(root, {
        text: "LTV",
        textAlign: "center",
        x: am5.p50,
        fill: labelsColor,
        fontWeight: "300",
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
        numberFormatter: am5.NumberFormatter.new(root, {
          numberFormat: "#a%",
        }),
      })
    );

    yAxis.children.unshift(
      am5.Label.new(root, {
        text: sortBy === "risk" ? "Debt Yield" : "Rate",
        textAlign: "center",
        y: am5.p50,
        rotation: -90,
        fill: labelsColor,
        fontWeight: "300",
      })
    );

    yAxis.get("renderer").labels.template.setAll({
      fill: labelsColor,
    });

    xAxis.get("renderer").labels.template.setAll({
      fill: labelsColor,
    });

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series0 = chart.series.push(
      am5xy.LineSeries.new(root, {
        calculateAggregates: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "y",
        valueXField: "x",
        valueField: "value",
        tooltip: setTooltip({
          theme,
          root,
          args: {
            labelText: "{customTooltipText}",
          },
        }),
      })
    );

    // Add bullet
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
    const circleTemplate = am5.Template.new<Circle>({});

    series0.bullets.push(function () {
      const graphics = am5.Circle.new(
        root,
        {
          templateField: "bulletSettings",
          fillOpacity: 0.5,
          strokeOpacity: 1,
        },
        circleTemplate
      );

      return am5.Bullet.new(root, {
        sprite: graphics,
      });
    });

    // Add heat rule
    // https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
    series0.set("heatRules", [
      {
        target: circleTemplate,
        min: 3,
        max: 35,
        dataField: "value",
        key: "radius",
      },
    ]);

    series0.strokes.template.set("strokeOpacity", 0);

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        snapToSeries: [series0],
      })
    );

    const finalData = data.map((item) => {
      return {
        y:
          sortBy === "risk"
            ? item.debt_yield_over_last_12_months_noidm * 100
            : item.calculated_interest_rate * 100,
        x: item?.current_ltv * 100,
        value: item.current_outstanding_loan_balance / 1_000_000,
        bulletSettings: riskRefiChartBulletSettings(
          item.initial_maturity_date,
          theme.includes("dark")
        ),
        customTooltipText: riskRefiChartCustomTooltip(item),
      };
    });

    series0.data.setAll(finalData);

    // Create axis ranges
    const rangeDataItemX = xAxis.makeDataItem({
      value: 45,
      endValue: 100,
    });

    const rangeDataItemY = yAxis.makeDataItem({
      value: sortBy === "risk" ? 4 : 3.4,
      endValue: 100,
    });

    series0.createAxisRange(rangeDataItemX);
    series0.createAxisRange(rangeDataItemY);

    rangeDataItemX.get("axisFill").setAll({
      fill: sortBy === "risk" ? am5.color("#E95B44") : am5.color("#46864f"),
      fillOpacity: 0.1,
      visible: true,
    });

    rangeDataItemY.get("axisFill").setAll({
      fill: sortBy === "risk" ? am5.color("#46864f") : am5.color("#E95B44"),
      fillOpacity: 0.1,
      visible: true,
    });

    xAxis.events.on("boundschanged", (ev) => {
      const chartWidth = ev.target.gridContainer.width();
      const isRisk = sortBy === "risk";
      rangeDataItemX.get("axisFill").setAll({
        y: isRisk ? yAxis.height() * 0.84 : yAxis.height() * 0.86,
      });

      if (chartWidth < 400) {
        rangeDataItemY.get("axisFill").setAll({
          x: isRisk ? -xAxis.width() * 0.38 : -xAxis.width() * 0.38,
        });
      } else {
        rangeDataItemY.get("axisFill").setAll({
          x: isRisk ? -xAxis.width() * 0.43 : -xAxis.width() * 0.43,
        });
      }
    });

    return () => {
      root.dispose();
    };
  }, [theme, id, data, sortBy]);

  return (
    <>
      <div id={id} className="debt-risk-refi-bubble-chart"></div>
    </>
  );
};

export default RiskRefiBubbleChart;
