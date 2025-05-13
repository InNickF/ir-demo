import { FundKpi } from "@/modules/debt/typings/fund";
import {
  ChartBarIcon,
  DocumentChartBarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { FC } from "react";
import { KpiCard } from "./components/KpiCard";

interface SummaryKpisProps {
  kpis: FundKpi[];
  isLoading?: boolean;
  className?: string;
}

export const SummaryKpis: FC<SummaryKpisProps> = ({
  kpis,
  isLoading = false,
  className,
}) => {
  const cardsHeaders = [
    {
      title: "Total Debt",
      icon: <DocumentChartBarIcon />,
    },
    {
      title: "Debt Information",
      icon: <DocumentTextIcon />,
    },
    {
      title: "Debt Metrics",
      icon: <ChartBarIcon />,
    },
  ];

  return (
    <>
      {kpis?.[0].fund?.map((item, index) => {
        return (
          <KpiCard
            title={cardsHeaders[index].title}
            icon={cardsHeaders[index].icon}
            key={index}
            isLoading={isLoading}
            data={item.data}
            className={className}
          />
        );
      })}
    </>
  );
};
