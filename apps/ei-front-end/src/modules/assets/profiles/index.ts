import { buildProfile } from "@/commons/model-in/profiles";
import { assetsModuleRegistry } from "..";

export const leasedNOIsProfile = buildProfile({
  id: "noi-leased",
  label: "Leased NOI",
  module: assetsModuleRegistry,
}).build();

export const t12NOIsProfile = buildProfile({
  id: "noi-t12",
  label: "T12 NOI",
  module: assetsModuleRegistry,
}).build();

export const f12NOIsProfile = buildProfile({
  id: "noi-f12",
  label: "F12 NOI",
  module: assetsModuleRegistry,
}).build();
