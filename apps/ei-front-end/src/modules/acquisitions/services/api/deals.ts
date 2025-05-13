import { OverItem } from "@/acquisitions/pages/Deals/components/DealSmartsheet/types";
import {
  BasicDealInformation,
  Deal,
  DealFinancialScenarioPayload,
  DealImage,
  DealPhase,
  DealPhotoPayload,
  DealPipelineSummary,
  DealRisksAndMitigants,
  DealRisksAndMitigantsPayload,
  DealRoomItem,
  DealRoomItemPayload,
  DealStrategyTag,
  DealTenantInformation,
  DealTenantInformationPayload,
  DealTimelineItemPayload,
  DealUnderwritingModelPayload,
  DealWireInstructionPayload,
  EditDealCommonAttributes,
  EditDealInformationPayload,
  EditExtendedDealInformationPayload,
  PostAssignCompsToDealPayload,
  PostAssignCompstackCompToDealPayload,
  ScreeningDealInformationPayload,
  UnlistCompProps,
  UploadDealPhotoToS3Params,
  UploadDealPhotosToS3Params,
  UploadDealRoomItemToS3,
  UploadDealRoomItemsToS3,
  UploadDealUnderwritingModelToS3,
  UploadDealWireInstructionToS3,
} from "@/acquisitions/typings/deals";
import {
  Comp,
  CompTotals,
  CompstackComp,
  CompstackCompId,
  CompstackCompType,
} from "@/acquisitions/typings/market-analytics";
import { PaginatedResponseSchema } from "@/commons/schemas/filters";
import { GenericTableRowColsSchema } from "@/commons/schemas/tables";
import { uploadFile } from "@/commons/services/api/processFileToS3";
import { privateAxios } from "@/commons/services/clients";
import { GenericFilterPayload, IPaginatedResponse } from "@/commons/typings";
import { setNullEmptyStrings } from "@/commons/utils";
import { querySerializer } from "@/commons/utils/query-serializer";
import { z } from "zod";
import {
  CriticalDatesTableItemSchema,
  DealFinancialScenarioInvestmentKPIsSchema,
  DealFinancialScenarioSchema,
  DealImageSchema,
  DealPipelineSummarySchema,
  DealRisksAndMitigantsSchema,
  DealRoomItemSchema,
  DealSchema,
  DealStrategyTagSchema,
  DealSummarySchema,
  DealTenantInformationSchema,
  DealTimelineItemSchema,
  DealsBySchema,
  DealsGeolocationSchema,
  DealsPipelineTotalSchema,
  EquityRequirementSchema,
  PipelineBySchema,
  PipelineSummaryDealTotalSchema,
  PipelineSummaryTableDealSchema,
  UtilityScoreSchema,
} from "../../schemas/deals";
import {
  CompSchema,
  CompTotalsSchema,
  CompstackCompSchema,
  CompstackLandCompPayloadSchema,
  CompstackLeaseCompPayloadSchema,
  CompstackSalesCompPayloadSchema,
  LandCompSchema,
  LandCompTotalsSchema,
  LeaseCompSchema,
  LeaseCompTotalsSchema,
  StabilizedPropertySchema,
  StabilizedPropertyTotalsSchema,
  TransitionalPropertySchema,
  TransitionalPropertyTotalsSchema,
} from "../../schemas/market-analytics";
import {
  DEAL_FILE_TYPES,
  getDealSmartsheetNewSortingPayload,
} from "../../utils";

export const getDeals = async (
  filters: GenericFilterPayload
): Promise<IPaginatedResponse<Deal>> => {
  const finalFilter = { ...filters };
  const serializedQuery = querySerializer(finalFilter);

  const response = await privateAxios.get(
    `/acquisitions/deals/${serializedQuery}`
  );

  return PaginatedResponseSchema(DealSchema).parse(response.data);
};

export const getDeal = async (dealId: Deal["id"]) => {
  const response = await privateAxios.get(`/acquisitions/deals/${dealId}/`);
  return DealSchema.parse(response.data);
};

export const getDealsLocations = async (filters: GenericFilterPayload) => {
  const finalFilter = { ...filters, phase__not__in: "DEAD,CLOSED" };
  const serializedQuery = querySerializer(finalFilter);

  const response = await privateAxios.get(
    `/acquisitions/deals/geography-chart/${serializedQuery}`
  );
  return DealsGeolocationSchema.parse(response.data);
};

