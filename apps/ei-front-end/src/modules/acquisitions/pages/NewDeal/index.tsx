import { AcqHead } from "@/acquisitions/components/general/AcqHead";
import { Step } from "@/acquisitions/hooks/useStepper";
import { DealsLayout } from "@/acquisitions/layouts/DealsLayout";
import { InAcqPermissionsLayout } from "@/acquisitions/layouts/InAcqPermissionsLayout";
import { NextPageWithLayout } from "@/commons/typings";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ReactElement } from "react";
import { NewDealStepper } from "./components/NewDealStepper";

const DealsHome: NextPageWithLayout = () => {
  const newDealStepsInitialState: Step[] = [
    {
      step: 1,
      title: "Deal Information",
      description: "Basic deal information.",
      icon: <InformationCircleIcon />,
      isReady: false,
    },
    {
      step: 2,
      title: "Back of the napkin (Optional)",
      description: "Optional deal information.",
      icon: <InformationCircleIcon />,
      isReady: false,
    },
    {
      step: 3,
      title: "Photos (Optional)",
      description: "Optional deal photos.",
      icon: <InformationCircleIcon />,
      isReady: false,
    },
    {
      step: 4,
      title: "Deal Room (Optional)",
      description: "Optional deal files.",
      icon: <InformationCircleIcon />,
      isReady: false,
    },
  ];

  return (
    <>
      <NewDealStepper initialSteps={newDealStepsInitialState} />
    </>
  );
};

DealsHome.getLayout = (page: ReactElement) => {
  return (
    <InAcqPermissionsLayout>
      <AcqHead title="New deal" />
      <DealsLayout title="Add new deal">{page}</DealsLayout>
    </InAcqPermissionsLayout>
  );
};

export default DealsHome;
