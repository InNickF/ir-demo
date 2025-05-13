import { FilterSchema } from "@/commons/model-in/types";
import { useFilters } from "@/commons/model-in/widgets/hooks";
import { Filters } from "in-ui-react";

interface WidgetFiltersRendererProps<TSchema extends FilterSchema> {
  useFilters: typeof useFilters<TSchema>;
  onApply: () => void;
}

export const WidgetFiltersRenderer = <TSchema extends FilterSchema>({
  useFilters,
  onApply,
}: WidgetFiltersRendererProps<TSchema>) => {
  const state = useFilters();
  const shouldHideButton = state.options.every(
    (filter) => !!filter.unDeletable
  );
  const shouldHideFiltersTitle = !state.options.length;

  return (
    <Filters
      filters={state.options}
      filteredOptions={state.filteredOptions}
      onApply={(filters) => {
        state.onApply(filters);
        onApply?.();
      }}
      hideTitle={shouldHideFiltersTitle}
      hideAddButton={shouldHideButton}
      isLoading={state.query.isLoading}
      autoInitialFocus={false}
    />
  );
};
