import { AppContext } from "@/commons/model-in/configs/types";
import { atom } from "jotai";

export const appContextAtom = atom<AppContext>({
  module: "root",
  view: "root",
});
export const setAppContextAtom = atom(null, (get, set, update: AppContext) => {
  set(appContextAtom, update);
});