export const getPipelineBy = async (filters: GenericFilterPayload) => {
  const finalFilter = { ...filters, phase__not__in: "DEAD" };
  const serializedQuery = querySerializer(finalFilter);

  const response = await privateAxios.get(
    `/acquisitions/deals/pipeline-summary-chart/${serializedQuery}`
  );
  return z.array(PipelineBySchema).parse(response.data);
};

export const getPipelineSummaryByDealPhaseTotals = async (
  filters: GenericFilterPayload
) => {
  const finalFilter = { ...filters, phase__not__in: "DEAD,CLOSED" };
  const serializedQuery = querySerializer(finalFilter);

  const response = await privateAxios.get(
    `/acquisitions/deals/pipeline-summary-by-deal-totals/${serializedQuery}`
  );

  return z.array(PipelineSummaryDealTotalSchema).parse(response.data);
};

export const getPipelineSummaryByDealPhase = async (
  filters: GenericFilterPayload
) => {
  const finalFilters = {
    as: "pipeline-summary",
    ...filters,
    phase__not__in: "DEAD,CLOSED",
  };
  const serializedQuery = querySerializer(finalFilters);

  const response = await privateAxios.get(
    `/acquisitions/deals/${serializedQuery}`
  );

  return PaginatedResponseSchema(PipelineSummaryTableDealSchema).parse(
    response.data
  );
};

export const getDealsBy = async (filters: GenericFilterPayload) => {
  const finalFilter = { ...filters, phase__not__in: "DEAD,CLOSED" };
  const serializedQuery = querySerializer(finalFilter);

  const response = await privateAxios.get(
    `/acquisitions/deals/deals-by-chart/${serializedQuery}`
  );
  return z.array(DealsBySchema).parse(response.data);
};

export const getCriticalDates = async (filters: GenericFilterPayload) => {
  const finalFilters = {
    as: "critical-date",
    ...filters,
    phase__in: "DD,PSA,CLOSING",
  };
  const serializedQuery = querySerializer(finalFilters);
  const response = await privateAxios.get(
    `/acquisitions/deal-timeline-items/${serializedQuery}`
  );

  return PaginatedResponseSchema(CriticalDatesTableItemSchema).parse(
    response.data
  );
};

export const getEquityRequirements = async (filters: GenericFilterPayload) => {
  const finalFilter = { ...filters, phase__not__in: "DEAD,CLOSED" };
  const serializedQuery = querySerializer(finalFilter);
  const response = await privateAxios.get(
    `/acquisitions/deals/cash-requirements-v2-chart/${serializedQuery}`
  );

  return z.array(EquityRequirementSchema).parse(response.data);
};

export const getDealsPipeline = async (
  filters: GenericFilterPayload & { phase: DealPhase; page?: string }
) => {
  const { page, ...restFilters } = filters;
  const finalFilters = {
    as: "funds-pipeline",
    page: page || "1",
    ...restFilters,
  };
  const serializedQuery = querySerializer(finalFilters);
  const response = await privateAxios.get(
    `/acquisitions/deals/${serializedQuery}`
  );

  return PaginatedResponseSchema(DealPipelineSummarySchema).parse(
    response.data
  );
};

export const patchDealPipelinePhase = async ({
  deal,
  newPhase,
}: {
  deal: DealPipelineSummary;
  newPhase: string;
  filters?: GenericFilterPayload & { phase: DealPhase };
}) => {
  const response = await privateAxios.patch(`/acquisitions/deals/${deal.id}/`, {
    phase: newPhase,
    sorting: 0,
  } as Deal);
  return DealSchema.parse(response.data);
};

export const getDealsPipelineTotals = async (filters: GenericFilterPayload) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/acquisitions/deals/funds-pipeline-totals/${serializedQuery}`
  );
  return z.array(DealsPipelineTotalSchema).parse(response.data);
};

export const getDealRoomItems = async (filters: GenericFilterPayload) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/acquisitions/deal-room-items/${serializedQuery}`
  );

  return PaginatedResponseSchema(DealRoomItemSchema).parse(response.data);
};

export const getDealStrategyTags = async (): Promise<DealStrategyTag[]> => {
  const response = await privateAxios.get(`/acquisitions/deals/tags/`);

  return z.array(DealStrategyTagSchema).parse(response.data);
};

