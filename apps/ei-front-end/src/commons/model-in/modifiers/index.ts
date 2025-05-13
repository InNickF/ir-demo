import { z } from "zod";
import {
  MapType,
  ModifiedValue,
  ModifierGenerator,
  ModifierParams,
} from "./types";

/**
 * Builds the target data object by iterating over `target.shape` and resolving
 * each key based on the mapping (`map`) or by using a direct key from the original data.
 *
 * @param parsedOriginal - Data already validated against the original schema.
 * @param targetSchema   - The target Zod schema (shaped) for the final data.
 * @param map            - Mapping instructions: either a function or a string referencing original keys.
 *
 * @returns An object matching the target schema shape, with fields resolved via `map`.
 */
function buildTargetData<
  TOrig extends z.AnyZodObject,
  TTarget extends z.AnyZodObject
>({
  parsedOriginal,
  targetSchema,
  map,
}: {
  parsedOriginal: z.infer<TOrig>;
  targetSchema: TTarget;
  map: MapType<TOrig, TTarget>;
}): z.infer<TTarget> {
  const targetData = {} as z.infer<TTarget>;
  // For each key in the target schema, figure out how to assign the data.
  for (const key of Object.keys(targetSchema.shape)) {
    const mapValue = map?.[key];

    if (typeof mapValue === "function") {
      // If the map value is a function, use it to derive the target value.
      targetData[key as keyof z.infer<TTarget>] = mapValue(parsedOriginal);
    } else if (typeof mapValue === "string" && mapValue in parsedOriginal) {
      // If the map value is a string, use it as a key from the original data.
      targetData[key as keyof z.infer<TTarget>] =
        parsedOriginal[mapValue as keyof typeof parsedOriginal];
    } else if (key in parsedOriginal) {
      // Otherwise, try to assign the same key from the original data.
      targetData[key as keyof z.infer<TTarget>] =
        parsedOriginal[key as keyof typeof parsedOriginal];
    } else {
      // No valid mapping found => throw an error.
      throw new Error(
        `No mapping found for key '${key}' in the original schema.`
      );
    }
  }
  return targetData;
}

/**
 * A modifier generator that transforms data from `original` schema to `target` schema.
 * If `target` is not provided, it defaults to `original`. If `original === target`,
 * we simply return the data unmodified.
 */
export const modifierGenerator: ModifierGenerator = ({
  original,
  target = original, // Default to the `original` schema if `target` is not provided.
  map,
}) => {
  return <TOriginal, TTarget = TOriginal>({
    data,
  }: ModifierParams<TOriginal>): ModifiedValue<TOriginal, TTarget> => {
    // If schemas are identical, skip mapping.
    if (original === target) {
      return {
        modified: data as unknown as TTarget,
        getOriginal: () => data,
      };
    }

    // 1. Validate the data against the `original` schema.
    const parsedOriginal = original.parse(data);

    // 2. Build the target object using the mapping instructions.
    const targetData = buildTargetData({
      parsedOriginal,
      targetSchema: target,
      map,
    });

    // 3. Return the final converted object along with the `getOriginal` method.
    return {
      modified: { ...targetData },
      getOriginal: () => parsedOriginal,
    } as ModifiedValue<TOriginal, TTarget>;
  };
};
