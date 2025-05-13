import { Preset } from "@/commons/model-in/configs/presets/types";
import {
  ConfigSettingsSchema,
  SetSettings,
} from "@/commons/model-in/configs/types";
import { generateLiteralSchema } from "@/commons/utils/schemas";
import { Button } from "in-ui-react";
import { useMemo } from "react";
import { z } from "zod";
import "./styles.css";

interface PresetsListButtonsProps<TConfigSchema extends ConfigSettingsSchema> {
  schema: TConfigSchema;
  presets: Preset<TConfigSchema>[];
  settings: z.infer<TConfigSchema>;
  setSettings: SetSettings<TConfigSchema>;
  className?: string;
}
export const PresetsListButtons = <TConfigSchema extends ConfigSettingsSchema>({
  presets = [],
  setSettings,
  settings,
  className,
}: PresetsListButtonsProps<TConfigSchema>) => {
  const getClasses = (): string => {
    const classes = ["flex", "flex-wrap", "items-center", "gap-2"];
    className && classes.push(className);
    return classes.join(" ");
  };
  return presets.length ? (
    <div className={getClasses()}>
      <small>Presets:</small>{" "}
      {presets?.map((preset) => {
        return (
          <PresetButton
            key={preset.id}
            preset={preset}
            settings={settings}
            setSettings={setSettings}
          />
        );
      })}
    </div>
  ) : null;
};

const PresetButton = <TConfigSchema extends ConfigSettingsSchema>({
  preset,
  settings,
  setSettings,
}: Pick<PresetsListButtonsProps<TConfigSchema>, "settings" | "setSettings"> & {
  preset: Preset<TConfigSchema>;
}) => {
  const literalSchema = useMemo(() => {
    return generateLiteralSchema(preset.settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isActive = literalSchema.safeParse(settings).success;

  return (
    <Button
      size="small"
      className="commons-widgets-presets-list-button"
      kind={isActive ? "solid" : "ghost"}
      onClick={() => {
        setSettings({ ...settings, ...preset.settings });
      }}
    >
      {preset.label}
    </Button>
  );
};