export const getDealComps = async (
  filters: GenericFilterPayload,
  dealId: Deal["id"]
) => {
  if (!dealId) {
    throw new Error("Deal ID is required");
  }

  const finalFilters = { deals__id: dealId, ...filters };
  const serializedQuery = querySerializer(finalFilters);

  const response = await privateAxios.get(
    `/acquisitions/comps/${serializedQuery}`
  );

  return PaginatedResponseSchema(CompSchema).parse(response.data);
};

export const getDealCompsByType = async <T extends Comp>(
  filters: GenericFilterPayload & { type: Comp["type"] },
  dealId: Deal["id"]
) => {
  if (!filters?.type) {
    throw new Error("Type is required");
  }
  if (!dealId) {
    throw new Error("Deal ID is required");
  }

  const finalFilters = { deals__id: dealId, ...filters };
  const serializedQuery = querySerializer(finalFilters);

  const response = await privateAxios.get(
    `/acquisitions/comps/${serializedQuery}`
  );

  if (filters.type === "lease") {
    return PaginatedResponseSchema(LeaseCompSchema).parse(
      response.data
    ) as IPaginatedResponse<T>;
  }

  if (filters.type === "transitional_property") {
    return PaginatedResponseSchema(TransitionalPropertySchema).parse(
      response.data
    ) as IPaginatedResponse<T>;
  }

  if (filters.type === "land") {
    return PaginatedResponseSchema(LandCompSchema).parse(
      response.data
    ) as IPaginatedResponse<T>;
  }

  if (filters.type === "stabilized_property") {
    return PaginatedResponseSchema(StabilizedPropertySchema).parse(
      response.data
    ) as IPaginatedResponse<T>;
  }

  return PaginatedResponseSchema(CompSchema).parse(
    response.data
  ) as IPaginatedResponse<T>;
};

export const getDealCompTotals = async (
  filters: GenericFilterPayload,
  dealId: Deal["id"]
) => {
  if (!dealId) {
    throw new Error("Deal ID is required");
  }

  const finalFilters = { deals__id: dealId, ...filters };
  const serializedQuery = querySerializer(finalFilters);

  const response = await privateAxios.get(
    `/acquisitions/comps/summary/${serializedQuery}`
  );
  return CompTotalsSchema.parse(response.data);
};

export const getDealCompTotalsByType = async <T extends CompTotals>(
  filters: GenericFilterPayload & { type: Comp["type"] },
  dealId: Deal["id"]
) => {
  if (!filters?.type) {
    throw new Error("Type is required");
  }
  if (!dealId) {
    throw new Error("Deal ID is required");
  }

  const finalFilters = { deals__id: dealId, ...filters };
  const serializedQuery = querySerializer(finalFilters);

  const response = await privateAxios.get(
    `/acquisitions/comps/summary/${serializedQuery}`
  );

  if (filters.type === "lease") {
    return LeaseCompTotalsSchema.parse(response.data) as T;
  }

  if (filters.type === "transitional_property") {
    return TransitionalPropertyTotalsSchema.parse(response.data) as T;
  }

  if (filters.type === "land") {
    return LandCompTotalsSchema.parse(response.data) as T;
  }

  if (filters.type === "stabilized_property") {
    return StabilizedPropertyTotalsSchema.parse(response.data) as T;
  }

  return CompTotalsSchema.parse(response.data) as T;
};

export const unlistComp = async ({ dealId, compId }: UnlistCompProps) => {
  const response = await privateAxios.delete(
    `/acquisitions/deals/${dealId}/comps/${compId}/`
  );
  return response.data as string;
};

export const uploadDealPhotosToS3 = async ({
  dealId,
  photos,
}: UploadDealPhotosToS3Params) => {
  const url = `/acquisitions/deals/${dealId}`;

  const results = await Promise.allSettled(
    photos.map((photo) => {
      const photoURL = `${url}/${photo.name}`;

      // TODO: Create types
      return uploadFile({
        url: photoURL,
        file: photo,
        args: {
          name: photo.name,
          deal: dealId,
          type: DEAL_FILE_TYPES.PROPERTY_PICTURE,
        } as Partial<DealPhotoPayload>,
      });
    })
  );

  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error(result.reason);
    }
  });

  const fulfilledResults = results.filter(
    (result) => result.status === "fulfilled"
  ) as PromiseFulfilledResult<DealPhotoPayload>[];

  return fulfilledResults.map((result) => result.value);
};

