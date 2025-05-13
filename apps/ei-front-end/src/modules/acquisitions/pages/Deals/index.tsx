import { AcqHead } from "@/acquisitions/components/general/AcqHead";
import { DealsLayout } from "@/acquisitions/layouts/DealsLayout";
import { InAcqPermissionsLayout } from "@/acquisitions/layouts/InAcqPermissionsLayout";
import { useDealsSummaryFilters } from "@/acquisitions/services/queries/filters";
import { NextPageWithLayout } from "@/commons/typings";
import {
  Container,
  FilterType,
  Filters,
  FiltersPayloadType,
  Loader,
  SelectFilterType,
  TextFilterType,
  useFilters,
} from "in-ui-react";
import dynamic from "next/dynamic";
import { ReactElement, useMemo } from "react";
import "./styles.css";

const DealSmartsheet = dynamic(
  () => import("./components/DealSmartsheet").then((mod) => mod.DealSmartsheet),
  {
    ssr: false,
    loading: () => (
      <div className="flex w-full justify-center items-center h-12">
        <Loader />
      </div>
    ),
  }
);

const DealsSummary: NextPageWithLayout = () => {
  const { filteredOptions, onApply } = useFilters();
  const { data: administrationFilters = [], isLoading } =
    useDealsSummaryFilters();

  const memoFilters: FilterType[] = useMemo(() => {
    const apiFilters = administrationFilters?.map(
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
  }, [administrationFilters]);

  return (
    <>
      <Container className="acq-deals-summary-filters">
        <header className="acq-deals-filters-header">
          <Filters
            filters={memoFilters ?? []}
            filteredOptions={filteredOptions as FiltersPayloadType}
            onApply={onApply}
            isLoading={isLoading}
          />
        </header>
      </Container>
      <DealSmartsheet />
    </>
  );
};

DealsSummary.getLayout = (page: ReactElement) => {
  return (
    <InAcqPermissionsLayout>
      <AcqHead title="Deals" />
      <DealsLayout title="Deals" hasButton collapsed>
        {page}
      </DealsLayout>
    </InAcqPermissionsLayout>
  );
};

export default DealsSummary;
