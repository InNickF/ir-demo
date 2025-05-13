import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import { ConfigSettingsSchema } from "@/commons/model-in/configs/types";
import { FilterSchema } from "@/commons/model-in/types";
import { useConfig, useFilters } from "@/commons/model-in/widgets/hooks";
import { OutsidePresetsRenderer } from "./components/OutsidePresetsRenderer";
import { WidgetConfigRenderer } from "./components/WidgetConfigRenderer";
import { WidgetFiltersRenderer } from "./components/WidgetFiltersRenderer";

export interface WidgetCardProps<
  TConfig extends ConfigSettingsSchema,
  TFilterSchema extends FilterSchema
> extends CardWithHeaderProps {
  useConfig?: typeof useConfig<TConfig>;
  useFilters?: typeof useFilters<TFilterSchema>;
  onApplySettings?: () => void;
  onCloseSettings?: () => void;
  onApplyFilters?: () => void;
}
export const WidgetCard = <
  TConfig extends ConfigSettingsSchema,
  TFilterSchema extends FilterSchema
>({
  headerActions,
  useConfig,
  useFilters,
  children,
  onApplySettings,
  onCloseSettings,
  onApplyFilters,
  ...props
}: WidgetCardProps<TConfig, TFilterSchema>) => {
  return (
    <CardWithHeader
      headerActions={
        <aside className="flex items-center gap-2 md:justify-end md:flex-row-reverse">
          {useConfig ? (
            <WidgetConfigRenderer
              useConfig={useConfig}
              title={props.title}
              onApply={onApplySettings}
              onClose={onCloseSettings}
            />
          ) : null}

          {useConfig ? <OutsidePresetsRenderer useConfig={useConfig} /> : null}

          {useFilters ? (
            <WidgetFiltersRenderer
              useFilters={useFilters}
              onApply={onApplyFilters}
            />
          ) : null}

          {headerActions}
        </aside>
      }
      {...props}
    >
      {children}
    </CardWithHeader>
  );
};
