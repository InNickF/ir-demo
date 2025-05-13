import { CompsMap } from "@/acquisitions/components/data-display/CompsMap";
import { CompstackCompTableActionsType } from "@/acquisitions/components/data-display/compstack-comp-tables/types";
import { useAllCompstackComps } from "@/acquisitions/services/queries/market-analytics";
import { Deal } from "@/acquisitions/typings/deals";
import {
  CompstackComp,
  FiltersBySubMarket,
} from "@/acquisitions/typings/market-analytics";
import { PageContainer } from "@/commons/components/layout/PageContainer";
import { IsLoadingProp, IsRefetchingProp } from "@/commons/typings";
import { GetAllCompstackCompsFiltersBase } from "@/modules/acquisitions/services/api/market-analytics";
import { compstackCompTypeLabelValue } from "@/modules/acquisitions/utils";
import { FilterType, OptionType, useFilters } from "in-ui-react";
import { forwardRef, useCallback, useRef } from "react";
import { MapRef } from "react-map-gl";
import { CompFilters } from "../../data-entry/CompFilters";
import { CompsFinderAddCompModal } from "./components/CompsFinderAddCompModal";
import { CompsFinderDrawer } from "./components/CompsFinderDrawer";
import { CompsFinderDrawerActions } from "./components/CompsFinderDrawerActions";
import { CompsFinderDrawerContent } from "./components/CompsFinderDrawerContent";
import { CompsFinderLegend } from "./components/CompsFinderLegend";
import { CompsFinderResultsWrapper } from "./components/CompsFinderResultsWrapper";
import { CompsFinderSearchInput } from "./components/CompsFinderSearchInput";
import { CompsFinderTables } from "./components/CompsFinderTables";
import { CompsFinderToggleView } from "./components/CompsFinderToggleView";
import { useCompsFinderToggleView } from "./hooks/useCompsFinderToggleView";
import "./styles.css";

interface CompsFinderPropsBase extends IsLoadingProp, IsRefetchingProp {
  deals?: Deal[];
  dealComps?: CompstackComp[];
  activeElement: CompstackComp | Deal | null;
  setActiveElement: (element: CompstackComp | Deal | null) => void;
  tableActions?: CompstackCompTableActionsType;
}

interface CompsFinderPropsBySubmarket
  extends CompsFinderPropsBase,
    FiltersBySubMarket {}
interface CompsFinderPropsByMarket extends CompsFinderPropsBase {
  market: string;
}

type CompsFinderProps = CompsFinderPropsBySubmarket | CompsFinderPropsByMarket;

