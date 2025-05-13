import { LandComps } from "@/acquisitions/components/data-display/comp-tables/LandComps";
import { LeaseComps } from "@/acquisitions/components/data-display/comp-tables/LeaseComps";
import { StabilizedProperties } from "@/acquisitions/components/data-display/comp-tables/StabilizedProperties";
import { TransitionalProperties } from "@/acquisitions/components/data-display/comp-tables/TransitionalProperties";
import { useButtonGroupCompUIFilter } from "@/acquisitions/components/data-display/comp-tables/hooks/useButtonGroupCompUIFilter";
import { PageFilters } from "@/acquisitions/components/data-entry/PageFilters";
import { AcqHead } from "@/acquisitions/components/general/AcqHead";
import { InAcqPermissionsLayout } from "@/acquisitions/layouts/InAcqPermissionsLayout";
import { MarketAnalyticsLayout } from "@/acquisitions/layouts/MarketAnalyticsLayout";
import {
  useCreateComp,
  useDeleteComp,
  useEditComp,
} from "@/acquisitions/services/mutations/market-analytics";
import { useCompFilters } from "@/acquisitions/services/queries/filters";
import {
  useCompTotalsByType,
  useCompsByType,
} from "@/acquisitions/services/queries/market-analytics";
import { Comp } from "@/acquisitions/typings/market-analytics";
import { GenericFilterPayload, NextPageWithLayout } from "@/commons/typings";
import { ButtonGroup, Heading } from "in-ui-react";
import { ReactElement, useState } from "react";
import { CompModal } from "./components/CompModal";
import { CompsTableActions } from "./components/CompsTableActions";
import { DeleteCompForm } from "./components/forms/DeleteCompForm";
import { LandCompsForm } from "./components/forms/LandCompsForm";
import { LeaseCompForm } from "./components/forms/LeaseCompsForm";
import { StabilizedPropertiesForm } from "./components/forms/StabilizedPropertiesForm";
import { TransitionalPropertyForm } from "./components/forms/TransitionalPropertyForm";
import { useCompModal } from "./hooks/useCompModal";
import "./styles.css";
import { GenericCompUseMutation } from "./types";

const initialFilters = {
  search: "",
  market: "",
};

const MarketAnalytics: NextPageWithLayout = () => {
  const {
    compFilter,
    compFilterItems,
    allHeadingClasses,
    leaseCompClasses,
    salesCompsClasses,
  } = useButtonGroupCompUIFilter();
  const [filters, setFilters] = useState<GenericFilterPayload>(initialFilters);
  const { data: compFilters = [], isLoading: isCompFiltersLoading } =
    useCompFilters();
  const compFinalFilters =
    compFilters?.filter((filter) => filter.key !== "type") || [];

  const { state, createComp, editComp, deleteComp, resetModalState } =
    useCompModal();

  const onActions = {
    onCancel: () => resetModalState(),
    onAction: () => resetModalState(),
  };

  const onDelete = (comp: Comp) =>
    deleteComp({
      comp,
      Form: DeleteCompForm,
      useMutation: useDeleteComp as GenericCompUseMutation,
      ...onActions,
    });

  return (
    <section className="acq-market-analytics">
      <section className="acq-market-analytics-filters">
        <ButtonGroup active={compFilter} items={compFilterItems} />
        <PageFilters
          initialFilters={initialFilters}
          selectFields={compFinalFilters}
          applyFilters={(filters) => setFilters(filters)}
          isLoading={isCompFiltersLoading}
          clearFilters={() => setFilters(initialFilters)}
          hasSearch
        />
      </section>
      <LeaseComps
        className={leaseCompClasses}
        filters={filters}
        useQuery={useCompsByType}
        useQueryTotals={useCompTotalsByType}
        onMainAction={() => {
          createComp({
            useMutation: useCreateComp,
            header: "Add New Lease Comp",
            actionText: "Create new Lease Comp",
            Form: LeaseCompForm,
            ...onActions,
          });
        }}
        tableActions={(comp) => (
          <CompsTableActions
            onEdit={() =>
              editComp({
                comp,
                Form: LeaseCompForm,
                header: "Edit Lease Comp",
                actionText: "Edit Lease Comp",
                useMutation: useEditComp,
                ...onActions,
              })
            }
            onDelete={() => onDelete(comp)}
          />
        )}
      />
      <Heading kind="h3" className={allHeadingClasses}>
        Sales
      </Heading>
      <TransitionalProperties
        className={salesCompsClasses}
        filters={filters}
        useQuery={useCompsByType}
        useQueryTotals={useCompTotalsByType}
        onMainAction={() => {
          createComp({
            useMutation: useCreateComp,
            header: "Add New Transitional Property",
            actionText: "Create new Transitional P.",
            Form: TransitionalPropertyForm,
            ...onActions,
          });
        }}
        tableActions={(comp) => (
          <CompsTableActions
            onEdit={() =>
              editComp({
                comp,
                Form: TransitionalPropertyForm,
                header: "Edit Transitional Property",
                actionText: "Edit Transitional P.",
                useMutation: useEditComp,
                ...onActions,
              })
            }
            onDelete={() => onDelete(comp)}
          />
        )}
      />
      <StabilizedProperties
        className={salesCompsClasses}
        filters={filters}
        useQuery={useCompsByType}
        useQueryTotals={useCompTotalsByType}
        onMainAction={() => {
          createComp({
            useMutation: useCreateComp,
            header: "Add New Stabilized Property",
            actionText: "Create new Stabilized P.",
            Form: StabilizedPropertiesForm,
            ...onActions,
          });
        }}
        tableActions={(comp) => (
          <CompsTableActions
            onEdit={() =>
              editComp({
                comp,
                Form: StabilizedPropertiesForm,
                header: "Edit Stabilized Property",
                actionText: "Edit Stabilized P.",
                useMutation: useEditComp,
                ...onActions,
              })
            }
            onDelete={() => onDelete(comp)}
          />
        )}
      />
      <LandComps
        className={salesCompsClasses}
        filters={filters}
        useQuery={useCompsByType}
        useQueryTotals={useCompTotalsByType}
        onMainAction={() => {
          createComp({
            useMutation: useCreateComp,
            header: "Add New Land Comp",
            actionText: "Create new Land Comp",
            Form: LandCompsForm,
            ...onActions,
          });
        }}
        tableActions={(comp) => (
          <CompsTableActions
            onEdit={() =>
              editComp({
                comp,
                Form: LandCompsForm,
                header: "Edit Land Comp",
                actionText: "Edit Land Comp",
                useMutation: useEditComp,
                ...onActions,
              })
            }
            onDelete={() => onDelete(comp)}
          />
        )}
      />
      <CompModal {...state} onCancel={() => resetModalState()} />
    </section>
  );
};

MarketAnalytics.getLayout = (page: ReactElement) => {
  return (
    <InAcqPermissionsLayout>
      <MarketAnalyticsLayout>
        <AcqHead title="Market Analytics" />
        {page}
      </MarketAnalyticsLayout>
    </InAcqPermissionsLayout>
  );
};

export default MarketAnalytics;
