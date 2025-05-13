import { AcqHead } from "@/acquisitions/components/general/AcqHead";
import { FundOverviewLayout } from "@/acquisitions/layouts/FundOverviewLayout";
import { InAcqPermissionsLayout } from "@/acquisitions/layouts/InAcqPermissionsLayout";
import { useOverviewFilters } from "@/acquisitions/services/queries/filters";
import { useStaggerEntranceAnimation } from "@/commons/hooks/useStaggerEntranceAnimation";
import { NextPageWithLayout } from "@/commons/typings";
import { Filters, FiltersPayloadType, SelectFilterType } from "in-ui-react";
import { useAtom } from "jotai";
import { ReactElement, useMemo, useRef } from "react";
import { CriticalDates } from "./components/CriticalDates";
import { DealsBy } from "./components/DealsBy";
import { DealsGeography } from "./components/DealsGeography";
import { EquityRequirements } from "./components/EquityRequirements";
import { PipelineBy } from "./components/PipelineBy";
import { PipelineSummaryByDealTable } from "./components/PipelineSummaryByDealTable";
import { overviewPageFilterAtom } from "./store/jotai";
import "./styles.css";

const FundsOverview: NextPageWithLayout = () => {
  const [pageFilters, setPageFilters] = useAtom(overviewPageFilterAtom);
  const { data: overviewFilters = [], isLoading: isFiltersLoading } =
    useOverviewFilters();

  const memoFilters: SelectFilterType[] = useMemo(
    () =>
      overviewFilters?.map(
        (filter) =>
          ({
            ...filter,
            key: `${filter.key}__in`,
            type: "multi-select",
          } as SelectFilterType)
      ),
    [overviewFilters]
  );

  const pageContainer = useRef(null);
  const animationClass = "stagger-entrance-animation";
  useStaggerEntranceAnimation({
    container: pageContainer,
  });

  return (
    <>
      <Filters
        filters={memoFilters ?? []}
        filteredOptions={pageFilters as FiltersPayloadType}
        onApply={(filteredOptions) => {
          setPageFilters(filteredOptions);
        }}
        className="mb-6"
        isLoading={isFiltersLoading}
        autoInitialFocus={false}
      />
      <div ref={pageContainer} className="acq-overview-grid">
        <div className="acq-overview-grid__first-row">
          <PipelineBy className={animationClass} filters={{}} />
          <DealsGeography className={animationClass} filters={{}} />
          <DealsBy className={animationClass} filters={{}} />
        </div>
        <div className="acq-overview-grid__second-row">
          <EquityRequirements className={animationClass} filters={{}} />
          <CriticalDates className={animationClass} filters={{}} />
        </div>
        <PipelineSummaryByDealTable className={animationClass} filters={{}} />
      </div>
    </>
  );
};

FundsOverview.getLayout = (page: ReactElement) => {
  return (
    <InAcqPermissionsLayout>
      <AcqHead title="Overview" />
      <FundOverviewLayout>{page}</FundOverviewLayout>
    </InAcqPermissionsLayout>
  );
};

export default FundsOverview;
