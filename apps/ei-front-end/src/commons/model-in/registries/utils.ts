import { IdObject } from "../types";

export const addOrReplaceInRegistry = <T extends IdObject>(
  array: T[],
  item: T
): void => {
  const index = array.findIndex((x) => x.id === item.id);
  if (index !== -1) {
    array[index] = item;
    console.warn(`Element with id ${item.id} already exists in the registry.`);
  } else {
    array.push(item);
  }
};
