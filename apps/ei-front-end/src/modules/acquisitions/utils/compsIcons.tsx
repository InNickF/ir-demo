import {
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
import { CompstackCompType } from "../typings/market-analytics";

export const compsIcons: Record<CompstackCompType, typeof Square3Stack3DIcon> =
  {
    land: Square3Stack3DIcon,
    lease: BuildingOfficeIcon,
    sale: BuildingStorefrontIcon,
  };
