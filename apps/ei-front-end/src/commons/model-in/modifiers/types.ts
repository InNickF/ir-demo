import { z } from "zod";

/**
 * For each target key (K), the map can be either:
 * - A function that derives TTarget[K],
 * - A string referencing a key from TOrig,
 * - Potentially more scenarios if you want to add them.
 */
type MapValue<TOrigData, TTargetData, K extends keyof TTargetData> =
  | ((original: TOrigData) => TTargetData[K])
  | keyof TOrigData;

/**
 * Keys that are in TTarget but NOT in TOrig => required
 * Keys that are in BOTH TTarget and TOrig => optional
 */
export type MapType<
  TOrig extends z.AnyZodObject,
  TTarget extends z.AnyZodObject
> = {
  // 1) Required mappings for keys that exist in TTarget but not in TOrig.
  [K in Exclude<keyof z.infer<TTarget>, keyof z.infer<TOrig>>]: MapValue<
    z.infer<TOrig>,
    z.infer<TTarget>,
    K
  >;
} & {
  // 2) Optional mappings for keys that also exist in TOrig.
  [K in Extract<keyof z.infer<TTarget>, keyof z.infer<TOrig>>]?: MapValue<
    z.infer<TOrig>,
    z.infer<TTarget>,
    K
  >;
};

export interface ModifierGeneratorParams<
  TOrig extends z.AnyZodObject,
  TTarget extends z.AnyZodObject = TOrig
> {
  original: TOrig;
  target?: TTarget;
  map: MapType<TOrig, TTarget>;
}

export type ModifierGenerator = <
  TOriginalSchema extends z.AnyZodObject,
  TTargetSchema extends z.AnyZodObject = TOriginalSchema
>(
  params: ModifierGeneratorParams<TOriginalSchema, TTargetSchema>
) => Modifier<z.infer<TOriginalSchema>, z.infer<TTargetSchema>>;

export interface ModifierParams<TOriginal> {
  data: TOriginal;
}

export type ModifiedValue<TOriginal, TTarget = TOriginal> = {
  modified: TTarget;
  getOriginal: () => TOriginal;
};

export type Modifier<TOriginal, TTarget = TOriginal> = (
  params: ModifierParams<TOriginal>
) => ModifiedValue<TOriginal, TTarget>;
