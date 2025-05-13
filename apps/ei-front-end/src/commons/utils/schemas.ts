/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  z,
  ZodArray,
  ZodDefault,
  ZodNullable,
  ZodObject,
  ZodOptional,
  ZodTypeAny,
} from "zod";

export type DeepRemoveDefault<I extends ZodTypeAny> = I extends ZodDefault<
  infer T
>
  ? T
  : I extends ZodObject<infer T, infer U, infer C, infer O, infer I>
  ? ZodObject<{ [P in keyof T]: DeepRemoveDefault<T[P]> }, U, C, O, I>
  : I extends ZodArray<infer T, infer C>
  ? ZodArray<DeepRemoveDefault<T>, C>
  : I extends ZodOptional<infer T>
  ? ZodOptional<DeepRemoveDefault<T>>
  : I extends ZodNullable<infer T>
  ? ZodNullable<DeepRemoveDefault<T>>
  : I;

export function deepRemoveDefaults<I extends ZodTypeAny>(
  schema: I
): DeepRemoveDefault<I> {
  if (schema instanceof z.ZodDefault)
    return deepRemoveDefaults(schema.removeDefault());

  if (schema instanceof z.ZodObject) {
    const newShape: any = {};

    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = deepRemoveDefaults(fieldSchema);
    }
    return new z.ZodObject({
      ...schema._def,
      shape: () => newShape,
    }) as any;
  }

  if (schema instanceof z.ZodArray)
    return z.ZodArray.create(
      deepRemoveDefaults(schema.element)
    ) as DeepRemoveDefault<I>;

  if (schema instanceof z.ZodOptional)
    return z.ZodOptional.create(
      deepRemoveDefaults(schema.unwrap())
    ) as DeepRemoveDefault<I>;

  if (schema instanceof z.ZodNullable)
    return z.ZodNullable.create(
      deepRemoveDefaults(schema.unwrap())
    ) as DeepRemoveDefault<I>;

  return schema as DeepRemoveDefault<I>;
}

export const generateLiteralSchema = (value: unknown): z.ZodTypeAny => {
  if (
    value === null ||
    ["string", "number", "boolean"].includes(typeof value)
  ) {
    return z.literal(value as string | number | boolean | null);
  }
  if (Array.isArray(value)) {
    // Use a tuple if you expect a fixed order and length.
    return z.tuple(
      value.map(generateLiteralSchema) as [z.ZodTypeAny, ...z.ZodTypeAny[]]
    );
  }
  if (typeof value === "object") {
    const shape = Object.entries(value as Record<string, unknown>).reduce(
      (acc, [key, val]) => ({ ...acc, [key]: generateLiteralSchema(val) }),
      {} as Record<string, z.ZodTypeAny>
    );
    return z.object(shape);
  }
  throw new Error(`Unsupported type: ${typeof value}`);
};
