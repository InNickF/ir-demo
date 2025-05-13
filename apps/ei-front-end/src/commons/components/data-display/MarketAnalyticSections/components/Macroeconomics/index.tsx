import { EcommerceSales } from "@/acquisitions/components/data-display/charts/EcommerceSales";
import { RetailSales } from "@/acquisitions/components/data-display/charts/RetailSales";
import { Sofr } from "@/acquisitions/components/data-display/charts/Sofr";
import { TenYrNote } from "@/acquisitions/components/data-display/charts/TenYrNote";
import { useDateFilters } from "@/commons/hooks/useDateFilters";
import { IsLoadingProp, IsRefetchingProp } from "@/commons/typings";
import {
  FiltersByMarket,
  FiltersBySubMarket,
} from "@/modules/acquisitions/typings/market-analytics";
import { Filters, useFilters } from "in-ui-react";
import { FC } from "react";
import { MarketAnalyticsSectionContainer } from "../MarketAnalyticsSectionContainer";

interface MacroeconomicsPropsBase extends IsLoadingProp, IsRefetchingProp {}

interface MacroeconomicsByMarketProps
  extends MacroeconomicsPropsBase,
    FiltersByMarket {}
interface MacroeconomicsBySubMarketProps
  extends MacroeconomicsPropsBase,
    FiltersByMarket,
    FiltersBySubMarket {}

type MacroeconomicsProps =
  | MacroeconomicsByMarketProps
  | MacroeconomicsBySubMarketProps;

export const Macroeconomics: FC<MacroeconomicsProps> = (props) => {
  const isFilteringBySubmarket = "submarket" in props;
  const { filteredOptions, onApply } = useFilters({
    date: "",
  });
  const dateFilters = useDateFilters({
    initialFilters: [],
    isClearable: true,
    unDeletable: true,
    showApplyButton: true,
  });

  return (
    <MarketAnalyticsSectionContainer title="Macroeconomics">
      <Filters
        className="mb-3"
        filters={dateFilters}
        filteredOptions={filteredOptions}
        onApply={onApply}
        hideAddButton
        kind="glass"
      />
      <div className="commons-grid">
        <Sofr className="commons-grid-span-6" filters={{}} />
        <TenYrNote className="commons-grid-span-6" filters={{}} />
        {isFilteringBySubmarket ? (
          <>
            <EcommerceSales
              className="commons-grid-span-6"
              filters={{}}
              submarket={props?.submarket}
            />
            <RetailSales
              className="commons-grid-span-6"
              filters={{}}
              submarket={props?.submarket}
            />
          </>
        ) : (
          <>
            <EcommerceSales
              className="commons-grid-span-6"
              filters={{}}
              market={props?.market}
            />
            <RetailSales
              className="commons-grid-span-6"
              filters={{}}
              market={props?.market}
            />
          </>
        )}
      </div>
    </MarketAnalyticsSectionContainer>
  );
};
