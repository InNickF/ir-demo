import { Model } from "../../entities/models/types";
import { Resource } from "../../resources/types";
import {
  BuildStep,
  DataResolverSchema,
  FilterSchema,
  ModelSchema,
  SharedFilterSchema,
  WidgetConfig,
} from "../../types";
import { RawWidgetComponent } from "../types";

interface BuildRawComponentOptions<
  TModel extends Model<
    ModelSchema,
    Resource<DataResolverSchema, SharedFilterSchema, FilterSchema>
  >,
  TConfig extends WidgetConfig | undefined
> {
  model: TModel;
  config?: TConfig;
}

export type BuildRawComponentFn = <
  TModel extends Model<
    ModelSchema,
    Resource<DataResolverSchema, SharedFilterSchema, FilterSchema>
  >,
  TConfig extends WidgetConfig | undefined = undefined
>(
  options: BuildRawComponentOptions<TModel, TConfig>,
  Component: RawWidgetComponent<
    TModel["schema"],
    TModel["resource"]["schema"],
    TModel["resource"]["sharedFilters"]["schema"],
    TModel["resource"]["filters"]["schema"],
    TConfig
  >
) => BuildStep<
  RawWidgetComponent<
    TModel["schema"],
    TModel["resource"]["schema"],
    TModel["resource"]["sharedFilters"]["schema"],
    TModel["resource"]["filters"]["schema"],
    TConfig
  >
>;
