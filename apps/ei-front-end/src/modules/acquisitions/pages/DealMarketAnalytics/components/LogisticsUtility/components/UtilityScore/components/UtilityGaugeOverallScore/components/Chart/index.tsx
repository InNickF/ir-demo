import am5, { setChartTheme } from "@/commons/utils/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect, useMemo } from "react";
import { UtilityGaugeOverallScoreProps } from "../../props";
import "./styles.css";

const UtilityGaugeOverallScore: FC<UtilityGaugeOverallScoreProps> = ({
  id,
  data = 0,
}) => {
  const { theme } = useTheme();

  const finalValue = useMemo(() => {
    return data * 100;
  }, [data]);

  useEffect(() => {
    const root = am5.Root.new(id);
    setChartTheme({ root, theme });

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/radar-chart/
    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        startAngle: 180,
        endAngle: 360,
      })
    );

    chart.getNumberFormatter().set("numberFormat", "#'%'");

    // Create axis and its renderer
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
    const axisRenderer = am5radar.AxisRendererCircular.new(root, {
      innerRadius: -20,
    });

    axisRenderer.grid.template.setAll({
      stroke: root.interfaceColors.get("background"),
      visible: true,
      strokeOpacity: 0.8,
    });

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        max: 100,
        strictMinMax: true,
        renderer: axisRenderer,
      })
    );

    // Add clock hand
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
    const axisDataItem = xAxis.makeDataItem({});

    const styles = getComputedStyle(document.documentElement);
    const labelsColor = am5.color(styles.getPropertyValue("--silver"));

    const clockHand = am5radar.ClockHand.new(root, {
      pinRadius: 27.5,
      radius: am5.percent(100),
      innerRadius: 27.5,
      bottomWidth: 0,
      topWidth: 0,
    });

    clockHand.pin.setAll({
      fillOpacity: 0,
      strokeOpacity: 0.5,
      stroke: am5.color(theme.includes("dark") ? "#ffffff" : "#333333"),
      strokeWidth: 0.5,
      strokeDasharray: [5, 3],
    });

    clockHand.hand.setAll({
      fillOpacity: 0,
      strokeOpacity: 0.5,
      stroke: am5.color(theme.includes("dark") ? "#ffffff" : "#333333"),
      strokeWidth: 1,
    });

    const bullet = axisDataItem.set(
      "bullet",
      am5xy.AxisBullet.new(root, {
        sprite: clockHand,
      })
    );

    xAxis.createAxisRange(axisDataItem);

    const label = chart.radarContainer.children.push(
      am5.Label.new(root, {
        centerX: am5.percent(50),
        textAlign: "center",
        centerY: am5.percent(50),
        fontSize: "1rem",
      })
    );

    axisDataItem.set("value", finalValue); // set the initial value using the data prop

    bullet.get("sprite").on("rotation", function () {
      label.set("text", Math.round(finalValue).toString() + "%");
      label.set("fill", labelsColor);
    });

    chart.bulletsContainer.set("mask", undefined);

    xAxis.get("renderer").labels.template.setAll({
      fill: labelsColor,
    });

    interface BandData {
      color: string;
      lowScore: number;
      highScore: number;
    }

    const bandsData: BandData[] = [
      {
        color: styles.getPropertyValue("--error-darker"),
        lowScore: 0,
        highScore: 20,
      },
      {
        color: styles.getPropertyValue("--error"),
        lowScore: 20,
        highScore: 40,
      },
      {
        color: styles.getPropertyValue("--warning"),
        lowScore: 40,
        highScore: 60,
      },
      {
        color: styles.getPropertyValue("--success"),
        lowScore: 60,
        highScore: 80,
      },
      {
        color: styles.getPropertyValue("--success-darker"),
        lowScore: 80,
        highScore: 100,
      },
    ];

    bandsData.forEach((band) => {
      const axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));

      axisRange.setAll({
        value: band.lowScore,
        endValue: band.highScore,
      });

      axisRange.get("axisFill").setAll({
        visible: true,
        fill: am5.color(band.color),
        fillOpacity: 0.8,
      });

      axisRange.get("label").setAll({
        inside: true,
        fontSize: "0.9em",
        fill: root.interfaceColors.get("background"),
      });

      axisRange.animate({
        key: "value",
        from: band.highScore,
        to: band.lowScore,
        duration: 2000,
        easing: am5.ease.out(am5.ease.cubic),
      });
    });

    axisDataItem.animate({
      key: "value",
      to: finalValue,
      duration: 1000,
      easing: am5.ease.out(am5.ease.cubic),
    });

    // Make stuff animate on load
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [id, finalValue, theme]);

  return <div id={id} className="acq-utility-overall-score-gauge-chart"></div>;
};

export default UtilityGaugeOverallScore;
