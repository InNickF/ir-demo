import { AttachmentsCommonKeys } from "@/commons/typings";
import { UseMutationResult } from "@tanstack/react-query";

export type PhotosModalUseMutation = <
  T extends AttachmentsCommonKeys
>() => UseMutationResult<T, unknown, T, unknown>;
