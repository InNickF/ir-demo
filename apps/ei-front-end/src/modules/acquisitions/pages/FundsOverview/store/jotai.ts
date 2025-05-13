import { GenericFilterPayload } from "@/commons/typings";
import { atomWithStorage } from "jotai/utils";

const overviewInitialFilters = {};

const pipelineInitialFilters = {};

export const overviewPageFilterAtom = atomWithStorage<GenericFilterPayload>(
  "acq-overview-page-filters",
  overviewInitialFilters
);

export const pipelinePageFilterAtom = atomWithStorage<GenericFilterPayload>(
  "acq-pipeline-page-filters",
  pipelineInitialFilters
);
