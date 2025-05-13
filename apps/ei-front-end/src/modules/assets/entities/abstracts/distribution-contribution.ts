import { buildResourceFilters } from "@/commons/model-in";
import {
  createHeaderFormatter,
  createValueFormatter,
} from "@/commons/model-in/formatters";
import { numberToDollar } from "@/commons/model-in/formatters/utils/amount-conversions";
import { z } from "zod";

export const DistributionsContributionsKPIsSchema = z.object({
  total_distribution: z.number().nullable(),
  total_distributions_ops_only: z.number().nullable(),
  distribution_budget: z.number().nullable(),
  distribution_variance: z.number().nullable(),
  contributions_opex_funding: z.number().nullable(),
  net_contribution_distributions: z.number().nullable(),
});

export const distributionsContributionsKPIsFormatter = createValueFormatter({
  schema: DistributionsContributionsKPIsSchema,
  map: {
    contributions_opex_funding: ({ value }) => ({
      value: numberToDollar({ value }),
    }),
    distribution_budget: ({ value }) => ({
      value: numberToDollar({ value }),
    }),
    distribution_variance: ({ value }) => ({
      value: numberToDollar({ value }),
    }),
    net_contribution_distributions: ({ value }) => ({
      value: numberToDollar({ value }),
    }),
    total_distribution: ({ value }) => ({ value: numberToDollar({ value }) }),
    total_distributions_ops_only: ({ value }) => ({
      value: numberToDollar({ value }),
    }),
  },
});

export const distributionsContributionsKPIsHeaderFormatter =
  createHeaderFormatter({
    schema: DistributionsContributionsKPIsSchema,
    map: {
      contributions_opex_funding: { value: "Contributions (Opex Funding)" },
      distribution_budget: { value: "Distribution Budget" },
      distribution_variance: { value: "Distribution Variance" },
      net_contribution_distributions: {
        value: "Net Contributions / Distributions",
      },
      total_distribution: { value: "Total Distribution" },
      total_distributions_ops_only: { value: "Total Distributions (Ops Only)" },
    },
  });

export const distributionsContributionsResourceFilters = buildResourceFilters({
  id: "distribution-contribution-filters",
  label: "ID",
  schema: z.object({
    id: z.string(),
  }),
  map: {
    id: null,
  },
})
  .addResolver(() => ({
    resolver: () => Promise.resolve([]),
  }))
  .build();
