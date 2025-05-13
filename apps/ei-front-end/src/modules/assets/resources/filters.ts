import {
  buildResourceFilters,
  createResourceFiltersResolver,
} from "@/commons/model-in";
import { z } from "zod";

export const assetsFilters = buildResourceFilters({
  id: "general-assets-filters",
  label: "General Assets Filters",
  schema: z.object({
    search: z.string().optional().nullable(),
    fund: z.string().optional().nullable(),
    region: z.string().optional().nullable(),
    status: z.string().optional().nullable(),
    "property-under-management-timeline-item_type": z
      .string()
      .optional()
      .nullable(),
    "property-under-management-attachment_type": z
      .string()
      .optional()
      .nullable(),
    "fund-strategy_type": z.string().optional().nullable(),
  }),
  map: {
    search: {
      key: "search",
      name: "Search",
      type: "text",
    },
    fund: {
      key: "fund",
      name: "Fund",
      type: "simple-select",
      options: [],
    },
    region: {
      key: "region",
      name: "Region",
      type: "simple-select",
      options: [],
    },
    status: {
      key: "status",
      name: "Status",
      type: "simple-select",
      options: [],
    },
    "property-under-management-timeline-item_type": {
      key: "property-under-management-timeline-item_type",
      name: "Timeline Item Type",
      type: "simple-select",
      options: [],
    },
    "property-under-management-attachment_type": {
      key: "property-under-management-attachment_type",
      name: "Attachment Type",
      type: "simple-select",
      options: [],
    },
    "fund-strategy_type": {
      key: "fund-strategy_type",
      name: "Strategy Type",
      type: "simple-select",
      options: [],
    },
  },
})
  .addResolver(() => ({
    resolver: createResourceFiltersResolver({
      path: "/data-asset/choices/",
    }),
  }))
  .build();