export const uploadDealRoomItemsToS3 = async ({
  dealId,
  items,
}: UploadDealRoomItemsToS3) => {
  const url = `/acquisitions/deals/${dealId}`;
  const results = await Promise.allSettled(
    items.map((document) => {
      const documentURL = `${url}/${document.file.name}`;
      const labelsValues = document?.labels?.map((label) => label.value);

      // TODO: Create types
      return uploadFile({
        url: documentURL,
        file: document.file,
        args: {
          deal: dealId,
          name: document.name,
          labels: labelsValues,
          notes: document.notes,
        } as Partial<DealRoomItemPayload>,
      });
    })
  );

  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error(result.reason);
    }
  });

  const fulfilledResults = results.filter(
    (result) => result.status === "fulfilled"
  ) as PromiseFulfilledResult<DealRoomItemPayload>[];

  return fulfilledResults.map((result) => result.value);
};

export const getDealSummary = async (dealId: Deal["id"]) => {
  const response = await privateAxios.get(
    `/acquisitions/deals/${dealId}/summary/`
  );

  return DealSummarySchema.parse(response.data);
};

export const uploadDealRoomItemToS3 = async ({
  dealId,
  item,
}: UploadDealRoomItemToS3) => {
  const url = `/acquisitions/deals/${dealId}`;
  const documentURL = `${url}/${item.file.name}`;

  const labelsValues = item?.labels?.map((label) => label.value);
  // TODO: Create types
  const result = await uploadFile({
    url: documentURL,
    file: item.file,
    args: {
      deal: dealId,
      name: item.name,
      labels: labelsValues,
      notes: item.notes,
    } as Omit<DealRoomItemPayload, "key">,
  });

  return result;
};

export const postDealInformation = async (
  payload: ScreeningDealInformationPayload & { pursue: boolean }
) => {
  const body = setNullEmptyStrings(payload);

  const response = await privateAxios.post(`/acquisitions/deals/`, body);

  return DealSchema.parse(response.data);
};

export const postDealPhoto = async (photos: DealPhotoPayload) => {
  const response = await privateAxios.post(
    "/acquisitions/deal-attachments/",
    photos
  );

  return response.data as string;
};

export const postDealRoomItem = async (items: DealRoomItemPayload) => {
  const response = await privateAxios.post(
    `/acquisitions/deal-room-items/`,
    items
  );

  return DealRoomItemSchema.parse(response.data);
};

export const postBulkDealPhotos = async (photos: DealPhotoPayload[]) => {
  const response = await privateAxios.post(
    "/acquisitions/deal-attachments/batch/",
    photos
  );

  return response.data as string;
};

export const postBulkDealRoomItems = async (items: DealRoomItemPayload[]) => {
  const response = await privateAxios.post(
    `/acquisitions/deal-room-items/batch/`,
    items
  );

  return response.data as string;
};

export const putDealInformation = async ({
  dealId,
  dealInformation,
}: EditDealInformationPayload) => {
  const payload = setNullEmptyStrings(dealInformation);
  const response = await privateAxios.put(
    `/acquisitions/deals/${dealId}/`,
    payload
  );

  return DealSchema.parse(response.data);
};

export const putExtendedDealInformation = async ({
  dealId,
  dealInformation,
}: EditExtendedDealInformationPayload) => {
  const payload = setNullEmptyStrings(dealInformation);
  const response = await privateAxios.put(
    `/acquisitions/deals/${dealId}/`,
    payload
  );

  return DealSchema.parse(response.data);
};

export const deleteDealRoomItem = async (item: DealRoomItem) => {
  const { id: dealRoomItemId } = item;
  const response = await privateAxios.delete(
    `/acquisitions/deal-room-items/${dealRoomItemId}/`
  );

  return response.data as string;
};

export const uploadDealUnderwritingModelToS3 = async ({
  dealId,
  model,
  dealType = "VALUE_ADD",
}: UploadDealUnderwritingModelToS3) => {
  const url = `/acquisitions/deals/${dealId}`;
  const documentURL = `${url}/${model.name}`;
  // TODO: Create types
  const result = await uploadFile({
    url: documentURL,
    file: model,
    args: {
      deal: dealId,
      name: model.name,
      type:
        dealType === "DEVELOPMENT"
          ? DEAL_FILE_TYPES.UW_DEVELOPMENT_MODEL
          : DEAL_FILE_TYPES.UW_MODEL,
    } as Omit<DealUnderwritingModelPayload, "key">,
  });

  return result;
};

