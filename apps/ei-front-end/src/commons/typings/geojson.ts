import { ZodSchema, z } from "zod";
import {
  BaseGeometrySchema,
  GeoFeatureCollectionSchema,
  GeoFeatureSchema,
  GeometryCollectionSchema,
  GeometrySchema,
  LineStringSchema,
  MultiLineStringSchema,
  MultiPointSchema,
  MultiPolygonSchema,
  PointSchema,
  PolygonSchema,
} from "../schemas/geojson";

export type Point = z.infer<typeof PointSchema>;
export type MultiPoint = z.infer<typeof MultiPointSchema>;
export type LineString = z.infer<typeof LineStringSchema>;
export type MultiLineString = z.infer<typeof MultiLineStringSchema>;
export type Polygon = z.infer<typeof PolygonSchema>;
export type MultiPolygon = z.infer<typeof MultiPolygonSchema>;
export type BaseGeometry = z.infer<typeof BaseGeometrySchema>;
export type GeometryCollection = z.infer<typeof GeometryCollectionSchema>;
export type Geometry = z.infer<typeof GeometrySchema>;
export type GeoFeature<
  P extends ZodSchema<unknown>,
  G extends ZodSchema<z.infer<typeof GeometrySchema>> = typeof GeometrySchema
> = z.infer<ReturnType<typeof GeoFeatureSchema<P, G>>>;
export type GeoFeatureCollection<
  F extends ZodSchema<z.infer<ReturnType<typeof GeoFeatureSchema>>>
> = z.infer<ReturnType<typeof GeoFeatureCollectionSchema<F>>>;
