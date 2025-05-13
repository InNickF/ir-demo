import { InvestorHead } from "@/investor/components/general/InvestorHead";
import { InvestorPermissionsLayout } from "@/investor/layouts/InvestorPermissionsLayout";
import { ReactElement } from "react";
import { usePresentationOrRedirect } from "./hooks/usePresentationOrRedirect";

const Presentation = () => {
  const currentPresentation = usePresentationOrRedirect();

  return (
    <>
      <InvestorHead
        title={
          currentPresentation
            ? `Presentation: ${currentPresentation?.name}`
            : null
        }
      />
      <iframe
        style={{
          width: "100vw",
          height: "100vh",
        }}
        src={currentPresentation?.link}
        allowFullScreen
      ></iframe>
    </>
  );
};

Presentation.getLayout = (page: ReactElement) => {
  return <InvestorPermissionsLayout>{page}</InvestorPermissionsLayout>;
};

export default Presentation;
