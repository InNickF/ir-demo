import { URLGetterGenerator } from "@/commons/utils/redirects";
import {
  Bars3Icon,
  BoltIcon,
  CreditCardIcon,
  EyeIcon,
  PencilIcon,
  PresentationChartBarIcon,
  VariableIcon,
} from "@heroicons/react/24/outline";

export const getFundsURL = URLGetterGenerator({
  module: "assets",
  root: "portfolio",
  sections: [
    { icon: <EyeIcon />, path: "details", label: "Overview" },
    { icon: <CreditCardIcon />, path: "debt" },
    { icon: <Bars3Icon />, path: "fund-growth" },
    {
      icon: <PresentationChartBarIcon />,
      path: "risk-refi",
      label: "Risk/Refi",
    },
    { icon: <VariableIcon />, path: "operational-financial-performance" },
    { icon: <BoltIcon />, path: "investing-performance" },
    { icon: <PencilIcon />, path: "edit-information" },
  ] as const,
});
