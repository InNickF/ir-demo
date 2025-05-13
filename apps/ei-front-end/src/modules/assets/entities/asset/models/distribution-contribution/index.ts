import {
  distributionsContributionsKPIsFormatter,
  distributionsContributionsKPIsHeaderFormatter,
  DistributionsContributionsKPIsSchema,
  distributionsContributionsResourceFilters,
} from "@/assets/entities/abstracts/distribution-contribution";
import {
  buildModel,
  buildResource,
  createResourceResolverCallback,
} from "@/commons/model-in";
import { createFormatter } from "@/commons/model-in/formatters";
import { assetEntity } from "../..";

export const distributionContributionResource = buildResource({
  id: "distribution-contribution",
  label: "Distribution / Contribution",
  schema: DistributionsContributionsKPIsSchema,
  sharedFilters: distributionsContributionsResourceFilters,
  staticFilters: {
    type: "distributions-contributions",
  },
})
  .addResolver(
    createResourceResolverCallback({
      path: "/data-asset/fund-transactions/charts",
      modFilters: ({ filters }) => {
        const { id, ...rest } = filters;
        return {
          investment_entity_code: id,
          ...rest,
        };
      },
    })
  )
  .build();

export const distributionContributionModel = buildModel({
  entity: assetEntity,
  schema: DistributionsContributionsKPIsSchema,
  resource: distributionContributionResource,
})
  .addFormatters(({ schema }) => ({
    formatter: createFormatter({
      schema,
      valueMap: distributionsContributionsKPIsFormatter.map,
      headerMap: distributionsContributionsKPIsHeaderFormatter.map,
    }),
  }))
  .build();
