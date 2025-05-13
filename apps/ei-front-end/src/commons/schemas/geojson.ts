import { z, ZodSchema } from "zod";
import { Geometry } from "../typings/geojson";

// Define Geometry schemas
export const PointSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.tuple([z.number(), z.number()]),
});

export const MultiPointSchema = z.object({
  type: z.literal("MultiPoint"),
  coordinates: z.array(z.tuple([z.number(), z.number()])),
});

export const LineStringSchema = z.object({
  type: z.literal("LineString"),
  coordinates: z.array(z.tuple([z.number(), z.number()])),
});

export const MultiLineStringSchema = z.object({
  type: z.literal("MultiLineString"),
  coordinates: z.array(z.array(z.tuple([z.number(), z.number()]))),
});

export const PolygonSchema = z.object({
  type: z.literal("Polygon"),
  coordinates: z.array(z.array(z.tuple([z.number(), z.number()]))),
});

export const MultiPolygonSchema = z.object({
  type: z.literal("MultiPolygon"),
  coordinates: z.array(z.array(z.array(z.tuple([z.number(), z.number()])))),
});

export const BaseGeometrySchema = z.union([
  PointSchema,
  LineStringSchema,
  PolygonSchema,
  MultiPointSchema,
  MultiLineStringSchema,
  MultiPolygonSchema,
]);

export const GeometryCollectionSchema = z.object({
  type: z.literal("GeometryCollection"),
  geometries: z.array(BaseGeometrySchema),
});

// Union of all Geometry Schemas
export const GeometrySchema = z.union([
  BaseGeometrySchema,
  GeometryCollectionSchema,
]);

type GeometryType<G extends ZodSchema<z.infer<typeof GeometrySchema>>> =
  G extends ZodSchema<infer T> ? T : Geometry;

export const GeoFeatureSchema = <
  P extends ZodSchema<unknown>,
  G extends ZodSchema<z.infer<typeof GeometrySchema>>
>(
  {
    properties = z.any() as unknown as P,
    geometry = GeometrySchema as unknown as G,
  }: {
    properties?: P;
    geometry?: G;
  } = {
    properties: z.any() as unknown as P,
    geometry: GeometrySchema as unknown as G,
  }
) => {
  return z.object({
    type: z.literal("Feature"),
    geometry,
    properties,
  }) as unknown as ZodSchema<{
    type: "Feature";
    geometry: GeometryType<G>;
    properties: z.infer<P>;
  }>;
};

// Function to create FeatureCollection schema
export const GeoFeatureCollectionSchema = <
  F extends ZodSchema<z.infer<ReturnType<typeof GeoFeatureSchema>>>
>(
  feature: F
) => {
  return z.object({
    type: z.literal("FeatureCollection"),
    features: z.array(feature),
  });
};
