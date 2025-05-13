import { Deal } from "@/modules/acquisitions/typings/deals";
import { atom } from "jotai";

export const bulkEditDealsAtom = atom<Deal[]>([]);
