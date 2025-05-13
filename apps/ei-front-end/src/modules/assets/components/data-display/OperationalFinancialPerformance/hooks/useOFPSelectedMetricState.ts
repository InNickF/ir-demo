import { OperationalFinancialPerformanceTableMetrics } from "@/modules/assets/typings/operational-financial-performance";
import { useEffect, useState } from "react";

interface UseOFPSelectedMetricStateParams {
  data: OperationalFinancialPerformanceTableMetrics[];
}
export const useOFPSelectedMetricState = ({
  data = [],
}: UseOFPSelectedMetricStateParams) => {
  const [selectedMetric, setSelectedMetric] = useState<string>(
    data?.[0]?.metric || ""
  );

  useEffect(
    function setInitialMetricOnDataChange() {
      data?.length && setSelectedMetric(data[0]?.metric);
    },
    [data]
  );

  return [selectedMetric, setSelectedMetric] as const;
};
