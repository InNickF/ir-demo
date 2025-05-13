import am5, {
  darkColors,
  lightColors,
  setTooltip,
} from "@/commons/utils/amcharts5";
import { AssetStakingPlan } from "@/modules/assets/typings/properties";
import { leasesColors } from "@/modules/assets/utils/leases-colors";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import { useTheme } from "in-ui-react";
import { FC, useEffect } from "react";
import LegendStackingPlanChart from "./component/LegendStackingPlanChart";

type StackItem = Omit<
  AssetStakingPlan,
  | "market_percentage"
  | "market_rent"
  | "last_updated_market_prices"
  | "annual_rent_psf"
> & {
  market_percentage: string;
  market_rent: string;
  last_updated_market_prices: string;
  annual_rent_psf: string;
};
interface StackingPlanChartProps {
  id: string;
  data: StackItem[];
}

const leaseConditions = [
  {
    name: "LONG_TERM",
    threshold: { min: 24 },
    colorKey: "green",
    comparator(value) {
      return value > this.threshold.min;
    },
  },
  {
    name: "SHORT_TERM",
    threshold: { min: 12, max: 24 },
    colorKey: "yellow",
    comparator(value) {
      return value > this.threshold.min && value <= this.threshold.max;
    },
  },
  {
    name: "VACANT_TERM",
    threshold: { min: 0, max: 12 },
    colorKey: "red",
    comparator(value) {
      return value > this.threshold.min && value <= this.threshold.max;
    },
  },
  {
    name: "NO_TERM",
    threshold: { max: 0 },
    colorKey: "grey",
    comparator(value) {
      return value <= this.threshold.max;
    },
  },
];

const remainingTermConditions = [
  {
    name: "LONG_TERM",
    threshold: { min: 5 },
    colorKey: "green",
    comparator(value) {
      return value > this.threshold.min;
    },
  },
  {
    name: "STABLE",
    threshold: { min: -5, max: 5 },
    colorKey: "yellow",
    comparator(value) {
      return value >= this.threshold.min && value <= this.threshold.max;
    },
  },
  {
    name: "DECLINING",
    threshold: { min: -20, max: -5 },
    colorKey: "orange",
    comparator(value) {
      return value >= this.threshold.min && value < this.threshold.max;
    },
  },
  {
    name: "CRITICAL",
    threshold: { max: -20 },
    colorKey: "red",
    comparator(value) {
      return value <= this.threshold.max;
    },
  },
];

const StackingPlanChart: FC<StackingPlanChartProps> = ({ id, data }) => {
  const { theme } = useTheme();
  const chartColors = theme.includes("dark") ? darkColors : lightColors;

  useEffect(
    function loadTreeMapChart() {
      const root = am5.Root.new(id);

      // Create wrapper container
      const chart = root.container.children.push(
        am5.Container.new(root, {
          width: am5.percent(100),
          height: am5.percent(100),
          layout: root.verticalLayout,
        })
      );

      const series = chart.children.push(
        am5hierarchy.Treemap.new(root, {
          singleBranchOnly: false,
          downDepth: 1,
          upDepth: 1,
          initialDepth: 1,
          nodePaddingOuter: 10,
          nodePaddingInner: 10,
          valueField: "sf",
          categoryField: "tenant",
          childDataField: "children",
        })
      );

      const tooltipText = () => {
        const color = theme.includes("dark") ? "#333333" : "#ffffff";

        return `
          <div style="overflow: hidden; color: ${color}">
            <p>Tenant: {tenant}</p>
            <p>Tenant Code: {tenant_code}</p>
            <p>SF: {value}</p>
            <p>Lease Expiration: {lxd}</p>
            <p>Annual Rent PSF: \u0024{annual_rent_psf}</p>
            <p>Market Data: {market_rent}</p>
            <p>Last Updated Market Prices: {last_updated_market_prices}</p>
            <p>Vs. Market: {market_percentage}</p>
            <p>Remaining Term: {remaining_term}</p>
            <p>Unit Codes: {unit_codes}</p>
          </div>
        `;
      };

      series.nodes.template.setAll({
        tooltip: setTooltip({
          root,
          theme,
        }),
        tooltipHTML: tooltipText(),
      });

      const leaseExpirationColors = leasesColors({
        baseColors: chartColors,
        opacity: 0.5,
      });

      const getLeaseVsMarketStatusColor = (value) => {
        const condition = remainingTermConditions.find((condition) =>
          condition.comparator(value)
        );
        return (
          condition && am5.color(leaseExpirationColors[condition.colorKey])
        );
      };

      const getLeaseColor = (value) => {
        const condition = leaseConditions.find((condition) =>
          condition.comparator(value)
        );
        return (
          condition && am5.color(leaseExpirationColors[condition.colorKey])
        );
      };

      series.rectangles.template.adapters.add("fill", (_, target) => {
        const value = Number(target.dataItem.dataContext["remaining_term"]);
        return getLeaseColor(value);
      });

      series.rectangles.template.setAll({
        strokeWidth: 2,
      });

      const marketRentColors = leasesColors({
        baseColors: chartColors,
      });

      series.rectangles.template.adapters.add("stroke", (_, target) => {
        const tenantName = target.dataItem.dataContext["name"];
        if (tenantName === "VACANT") {
          return am5.color(marketRentColors["grey"]);
        }

        const percentageMarket = String(
          target.dataItem.dataContext["market_percentage"]
        ).replace("%", "");
        const value = Number(percentageMarket);

        return getLeaseVsMarketStatusColor(value);
      });

      series.data.setAll([
        {
          name: "",
          children: data,
        },
      ]);

      series.labels.each((label) => {
        const dataPoint = label.dataItem.dataContext["remaining_term"];
        label.setAll({
          fill: dataPoint > 0 ? am5.color("#333333") : am5.color("#ffffff"),
          fontSize: 12,
          paddingLeft: 5,
          paddingRight: 5,
        });
      });

      return () => {
        root.dispose();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id, data, theme]
  );

  return (
    <div>
      <div id={id} className="w-full min-h-[300px] h-full clear-both mt-1" />
      <LegendStackingPlanChart />
    </div>
  );
};

export default StackingPlanChart;