const prefix = "acq-comps-finder";
const extraFilters: FilterType<OptionType>[] = [
  {
    key: "type",
    name: "Type",
    type: "simple-select",
    options: compstackCompTypeLabelValue as OptionType[],
    unDeletable: true,
  },
];
export const CompsFinder = forwardRef<MapRef, CompsFinderProps>(
  (
    {
      deals,
      isLoading,
      isRefetching,
      dealComps,
      activeElement,
      setActiveElement,
      tableActions,
      ...props
    },
    mapRef
  ) => {
    const { filteredOptions, onApply } =
      useFilters<GetAllCompstackCompsFiltersBase>({
        type: "all",
      });

    const isFilteringByMarket = "market" in props;
    const filtersBy = isFilteringByMarket
      ? { market: props?.market }
      : {
          submarket: props?.submarket,
          include_neighbors: "true",
        };

    const {
      data: comps = [],
      isLoading: isLoadingComps,
      isRefetching: isRefetchingComps,
    } = useAllCompstackComps({
      ...filtersBy,
      type: "all",
    });

    const { view, viewItems, views } = useCompsFinderToggleView({
      onChange: (view) => {
        if (view === views[0]) {
          setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
          }, 50);
        }
      },
    });

    const getDealsCount = (): number => {
      return deals?.length;
    };

    const isOneDeal = getDealsCount() === 1;

    const isMapView = view === views[0];
    const getMapWrapperClasses = (): string => {
      const classes = [`${prefix}-map-wrapper`];
      if (!isMapView) {
        classes.push(`hidden`);
      }
      return classes.join(" ");
    };

    const getTablesWrapperClasses = (): string => {
      const classes = [`${prefix}-tables-wrapper`];
      if (view !== views[1]) {
        classes.push(`hidden`);
      }
      return classes.join(" ");
    };

    const searchMapInputRef = useRef<HTMLInputElement>();
    const searchTablesInputRef = useRef<HTMLInputElement>();
    const onSearch = (search: string) => {
      searchMapInputRef.current.value = search;
      searchTablesInputRef.current.value = search;
      onApply({ ...filteredOptions, search });
    };

    const onClearFilters = () => {
      searchMapInputRef.current.value = "";
      searchTablesInputRef.current.value = "";
    };

    const clearSearch = () => {
      onClearFilters();
      onApply({ ...filteredOptions, search: "" });
    };

    const hasSearchApplied = !!filteredOptions?.search;
    const isTablesView = view === views[1];
    const getDrawerClasses = (): string => {
      if (isTablesView) {
        return "";
      }
      const classes = [`${prefix}-drawer`];
      !!activeElement && classes.push(`${prefix}-drawer--active`);
      return classes.join(" ");
    };

    const getActiveComp = (): CompstackComp | null => {
      if (activeElement && "type" in activeElement) {
        return activeElement as CompstackComp;
      }
      return null;
    };

    const onDealClick = (deal: Deal) => {
      !isOneDeal && setActiveElement(deal);
    };

    const onCompClick = useCallback(
      (comp: CompstackComp) => {
        setActiveElement(comp);
      },
      [setActiveElement]
    );

    return (
      <section className={prefix}>
        <section className={getMapWrapperClasses()}>
          <div className={`${prefix}-map-filters`}>
            <CompsFinderSearchInput
              ref={searchMapInputRef}
              onSearch={onSearch}
              onClear={hasSearchApplied ? clearSearch : null}
            />
            <CompFilters
              hideTitle
              filteredOptions={filteredOptions}
              onApply={onApply}
              onClear={onClearFilters}
              extraFilters={extraFilters}
            />
          </div>
          <CompsFinderAddCompModal
            className={`${prefix}-map-add-new-comp`}
            onlyIcon
          />
          <CompsFinderResultsWrapper
            className={`${prefix}-map-results`}
            isLoading={
              isLoading || isLoadingComps || isRefetching || isRefetchingComps
            }
            comps={comps}
            deals={deals}
          />
          {isOneDeal ? (
            <CompsFinderLegend className={`${prefix}-map-legends`} />
          ) : null}
          <CompsMap
            ref={mapRef}
            comps={comps}
            onCompClick={onCompClick}
            activeComp={getActiveComp()}
            onClick={() => {
              setActiveElement(null);
            }}
            deals={deals}
            onDealClick={!isOneDeal ? onDealClick : null}
            isLoading={isLoading || isLoadingComps}
            isRefetching={isRefetching || isRefetchingComps}
            dealComps={dealComps || []}
          />
        </section>
        <section className={getTablesWrapperClasses()}>
          <PageContainer className="acq-comps-finder-tables-container">
            <div className="acq-comps-finder-tables-header">
              <CompsFinderAddCompModal />
              <div className="acq-comps-finder-tables-filters">
                <CompsFinderSearchInput
                  ref={searchTablesInputRef}
                  onSearch={onSearch}
                  onClear={hasSearchApplied ? clearSearch : null}
                />
                <CompFilters
                  hideTitle
                  filteredOptions={{ type: "all" }}
                  onApply={onApply}
                  onClear={onClearFilters}
                  extraFilters={extraFilters}
                />
              </div>
            </div>
            {isFilteringByMarket ? (
              <CompsFinderTables
                market={props.market}
                extraFilters={{ type: "all" }}
                tableActions={tableActions}
              />
            ) : (
              <CompsFinderTables
                extraFilters={{ type: "all" }}
                submarket={props.submarket}
                tableActions={tableActions}
              />
            )}
          </PageContainer>
        </section>
        <CompsFinderToggleView activeView={view} views={viewItems} />
        <CompsFinderDrawer
          element={activeElement}
          className={getDrawerClasses()}
          onClose={() => {
            setActiveElement(null);
          }}
          withPortal={isTablesView}
          withOverlay={isTablesView}
          drawerActions={(element) => (
            <CompsFinderDrawerActions
              dealComps={dealComps}
              element={element}
              isLoading={
                isLoading || isLoadingComps || isRefetching || isRefetchingComps
              }
              dealContext={isOneDeal ? deals?.[0] : null}
            />
          )}
        >
          {(element) => <CompsFinderDrawerContent element={element} />}
        </CompsFinderDrawer>
      </section>
    );
  }
);

CompsFinder.displayName = "CompsFinder";