export const postDealUnderwritingModel = async (
  model: DealUnderwritingModelPayload
) => {
  const response = await privateAxios.post(
    "/acquisitions/deal-attachments/",
    model
  );

  return response.data as string;
};

export const uploadDealWireInstructionToS3 = async ({
  dealId,
  instruction,
}: UploadDealWireInstructionToS3) => {
  const url = `/acquisitions/deals/${dealId}`;
  const documentURL = `${url}/${instruction.name}`;
  // TODO: Create types
  const result = await uploadFile({
    url: documentURL,
    file: instruction,
    args: {
      deal: dealId,
      name: instruction.name,
      type: DEAL_FILE_TYPES.WIRE_INSTRUCTION,
    } as Omit<DealWireInstructionPayload, "key">,
  });

  return result;
};

export const postDealWireInstruction = async (
  instruction: DealWireInstructionPayload
) => {
  const response = await privateAxios.post(
    "/acquisitions/deal-attachments/",
    instruction
  );

  return response.data as string;
};

export const uploadDealPhotoToS3 = async ({
  dealId,
  photo,
}: UploadDealPhotoToS3Params) => {
  const url = `/acquisitions/deals/${dealId}`;
  const documentURL = `${url}/${photo.name}`;
  // TODO: Create types
  const result = await uploadFile({
    url: documentURL,
    file: photo,
    args: {
      deal: dealId,
      name: photo.name,
      type: DEAL_FILE_TYPES.PROPERTY_PICTURE,
    } as Omit<DealPhotoPayload, "key">,
  });

  return result;
};

export const deleteDealPhoto = async (photo: DealImage) => {
  const { id: dealPhotoId } = photo;

  const response = await privateAxios.delete(
    `/acquisitions/deal-attachments/${dealPhotoId}/`
  );

  return response.data as string;
};

export const getDealPhotos = async (dealId: Deal["id"]) => {
  const response = await privateAxios.get(
    `/acquisitions/deal-attachments/?deal=${dealId}&type=${DEAL_FILE_TYPES.PROPERTY_PICTURE}`
  );

  return PaginatedResponseSchema(DealImageSchema).parse(response.data);
};

export const putDealRoomItem = async (item: DealRoomItem) => {
  const { id: dealRoomItemId, deal, labels, notes } = item;

  const response = await privateAxios.put(
    `/acquisitions/deal-room-items/${dealRoomItemId}/`,
    {
      deal,
      labels: labels.map(({ value }) => value),
      notes,
    }
  );

  return DealRoomItemSchema.parse(response.data);
};

export const postDealTimeline = async ({
  timeline,
}: {
  dealId: Deal["id"];
  timeline: DealTimelineItemPayload[];
}) => {
  const response = await privateAxios.post(
    "/acquisitions/deal-timeline-items/batch/",
    timeline
  );

  return response.data as string;
};

export const getDealTimeline = async (dealId: Deal["id"]) => {
  const response = await privateAxios.get(
    `/acquisitions/deal-timeline-items/?deal=${dealId}&page_size=20`
  );

  return PaginatedResponseSchema(DealTimelineItemSchema).parse(response.data);
};

export const patchExtendedDealInformation = async ({
  dealId,
  dealInformation,
}: EditExtendedDealInformationPayload) => {
  const payload = setNullEmptyStrings(dealInformation);
  const response = await privateAxios.patch(
    `/acquisitions/deals/${dealId}/`,
    payload
  );

  return DealSchema.parse(response.data);
};

export const patchDealCommonAttributes = async ({
  dealId,
  dealInformation,
}: EditDealCommonAttributes) => {
  const payload = setNullEmptyStrings(dealInformation);
  const response = await privateAxios.patch(
    `/acquisitions/deals/${dealId}/`,
    payload
  );

  return DealSchema.parse(response.data);
};

export const putDealTimeline = async ({
  timeline,
}: {
  dealId: Deal["id"];
  timeline: DealTimelineItemPayload[];
}) => {
  const response = await privateAxios.put(
    "/acquisitions/deal-timeline-items/batch/",
    timeline
  );

  return response.data as string;
};

export const patchScreeningDealInformation = async ({
  dealId,
  dealInformation,
}: EditDealInformationPayload) => {
  const payload = setNullEmptyStrings(dealInformation);
  const response = await privateAxios.patch(
    `/acquisitions/deals/${dealId}/`,
    payload
  );

  return DealSchema.parse(response.data);
};

