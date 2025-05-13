/* eslint-disable @typescript-eslint/no-explicit-any */
import am5, { setChartTheme } from "@/commons/utils/amcharts5";
import {
  Tree,
  ForceDirected,
  Pack,
  Partition,
  Sunburst,
  Treemap,
} from "@amcharts/amcharts5/hierarchy";
import { Select, useTheme } from "in-ui-react";
import { FC, useEffect, useRef, useState } from "react";

interface TreeChartProps {
  data: any;
  className?: string;
  options?: any;
}

const TreeChart: FC<TreeChartProps> = ({
  data,
  className,
  options = {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
  },
}) => {
  const charts = [
    { label: "Tree", value: Tree },
    { label: "ForceDirected", value: ForceDirected },
    { label: "Pack", value: Pack },
    { label: "Partition", value: Partition },
    { label: "Sunburst", value: Sunburst },
    { label: "Treemap", value: Treemap },
  ];
  const [_, rerender] = useState(0);

  const chartType = useRef<any>(Tree);

  const { theme } = useTheme();

  useEffect(() => {
    // Don't do anything if chartType is null (e.g., charts not initialized)
    if (!chartType.current) return;

    const root = am5.Root.new("tree");
    setChartTheme({ root, theme });

    // Create container for the chart
    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      })
    );

    // Create chart series based on selected chart type
    const series = container.children.push(
      chartType.current.new(root, { ...options })
    );

    // Set data
    series.data.setAll(data);

    // Cleanup on unmount
    return () => {
      root.dispose();
    };
  }, [chartType, data, theme, _, options]); // Dependencies: chart type, data, theme

  return (
    <>
      <Select
        label="Select Chart Type"
        className="mb-4"
        options={charts}
        defaultValue={charts[0]}
        onChange={(option) => {
          chartType.current = option.value;
          rerender((prev) => prev + 1);
        }} // Set selected chart type
      />
      <div id="tree" className={className}></div>
    </>
  );
};

export default TreeChart;
