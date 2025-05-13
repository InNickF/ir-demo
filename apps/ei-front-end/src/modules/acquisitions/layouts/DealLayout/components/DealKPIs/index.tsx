import { HeaderKpi } from "@/commons/components/layout/HeaderKpi";
import { IsLoadingProp } from "@/commons/typings";
import { getGenericValueOrString } from "@/commons/utils";
import { Deal } from "@/acquisitions/typings/deals";
import {
  CLOSING_PROBABILITY_TAGS,
  DEAL_STATUS_TAGS,
} from "@/acquisitions/utils";
import { TagProps } from "in-ui-react";

interface IDealKISs {
  title: string;
  key: "fund" | "phase" | "status" | "officer" | "law_firm_closing_probability";
}

const KPIs: IDealKISs[] = [
  {
    title: "Status",
    key: "status",
  },
  {
    title: "Closing Probab.",
    key: "law_firm_closing_probability",
  },
  {
    title: "Phase",
    key: "phase",
  },
  {
    title: "Fund",
    key: "fund",
  },
];

interface IDealKPIs extends IsLoadingProp {
  deal: Deal;
  onClick?: () => void;
}

export const DealKPIs = ({ deal, isLoading, onClick = null }: IDealKPIs) => {
  const getValue = (key: IDealKISs["key"]): string => {
    if (!deal) {
      return null;
    }
    const kpi = deal[key];

    if (typeof kpi === "object") {
      return kpi?.label || null;
    }

    return kpi;
  };

  const getTag = (key: IDealKISs["key"]): TagProps["color"] => {
    if (!deal) {
      return null;
    }
    const tags = {
      status: () =>
        DEAL_STATUS_TAGS.find(
          (tag) => tag.value === getGenericValueOrString(deal.status)
        )?.color,
      law_firm_closing_probability: () =>
        CLOSING_PROBABILITY_TAGS.find(
          (tag) =>
            tag.value ===
            getGenericValueOrString(deal.law_firm_closing_probability)
        )?.color,
    };

    return tags[key] ? tags[key]() : null;
  };

  const clickableKpis = ["status", "phase", "law_firm_closing_probability"];

  return (
    <>
      {KPIs.map(({ title, key }) => {
        const value = getValue(key);
        const tag = getTag(key);
        const KPIsWithTooltip: IDealKISs["key"][] = ["fund"];
        const renderTooltip = KPIsWithTooltip.includes(key);

        if (clickableKpis.includes(key)) {
          return (
            <HeaderKpi
              key={key}
              title={title}
              value={value}
              tag={tag}
              isLoading={isLoading}
              ellipsis={renderTooltip}
              onClick={() => onClick()}
            />
          );
        }

        return (
          <HeaderKpi
            key={key}
            title={title}
            value={value}
            tag={tag}
            isLoading={isLoading}
            ellipsis={renderTooltip}
          />
        );
      })}
    </>
  );
};
