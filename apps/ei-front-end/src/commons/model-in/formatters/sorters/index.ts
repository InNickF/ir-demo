import { z } from "zod";
import { ModelSchema } from "../../types";

export const COMMON_SORT_KINDS = [
  "string",
  "number",
  "date",
  "boolean",
] as const;
export type CommonSortKind = typeof COMMON_SORT_KINDS[number];

type TargetObject = z.infer<ModelSchema>;

export type SortValueKindObject = {
  value: string | number;
  kind: CommonSortKind;
};

export type SorterFunction<T extends TargetObject> = (args: {
  item: T;
  key: keyof T;
  isDescending: boolean;
}) => SortValueKindObject;

export type SorterMap<T extends TargetObject> = Partial<{
  [key in keyof T]: CommonSortKind | SorterFunction<T>;
}>;

export interface SortElementsParams<T extends TargetObject> {
  items: T[];
  sorter: SorterMap<T>;
  sortBy: `${string & keyof T}` | `-${string & keyof T}`;
}

const formatDate = (dateString?: string): Date => {
  if (!dateString) {
    return new Date(0);
  }
  const [month, day, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

export const sortItems = <T extends TargetObject>({
  items = [],
  sorter: sorters,
  sortBy,
}: SortElementsParams<T>): T[] => {
  const sortByValue = sortBy || "";
  const key = sortByValue.startsWith("-") ? sortByValue.slice(1) : sortByValue;
  const isDescending = sortByValue.startsWith("-");

  const getValueAndType = (item: T, key: string) => {
    const sorter = sorters?.[key];
    if (typeof sorter === "function") {
      return sorter({ item, key, isDescending });
    } else if (typeof sorter === "boolean") {
      return { value: item[key], kind: "boolean" };
    } else if (sorter) {
      return { value: item[key], kind: sorter };
    } else {
      const value = item[key];
      const kind = typeof value === "number" ? "number" : "string";
      return { value, kind };
    }
  };

  const compare = (a: T, b: T) => {
    const { value: valueA, kind: kindA } = getValueAndType(a, key);
    const { value: valueB, kind: kindB } = getValueAndType(b, key);

    if (kindA !== kindB) {
      throw new Error(`Mismatched types: ${kindA} vs ${kindB}`);
    }

    if (kindA === "date") {
      const dateA = formatDate(valueA);
      const dateB = formatDate(valueB);
      return isDescending
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    } else if (kindA === "boolean") {
      return isDescending
        ? Number(valueB) - Number(valueA)
        : Number(valueA) - Number(valueB);
    } else if (kindA === "number") {
      return isDescending ? valueB - valueA : valueA - valueB;
    } else {
      return isDescending
        ? valueB?.localeCompare(valueA)
        : valueA?.localeCompare(valueB);
    }
  };

  return [...items.sort(compare)];
};

export const legacyCreateSorterMap = <T extends TargetObject>({
  data,
  excludeKeys = [],
}: {
  data: T[];
  excludeKeys?: (keyof T)[];
}): SorterMap<T> => {
  const tableKeys = data?.[0] && Object.keys(data[0]);

  if (!tableKeys) return {};

  const sorters: SorterMap<T> = {};

  const keys = Object.keys(data[0]) as (keyof T)[];

  keys.forEach((key) => {
    if (excludeKeys.includes(key)) {
      return;
    }
    const value = data[0][key];
    const kind = typeof value === "number" ? "number" : "string";
    sorters[key] = kind;
  });
  return sorters;
};
interface CreateSorterMap<TModelSchema extends ModelSchema> {
  schema: TModelSchema;
  map?: SorterMap<z.infer<TModelSchema>>;
}
export const createSorterMap = <TModelSchema extends ModelSchema>({
  schema,
  map = {},
}: CreateSorterMap<TModelSchema>): SorterMap<z.infer<TModelSchema>> => {
  const keys = Object.keys(schema.shape) as (keyof z.infer<TModelSchema>)[];

  const sorter: SorterMap<z.infer<TModelSchema>> = {};

  const getTypeForKey = (
    key: string,
    schema: z.ZodTypeAny
  ): typeof COMMON_SORT_KINDS[number] => {
    if (schema.safeParse(1).success) {
      return "number";
    }
    if (schema.safeParse(true).success) {
      return "boolean";
    }
    if (key.toLowerCase().includes("date")) {
      return "date";
    }

    return "string";
  };

  keys.forEach((key) => {
    const value = schema.shape[key];
    const kind = getTypeForKey(String(key), value);
    sorter[key] = kind;
  });

  return { ...sorter, ...map };
};
