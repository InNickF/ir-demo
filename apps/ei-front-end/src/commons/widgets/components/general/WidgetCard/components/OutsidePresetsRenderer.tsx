import { ConfigSettingsSchema } from "@/commons/model-in/configs/types";
import { useConfig } from "@/commons/model-in/widgets/hooks";
import { PresetsListButtons } from "../../PresetsListButtons";

interface OutsidePresetsRendererProps<TSchema extends ConfigSettingsSchema> {
  useConfig: typeof useConfig<TSchema>;
}
export const OutsidePresetsRenderer = <TSchema extends ConfigSettingsSchema>({
  useConfig,
}: OutsidePresetsRendererProps<TSchema>) => {
  const state = useConfig();
  const hasPresets = state?.presets?.length > 1;
  const hasShowPresetsOption = state?.query?.data?.settings?.showPresets;

  return hasPresets && hasShowPresetsOption ? (
    <PresetsListButtons
      presets={state.presets}
      schema={state.schema}
      setSettings={state.setSettings}
      settings={state.query.data?.settings}
    />
  ) : null;
};
