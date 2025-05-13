import { Loader3D } from "@/commons/components/3d/Loader3D";
import { WidgetInstance } from "@/commons/model-in";
import { Module } from "@/commons/model-in/registries/types";
import { ResourceFiltersRegistry } from "@/commons/model-in/resources/filters/types";
import { SharedFilterSchema, WidgetConfig } from "@/commons/model-in/types";
import {
  WidgetConnectedData,
  WidgetInstanceMetadata,
} from "@/commons/model-in/widgets/types";
import { isWidgetMetadataEqual } from "@/commons/model-in/widgets/utils";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";

export interface ModuleWidgetsRendererParams<
  TRegistry extends ResourceFiltersRegistry
> {
  id: string;
  view: string;
  widgetInstancesMetadata: WidgetInstanceMetadata[];
  resourceFilterRegister: TRegistry;
  moduleRegistry: Module;
}
const BaseModuleWidgetRenderer = <TRegistry extends ResourceFiltersRegistry>({
  view,
  widgetInstancesMetadata = [],
  moduleRegistry,
}: ModuleWidgetsRendererParams<TRegistry>) => {
  const [connectedWidgets, setConnectedWidgets] = useState<
    WidgetConnectedData[]
  >([]);

  const onConnect = useCallback(
    (widget: WidgetConnectedData) => {
      setConnectedWidgets((prev) => [...prev, widget]);
    },
    [setConnectedWidgets]
  );

  const onDisconnect = useCallback(
    (widget: WidgetConnectedData) => {
      setConnectedWidgets((prev) =>
        prev?.filter((prevWidget) => {
          return !isWidgetMetadataEqual({
            prevWidget: prevWidget,
            nextWidget: widget,
          });
        })
      );
    },
    [setConnectedWidgets]
  );

  const widgetInstances: WidgetInstance<SharedFilterSchema, WidgetConfig>[] =
    useMemo(() => {
      return widgetInstancesMetadata
        ?.map((instance) => {
          const entity = moduleRegistry?.entities?.find(
            (entity) => entity.id === instance.metadata.entity.id
          );

          const model = entity?.models?.find(
            (model) => model.id === instance.metadata.model.id
          );

          const widgetDef = model?.widgets?.find(
            (widgetDef) => widgetDef.id === instance.metadata.id
          );

          if (!widgetDef) {
            return null;
          }

          return {
            id: instance.id,
            metadata: instance.metadata,
            widget: widgetDef,
          };
        })
        ?.filter(Boolean);
    }, [widgetInstancesMetadata, moduleRegistry]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 mt-2">
        {widgetInstances.map((instance) => (
          <instance.widget.Component
            key={instance.id}
            instanceId={instance.id}
            onConnect={onConnect}
            onDisconnect={onDisconnect}
            view={view}
          />
        ))}
      </div>
    </>
  );
};

export const ModuleWidgetRenderer = dynamic(
  () => Promise.resolve(BaseModuleWidgetRenderer),
  {
    ssr: false,
    loading: () => (
      <div className="flex w-full justify-center items-center h-96">
        <Loader3D
          kind="chart"
          style={{
            minHeight: 350,
          }}
          isLoading
          localIsLoading
          onChangeIsLoading={() => null}
        />
      </div>
    ),
  }
);
