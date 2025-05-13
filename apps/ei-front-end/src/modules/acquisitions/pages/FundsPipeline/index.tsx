import { AcqHead } from "@/acquisitions/components/general/AcqHead";
import { FundOverviewLayout } from "@/acquisitions/layouts/FundOverviewLayout";
import { InAcqPermissionsLayout } from "@/acquisitions/layouts/InAcqPermissionsLayout";
import { useOverviewFilters } from "@/acquisitions/services/queries/filters";
import { NextPageWithLayout } from "@/commons/typings";
import {
  Container,
  FilterType,
  Filters,
  FiltersPayloadType,
  SelectFilterType,
  TextFilterType,
} from "in-ui-react";
import { useAtom } from "jotai";
import { ReactElement, useMemo } from "react";
import { pipelinePageFilterAtom } from "../FundsOverview/store/jotai";
import { PipelineSCRUM } from "./components/PipelineSCRUM";
import "./styles.css";

const FundsPipeline: NextPageWithLayout = () => {
  const [pageFilters, setPageFilters] = useAtom(pipelinePageFilterAtom);
  const { data: overviewFilters = [], isLoading: isFiltersLoading } =
    useOverviewFilters();

  const memoFilters: FilterType[] = useMemo(() => {
    const apiFilters = overviewFilters?.map(
      (filter) =>
        ({
          ...filter,
          key: `${filter.key}__in`,
          type: "multi-select",
        } as SelectFilterType)
    );
    return [
      { key: "search", name: "Search", type: "text" } as TextFilterType,
      ...apiFilters,
    ];
  }, [overviewFilters]);

  const MemoPipeline = useMemo(() => {
    return <PipelineSCRUM filters={{}} />;
  }, []);

  return (
    <>
      <Container className="acq-funds-pipeline-filters">
        <Filters
          filters={memoFilters ?? []}
          filteredOptions={pageFilters as FiltersPayloadType}
          onApply={(filteredOptions) => {
            setPageFilters(filteredOptions);
          }}
          isLoading={isFiltersLoading}
          autoInitialFocus={false}
        />
      </Container>
      {MemoPipeline}
    </>
  );
};

FundsPipeline.getLayout = (page: ReactElement) => {
  return (
    <InAcqPermissionsLayout>
      <AcqHead title="Pipeline" />
      <FundOverviewLayout>{page}</FundOverviewLayout>
    </InAcqPermissionsLayout>
  );
};

export default FundsPipeline;