export const postAssignCompsToDeal = async ({
  dealId,
  compIds,
}: PostAssignCompsToDealPayload) => {
  const response = await privateAxios.post(
    `/acquisitions/deals/${dealId}/comps/batch/`,
    compIds
  );

  return response.data as string;
};

export interface GetDealCompstackCompsParams {
  filters?: GenericFilterPayload;
  dealId: Deal["id"];
}
export const getDealCompstackLeaseComps = async ({
  filters,
  dealId,
}: GetDealCompstackCompsParams) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/acquisitions/deals/${dealId}/lease-comps/${serializedQuery}`
  );

  return z.array(CompstackLeaseCompPayloadSchema).parse(response.data);
};

export const getDealCompstackSaleComps = async ({
  filters,
  dealId,
}: GetDealCompstackCompsParams) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/acquisitions/deals/${dealId}/sale-comps/${serializedQuery}`
  );

  return z.array(CompstackSalesCompPayloadSchema).parse(response.data);
};

export const getDealCompstackLandComps = async ({
  filters,
  dealId,
}: GetDealCompstackCompsParams) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/acquisitions/deals/${dealId}/land-comps/${serializedQuery}`
  );

  return z.array(CompstackLandCompPayloadSchema).parse(response.data);
};

export interface GetAllDealCompstackCompsFilters {
  filters?: GenericFilterPayload;
  type: CompstackCompType | "all";
  dealId: Deal["id"];
}

export const getAllDealCompstackComps = async ({
  filters,
  dealId,
  type,
}: GetAllDealCompstackCompsFilters) => {
  const calls: Record<
    GetAllDealCompstackCompsFilters["type"],
    (payload: GetDealCompstackCompsParams) => Promise<CompstackComp[]>
  > = {
    all: async (payload) => {
      const [leaseComps, salesComps, landComps] = await Promise.all([
        getDealCompstackLeaseComps(payload),
        getDealCompstackSaleComps(payload),
        getDealCompstackLandComps(payload),
      ]);
      return z
        .array(CompstackCompSchema)
        .parse([...leaseComps, ...salesComps, ...landComps]);
    },
    lease: async (payload) => {
      const leaseComps = await getDealCompstackLeaseComps(payload);
      return leaseComps;
    },
    sale: async (payload) => {
      const salesComps = await getDealCompstackSaleComps(payload);
      return salesComps;
    },
    land: async (payload) => {
      const landComps = await getDealCompstackLandComps(payload);
      return landComps;
    },
  };
  const finalType: GetAllDealCompstackCompsFilters["type"] = type || "all";
  const payload: GetDealCompstackCompsParams = { filters, dealId };
  return calls[finalType](payload);
};

export const postAssignCompstackLeaseCompToDeal = async ({
  dealId,
  compIds,
}: PostAssignCompstackCompToDealPayload) => {
  const response = await privateAxios.post(
    `/acquisitions/deals/${dealId}/lease-comps/`,
    {
      lease_comp_ids: compIds,
    }
  );

  return response.data as string;
};

export const postAssignCompstackSaleCompToDeal = async ({
  dealId,
  compIds,
}: PostAssignCompstackCompToDealPayload) => {
  const response = await privateAxios.post(
    `/acquisitions/deals/${dealId}/sale-comps/`,
    {
      sale_comp_ids: compIds,
    }
  );

  return response.data as string;
};

export const postAssignCompstackLandCompToDeal = async ({
  dealId,
  compIds,
}: PostAssignCompstackCompToDealPayload) => {
  const response = await privateAxios.post(
    `/acquisitions/deals/${dealId}/land-comps/`,
    {
      land_comp_ids: compIds,
    }
  );

  return response.data as string;
};

export interface DeleteDealCompstackLeaseCompUnlinkParams {
  dealId: Deal["id"];
  compId: CompstackCompId;
}
export const deleteDealCompstackLeaseCompUnlink = async ({
  dealId,
  compId,
}: DeleteDealCompstackLeaseCompUnlinkParams) => {
  const response = await privateAxios.delete(
    `/acquisitions/deals/${dealId}/lease-comps/${compId}/`
  );

  return response.data as string;
};

export const deleteDealCompstackSaleCompUnlink = async ({
  dealId,
  compId,
}: DeleteDealCompstackLeaseCompUnlinkParams) => {
  const response = await privateAxios.delete(
    `/acquisitions/deals/${dealId}/sale-comps/${compId}/`
  );

  return response.data as string;
};

export const deleteDealCompstackLandCompUnlink = async ({
  dealId,
  compId,
}: DeleteDealCompstackLeaseCompUnlinkParams) => {
  const response = await privateAxios.delete(
    `/acquisitions/deals/${dealId}/land-comps/${compId}/`
  );

  return response.data as string;
};

export interface GetAllDealFinancialScenariosParams
  extends GenericFilterPayload {
  dealId: Deal["id"];
  page_size?: string;
}
export const getAllDealFinancialScenarios = async ({
  dealId,
  page_size,
}: GetAllDealFinancialScenariosParams) => {
  const serializedQuery = querySerializer({ page_size });
  const response = await privateAxios.get(
    `/acquisitions/deals/${dealId}/scenarios/${serializedQuery}`
  );
  return PaginatedResponseSchema(DealFinancialScenarioSchema).parse(
    response.data
  );
};

export interface GetDealFinancialScenarioParams extends GenericFilterPayload {
  dealId: Deal["id"];
  scenarioId: string;
}
export const getDealFinancialScenario = async ({
  dealId,
  scenarioId,
}: GetDealFinancialScenarioParams) => {
  const response = await privateAxios.get(
    `/acquisitions/deals/${dealId}/scenarios/${scenarioId}/`
  );

  return DealFinancialScenarioSchema.parse(response.data);
};

export interface PatchDealFinancialScenarioPayload {
  dealId: Deal["id"];
  scenario: DealFinancialScenarioPayload;
  scenarioId: string;
}
export const patchDealFinancialScenario = async ({
  dealId,
  scenario,
  scenarioId,
}: PatchDealFinancialScenarioPayload) => {
  const response = await privateAxios.patch(
    `/acquisitions/deals/${dealId}/scenarios/${scenarioId}/`,
    scenario
  );

  return DealFinancialScenarioSchema.parse(response.data);
};

export interface GetDealFinancialScenarioInvestmentKPIs
  extends GenericFilterPayload {
  dealId: Deal["id"];
  scenarioId: string;
}
export const getDealFinancialScenarioInvestmentKPIs = async ({
  dealId,
  scenarioId,
}: GetDealFinancialScenarioInvestmentKPIs) => {
  const response = await privateAxios.get(
    `/acquisitions/deals/${dealId}/investment-kpis/${scenarioId}/`
  );

  return z
    .array(DealFinancialScenarioInvestmentKPIsSchema)
    .parse(response.data);
};

export interface GetDealFinancialScenarioInvestmentDetails
  extends GenericFilterPayload {
  dealId: Deal["id"];
  scenarioId: string;
}
export const getDealFinancialScenarioInvestmentDetails = async ({
  dealId,
  scenarioId,
}: GetDealFinancialScenarioInvestmentDetails) => {
  const response = await privateAxios.get(
    `/acquisitions/deals/${dealId}/investment-cash-flow-yearly/${scenarioId}/`
  );

  return z.array(GenericTableRowColsSchema).parse(response.data);
};

export interface GetDealCAPEXParams extends GenericFilterPayload {
  dealId: Deal["id"];
}
export const getDealCAPEX = async ({ dealId }: GetDealCAPEXParams) => {
  const response = await privateAxios.get(
    `/acquisitions/deals/${dealId}/capex/`
  );

  return z.array(GenericTableRowColsSchema).parse(response.data);
};

export const getDealFinancialScenarioSummary = async (
  dealId: Deal["id"],
  scenarioId: string
) => {
  const response = await privateAxios.get(
    `/acquisitions/deals/${dealId}/summary/${scenarioId}`
  );

  return DealSummarySchema.parse(response.data);
};

export interface GetDealUtilityScoreArgs extends GenericFilterPayload {
  dealId: Deal["id"];
}
export const getDealUtilityScore = async ({
  dealId,
}: GetDealUtilityScoreArgs) => {
  const response = await privateAxios.get(
    `/data/logistics-utility-scores/?deal=${dealId}`
  );

  return PaginatedResponseSchema(UtilityScoreSchema).parse(response.data);
};

export interface PatchDealOrderingParams {
  activeDeal: BasicDealInformation;
  overItem: OverItem;
  filters: GenericFilterPayload;
  isBelowOverItem: boolean;
}

export const patchDealOrdering = async ({
  activeDeal,
  overItem,
  isBelowOverItem,
}: PatchDealOrderingParams) => {
  return "ok";
  const payload = getDealSmartsheetNewSortingPayload({
    activeDeal,
    isBelowOverItem,
    overItem,
  });
  const dealId = activeDeal?.id;
  if (!dealId) {
    throw new Error("Deal ID is required.");
  }

  const response = await privateAxios.patch(
    `/acquisitions/deals/${dealId}/`,
    payload
  );

  return DealSchema.parse(response.data);
};

export type getDealTenantInformationParams = {
  deal: Deal["id"];
} & GenericFilterPayload;

export const getDealTenantInformation = async (
  args: getDealTenantInformationParams
) => {
  const serializedQuery = querySerializer(args);

  const response = await privateAxios.get(
    `/acquisitions/tenant-profiles/${serializedQuery}`
  );

  return PaginatedResponseSchema(DealTenantInformationSchema).parse(
    response.data
  );
};

export const postDealTenantInformation = async (
  tenantInformation: DealTenantInformationPayload
) => {
  const response = await privateAxios.post(
    `/acquisitions/tenant-profiles/`,
    tenantInformation
  );

  return DealTenantInformationSchema.parse(response.data);
};

export const patchDealTenantInformation = async (
  tenantInformation: DealTenantInformation
) => {
  const response = await privateAxios.patch(
    `/acquisitions/tenant-profiles/${tenantInformation.id}/`,
    tenantInformation
  );

  return DealTenantInformationSchema.parse(response.data);
};

export const deleteDealTenantInformation = async (
  tenantInformation: DealTenantInformation
) => {
  const response = await privateAxios.delete(
    `/acquisitions/tenant-profiles/${tenantInformation.id}/`
  );

  return response.data as string;
};

export type getDealRisksAndMitigantsParams = {
  deal: Deal["id"];
} & GenericFilterPayload;

export const getDealRisksAndMitigants = async (
  args: getDealRisksAndMitigantsParams
): Promise<IPaginatedResponse<DealRisksAndMitigants>> => {
  const response = await privateAxios.get(
    `/acquisitions/deals/${args.deal}/risk-mitigants/`
  );

  return PaginatedResponseSchema(DealRisksAndMitigantsSchema).parse(
    response.data
  );
};

export const postDealRiskAndMitigant = async (
  riskAndMitigant: DealRisksAndMitigantsPayload
) => {
  const response = await privateAxios.post(
    `/acquisitions/deals/${riskAndMitigant.deal}/risk-mitigants/`,
    riskAndMitigant
  );

  return DealRisksAndMitigantsSchema.parse(response.data);
};

export const patchDealRiskAndMitigant = async (
  riskAndMitigate: DealRisksAndMitigants
) => {
  const response = await privateAxios.patch(
    `/acquisitions/deals/${riskAndMitigate.deal}/risk-mitigants/${riskAndMitigate.id}/`,
    riskAndMitigate
  );

  return DealRisksAndMitigantsSchema.parse(response.data);
};

export const deleteDealRiskAndMitigant = async (
  riskAndMitigate: DealRisksAndMitigants
) => {
  const response = await privateAxios.delete(
    `/acquisitions/deals/${riskAndMitigate.deal}/risk-mitigants/${riskAndMitigate.id}/`
  );

  return response.data as string;
};

export interface GetDoDealAddressAlreadyExistsParams {
  address: string;
}
export const getDoDealAddressAlreadyExists = async ({
  address,
}: GetDoDealAddressAlreadyExistsParams): Promise<IPaginatedResponse<Deal>> => {
  const response = await privateAxios.get(
    `acquisitions/deals/?address=${address}`
  );

  return PaginatedResponseSchema(DealSchema).parse(response.data);
};

interface patchBulkDealsInformationParams {
  deals: Partial<Deal>[];
}
export const patchBulkDealsInformation = async ({
  deals,
}: patchBulkDealsInformationParams) => {
  const promises = deals
    .filter((deal) => deal?.id)
    .map((deal) => {
      return privateAxios.patch(`/acquisitions/deals/${deal?.id}/`, deal);
    });
  const responses = await Promise.all(promises);
  return responses.map((response) => DealSchema.parse(response.data));
};
