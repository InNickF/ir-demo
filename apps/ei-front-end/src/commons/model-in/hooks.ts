import { useState } from "react";
import { Model } from "./entities/models/types";
import { Entity } from "./entities/types";
import { Module } from "./registries/types";
import { SharedFilterSchema, WidgetConfig } from "./types";
import { Widget } from "./widgets/types";

interface UseModuleOptionsParams<TModules extends Module[]> {
  modules: TModules;
}
export const useModuleOptions = <TModules extends Module[]>({
  modules,
}: UseModuleOptionsParams<TModules>) => {
  const options = modules.map((m) => ({
    label: m.label,
    value: m.id,
  }));

  const [selectedModule, setSelectedModule] = useState<{
    value: TModules[number]["id"];
    label: TModules[number]["label"];
  }>(null);

  const entities =
    modules.find((m) => m.id === selectedModule?.value)?.entities || [];

  return {
    options,
    selectedModule,
    setSelectedModule,
    entities,
    modules,
  };
};

interface UseEntityOptionsParams<TEntities extends Entity[]> {
  entities: TEntities;
}
export const useEntityOptions = <TEntities extends Entity[]>({
  entities,
}: UseEntityOptionsParams<TEntities>) => {
  const options = entities.map((entity) => ({
    label: entity.label,
    value: entity.id,
  }));

  const [selectedEntity, setSelectedEntity] = useState<{
    value: TEntities[number]["id"];
    label: TEntities[number]["label"];
  }>(null);

  const models =
    entities.find((model) => model.id === selectedEntity?.value)?.models || [];

  return {
    options,
    selectedEntity,
    setSelectedEntity,
    models,
    entities,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface UseModelOptionsParams<TModels extends Model<any, any>[]> {
  models: TModels;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useModelOptions = <TModels extends Model<any, any>[]>({
  models,
}: UseModelOptionsParams<TModels>) => {
  const options = models.map((model) => ({
    label: model.label,
    value: model.id,
  }));

  const [selectedModel, setSelectedModel] = useState<{
    value: TModels[number]["id"];
    label: TModels[number]["label"];
  }>(null);

  const widgets =
    models.find((model) => model.id === selectedModel?.value)?.widgets || [];

  return {
    options,
    selectedModel,
    setSelectedModel,
    widgets,
    models,
  };
};

interface UseWidgetOptionsParams<
  TWidgets extends Widget<SharedFilterSchema, WidgetConfig>[]
> {
  widgets: TWidgets;
}
export const useWidgetOptions = <
  TWidgets extends Widget<SharedFilterSchema, WidgetConfig>[]
>({
  widgets,
}: UseWidgetOptionsParams<TWidgets>) => {
  const options = widgets.map((widget) => ({
    label: widget.label,
    value: widget.id,
  }));

  const [selectedWidget, setSelectedWidget] = useState<{
    value: TWidgets[number]["id"];
    label: TWidgets[number]["label"];
  }>(null);

  const widget = widgets.find((widget) => widget.id === selectedWidget?.value);

  return {
    options,
    selectedWidget,
    setSelectedWidget,
    widget,
    widgets,
  };
};
