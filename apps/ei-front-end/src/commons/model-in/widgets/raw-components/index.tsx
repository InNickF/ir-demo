import { BuildRawComponentFn } from "./types";

export const buildRawComponent: BuildRawComponentFn = (options, Component) => {
  return {
    build: () => Component,
  };
};
