import { z } from "zod";
import { widgetTags } from "../widgets/widget-tags";
import { dexieTablesGenerator } from "./utils";

export const OwnerSchema = z.string().or(z.number()).nullish();

export const ProfilesTableSchema = z.object({
  id: z.string(),
  name: z.string(),
  owner: OwnerSchema,
  public: z.boolean(),
});

export const PresetsTableSchema = z.object({
  id: z.string(),
  profile: z.string(),
  settings: z.any(),
  owner: OwnerSchema,
  configuration: z.string(),
});

export const ConfigurationsTableSchema = z.object({
  id: z.string(),
  label: z.string(),
  module: z.string(),
  entity: z.string(),
  model: z.string(),
  view: z.string(),
  widget: z.string(),
  needsEntityId: z.boolean(),
  tags: z.array(z.enum(widgetTags)),
  settings: z.any(),
});

const tables = dexieTablesGenerator({
  tableSchemas: [
    { name: "profiles", schema: ProfilesTableSchema },
    { name: "presets", schema: PresetsTableSchema },
    { name: "configurations", schema: ConfigurationsTableSchema },
  ] as const,
});

export default tables;
