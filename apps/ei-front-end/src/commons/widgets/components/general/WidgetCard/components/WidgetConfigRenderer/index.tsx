import { ConfigSettingsSchema } from "@/commons/model-in/configs/types";
import { useConfig } from "@/commons/model-in/widgets/hooks";
import { PresetsListButtons } from "@/commons/widgets/components/general/PresetsListButtons";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Button, Modal } from "in-ui-react";
import { useCallback, useMemo, useState } from "react";
import { z } from "zod";

interface WidgetConfigRendererProps<TSchema extends ConfigSettingsSchema> {
  title: string;
  useConfig: typeof useConfig<TSchema>;
  onClose?: () => void;
  onApply?: () => void;
}
export const WidgetConfigRenderer = <TSchema extends ConfigSettingsSchema>({
  useConfig,
  title,
  onApply,
  onClose,
}: WidgetConfigRendererProps<TSchema>) => {
  const [show, setShow] = useState(false);
  const state = useConfig();
  const Component = useMemo(() => state.Component, [state.Component]);
  const close = () => {
    setShow(false);
    onClose?.();
  };

  const setSettings = useCallback(
    (settings: z.infer<TSchema>) => {
      state.setSettings({ ...settings });
      onApply?.();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.setSettings, onApply]
  );

  return (
    <>
      <Button
        onlyIcon
        kind="ghost"
        size="small"
        icon={<Cog6ToothIcon />}
        onClick={() => {
          setShow((prev) => !prev);
        }}
      />
      <Modal
        disclosure={<span className="hidden"></span>}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            close();
          }
        }}
        visible={show}
        options={{ modal: false, animated: true }}
      >
        {() => (
          <>
            <Modal.Header
              onClose={() => {
                close?.();
              }}
            >
              {title} Settings
            </Modal.Header>
            <section className="h-[600px] overflow-auto">
              {!state.query.isLoading &&
              state.query.data &&
              state.presets.length ? (
                <PresetsListButtons
                  className="mx-8 pt-4"
                  presets={state.presets}
                  schema={state.schema}
                  setSettings={setSettings}
                  settings={state.query.data?.settings}
                />
              ) : null}

              {!state.query.isLoading &&
              state.query.data.settings &&
              Component ? (
                <Component
                  schema={state.schema}
                  presets={state.presets}
                  settings={state.query.data.settings}
                  setSettings={setSettings}
                  isLoading={state.query.isLoading}
                  isRefetching={state.query.isFetching}
                />
              ) : null}
            </section>
          </>
        )}
      </Modal>
    </>
  );
};
