import am5, {
  darkColors,
  lightColors,
  setChartTheme,
  setTooltip,
} from "@/commons/utils/amcharts5";
import { numberToDollar } from "@/commons/model-in/formatters/utils/amount-conversions";
import {
  LeaseExpirationGraph,
  LegacyTenant,
} from "@/modules/assets/typings/tenants";
import { leasesColors } from "@/modules/assets/utils/leases-colors";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useTheme } from "in-ui-react";
import { FC, useEffect, useRef } from "react";

interface LeaseExpirationPortraitChartProps {
  id: string;
  tenants: LeaseExpirationGraph[];
  tenantsProperties?: LegacyTenant[];
}

const LeaseExpirationPortraitChart: FC<LeaseExpirationPortraitChartProps> = ({
  id,
  tenants,
  tenantsProperties,
}) => {
  const { theme } = useTheme();
  const wasRotated = useRef(false);
  const chartColors = theme.includes("dark") ? darkColors : lightColors;

  useEffect(
    function loadTreeMapChart() {
      const root = am5.Root.new(id);
      setChartTheme({ root, theme });
      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          layout: root.verticalLayout,
        })
      );

      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      chart.set(
        "scrollbarX",
        am5.Scrollbar.new(root, {
          orientation: "horizontal",
        })
      );

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      const xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 30,
      });
      const xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "year",
          renderer: xRenderer,
        })
      );

      xRenderer.grid.template.setAll({
        location: 1,
      });

      xAxis.data.setAll(tenants);

      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          min: 0,
          renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1,
          }),
          numberFormatter: am5.NumberFormatter.new(root, {
            numberFormat: "$#a",
            bigNumberPrefixes: [
              { number: 1e3, suffix: "K" },
              { number: 1e6, suffix: "M" },
              { number: 1e9, suffix: "B" },
            ],
          }),
        })
      );

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

      const styles = getComputedStyle(document.documentElement);
      const labelsColor = am5.color(styles.getPropertyValue("--silver"));

      xAxis.get("renderer").labels.template.setAll({
        fill: labelsColor,
      });

      yAxis.get("renderer").labels.template.setAll({
        fill: labelsColor,
      });

      const splitByLastDash = (str) => {
        if (str.indexOf("-") !== str.lastIndexOf("-")) {
          const lastIndexOf = str.lastIndexOf("-");
          return str.substring(0, lastIndexOf);
        }
        return str;
      };

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      const makeSeries = (name: string) => {
        const series = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: name,
            categoryXField: "year",
          })
        );

        series.columns.template.setAll({
          strokeWidth: 1,
          strokeOpacity: 1,
          stroke: am5.color(theme.includes("dark") ? "#FFFFFF" : "#000000"),
        });

        series.columns.template.adapters.add("fill", () => {
          const tenantName = splitByLastDash(name);
          const tenant = tenantsProperties?.find(
            (tenant) => tenant.name === tenantName
          );

          const expirationColors = leasesColors({
            baseColors: chartColors,
            opacity: 0.5,
          });

          if (tenant?.difDate > 24) {
            return am5.color(expirationColors["green"]);
          }

          if (tenant?.difDate > 12 && tenant?.difDate <= 24) {
            return am5.color(expirationColors["yellow"]);
          }

          return am5.color(expirationColors["red"]);
        });

        const tooltipText = () => {
          const textColor = theme.includes("dark") ? "#333333" : "#ffffff";
          const tenantName = splitByLastDash(name);
          const tenant = tenantsProperties.find(
            (tenant) => tenant.name === tenantName
          );
          const formattedRent = numberToDollar({
            value: tenant?.rent,
            options: {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            },
          });
          const formattedTerm = Number(tenant?.term / 12).toFixed(2);
          const formattedLCD = new Date(tenant?.lcd).toLocaleDateString(
            "en-EN"
          );
          const formattedLXD = new Date(tenant?.lxd).toLocaleDateString(
            "en-EN"
          );
          const grossNet = tenant?.grossNet;

          return `
            <div style="overflow: hidden; color: ${textColor}">
              <p>Rent: ${formattedRent}</p>
              <p>Name: ${tenant?.name}</p>
              <p>Term: ${formattedTerm}</p>
              <p>LCD: ${formattedLCD}</p>
              <p>LXD: ${formattedLXD}</p>
              <p>Gross/Net: ${grossNet}</p>
            </div>
          `;
        };

        series.columns.template.setAll({
          tooltip: setTooltip({
            root,
            theme,
          }),
          tooltipHTML: tooltipText(),
        });

        series.data.setAll(tenants);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();

        root.numberFormatter.setAll({
          numberFormat: "#,###.",
          numericFields: ["valueY"],
        });
      };

      tenants?.forEach((tenant) => {
        const keys = Object.keys(tenant);
        keys?.forEach((key) => {
          if (key !== "year") {
            makeSeries(key);
          }
        });
      });

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);

      return () => {
        root.dispose();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id, tenants, tenantsProperties, theme]
  );

  return <div id={id} className="w-full min-h-[350px] clear-both mt-1" />;
};

export default LeaseExpirationPortraitChart;
