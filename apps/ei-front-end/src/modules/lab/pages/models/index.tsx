import { Loader3D } from "@/commons/components/3d/Loader3D";
import { useIsMounted } from "@/commons/hooks/useIsMounted";
import {
  ModuleWidgetRenderer,
  WidgetInstanceMetadata,
} from "@/commons/model-in";
import { useFindConfigs } from "@/commons/model-in/db/services/queries";
import {
  useEntityOptions,
  useModelOptions,
  useModuleOptions,
  useWidgetOptions,
} from "@/commons/model-in/hooks";
import { NextPageWithLayout } from "@/commons/typings";
import { createUUID } from "@/commons/utils/uuid";
import { LabHead } from "@/lab/components/general/LabHead";
import { BaseLayout } from "@/lab/layouts/BaseLayout";
import { assetsModuleRegistry } from "@/modules/assets";
import { Button, Select } from "in-ui-react";
import { ReactElement, useMemo, useState } from "react";

const Models: NextPageWithLayout = () => {
  const isMounted = useIsMounted();
  const {
    entities,
    options: moduleOptions,
    selectedModule,
    setSelectedModule,
    modules,
  } = useModuleOptions({
    modules: [assetsModuleRegistry],
  });

  const {
    models,
    options: entityOptions,
    selectedEntity,
    setSelectedEntity,
  } = useEntityOptions({
    entities,
  });

  const {
    widgets,
    options: modelOptions,
    selectedModel,
    setSelectedModel,
  } = useModelOptions({ models });

  const {
    widget,
    options: widgetOptions,
    setSelectedWidget,
    selectedWidget,
  } = useWidgetOptions({ widgets });

  const [activeWidgets, setActiveWidgets] = useState<WidgetInstanceMetadata[]>(
    []
  );

  const {
    query: { data, isLoading },
  } = useFindConfigs({
    filters: {
      view: "Lab renderer",
    },
  });

  const dbWidgetsMetadata: WidgetInstanceMetadata[] = useMemo(() => {
    return (
      data?.map((w) => ({
        id: w.id,
        metadata: {
          app: { id: "ei", label: "I.R." },
          id: w.widget,
          module: {
            id: w.module,
            label: modules.find((m) => m.id === w.module)?.label,
          },
          entity: {
            id: w.entity,
            label: entities.find((e) => e.id === w.entity)?.label,
          },
          model: {
            id: w.model,
            label: models.find((m) => m.id === w.model)?.label,
          },
          tags: w.tags,
          needsEntityId: w.needsEntityId,
          label: w.label,
        },
      })) || []
    );
  }, [data]);

  return (
    <div className="commons-grid gap-[2rem!important]">
      <div className="commons-grid-span-3 mb-4">
        {isMounted && (
          <>
            <Select
              label="Modules"
              value={selectedModule}
              onChange={(m) => {
                setSelectedModule(m);
                setSelectedEntity(null);
                setSelectedModel(null);
                setSelectedWidget(null);
              }}
              options={moduleOptions}
            />
            <Select
              label="Entities"
              value={selectedEntity}
              onChange={(entity) => {
                setSelectedEntity(entity);
                setSelectedModel(null);
                setSelectedWidget(null);
              }}
              options={entityOptions}
            />
            <Select
              label="Models"
              value={selectedModel}
              onChange={(model) => {
                setSelectedModel(model);
                setSelectedWidget(null);
              }}
              options={modelOptions}
            />
            <Select
              label="Widgets"
              value={selectedWidget}
              onChange={setSelectedWidget}
              options={widgetOptions}
            />
            <Button
              className="mt-4"
              block
              onClick={() => {
                widget &&
                  setActiveWidgets([
                    ...activeWidgets,
                    {
                      id: createUUID(),
                      metadata: structuredClone(widget?.metadata),
                    },
                  ]);
              }}
            >
              Add Widget
            </Button>
          </>
        )}
      </div>
      <div className="commons-grid-span-9 mb-4">
        {!isLoading ? (
          <ModuleWidgetRenderer
            view="Lab renderer"
            id="test-module-widget-renderer"
            moduleRegistry={modules[0]}
            widgetInstancesMetadata={[...dbWidgetsMetadata, ...activeWidgets]}
            resourceFilterRegister={assetsModuleRegistry}
          />
        ) : (
          <Loader3D />
        )}
      </div>
    </div>
  );
};

Models.getLayout = (page: ReactElement) => {
  return (
    <>
      <LabHead title="Models" />
      <BaseLayout title="Models">{page}</BaseLayout>
    </>
  );
};

export default Models;
