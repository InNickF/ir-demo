import { IsLoadingProp } from "@/commons/typings";
import { Button } from "in-ui-react";
import { useRouter } from "next/router";
import { FC } from "react";
import { ListValidationDashboardPanelProps } from "../..";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

interface PanelViewsProps
  extends IsLoadingProp,
    Pick<ListValidationDashboardPanelProps, "currentView" | "onChangeView"> {}
export const PanelViews: FC<PanelViewsProps> = ({ currentView, isLoading }) => {
  const router = useRouter();

  return (
    <div className="flex">
      <Button
        icon={<ChevronLeftIcon />}
        onClick={() => {
          router.push("/tools/");
        }}
        loading={isLoading}
        kind="ghost"
      >
        Go back
      </Button>
    </div>
  );
};

const PropertyViewIcon = () => {
  return (
    <div className="flex items-center justify-center w-6 h-5">
      <svg
        className="w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 18 16"
      >
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M.75 8h16.5M.75 11.75h16.5M.75 15.5h16.5M2.625.5h12.75a1.875 1.875 0 110 3.75H2.625a1.875 1.875 0 010-3.75z"
        ></path>
      </svg>
    </div>
  );
};
