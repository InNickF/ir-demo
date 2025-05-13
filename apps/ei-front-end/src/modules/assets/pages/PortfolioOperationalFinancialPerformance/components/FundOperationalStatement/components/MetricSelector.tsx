import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { OPERATIONAL_STATEMENT_METRICS } from "@/modules/assets/utils/operational-financial-performance";
import { Label, Select } from "in-ui-react";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { fundOperationalStatementMetricsVisibilityAtom } from "../store";
import {
  FundOperationalStatementBaseMetrics,
  fundOperationalStatementTableAssetColumnId,
  fundOperationalStatementTableColumnsIdSuffixSeparator,
  setOnlyOneOperationalStatementColumnVisibility,
  setOperationalStatementColumnsAllVisibility,
} from "../utils";

type Option = {
  label: string;
  value: FundOperationalStatementBaseMetrics | "all";
};

const allValue: Option = {
  label: "All",
  value: "all",
};

export const MetricSelector = () => {
  const [visibility, setVisibility] = useAtom(
    fundOperationalStatementMetricsVisibilityAtom
  );

  const options: Option[] = useMemo(() => {
    return [
      allValue,
      ...OPERATIONAL_STATEMENT_METRICS.map((metric) => ({
        label: convertToTitleCase(humanizeSnakeCase(metric)),
        value: metric,
      })),
    ];
  }, []);

  const defaultValue = useMemo(() => {
    const areAllMetricsSelected = Object.values(visibility).every(
      (value) => value
    );

    if (areAllMetricsSelected) {
      return allValue;
    }

    // get first key that is true
    const selectedMetrics = Object.entries(visibility).find(
      ([key, value]) =>
        value && key !== fundOperationalStatementTableAssetColumnId
    );

    if (selectedMetrics) {
      // get key string
      const metric = selectedMetrics[0].split(
        fundOperationalStatementTableColumnsIdSuffixSeparator
      )[0] as FundOperationalStatementBaseMetrics;

      return {
        label: convertToTitleCase(humanizeSnakeCase(metric)),
        value: metric,
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (option: Option) => {
    if (option.value === "all") {
      setVisibility(setOperationalStatementColumnsAllVisibility());
    }
    if (option.value !== "all") {
      setVisibility(
        setOnlyOneOperationalStatementColumnVisibility(option.value)
      );
    }
  };

  return (
    <div className="relative flex gap-2 items-center z-navigation">
      <Label>Selected Metric:</Label>
      <Select
        onChange={handleChange}
        options={options}
        defaultValue={defaultValue}
      />
    </div>
  );
};
