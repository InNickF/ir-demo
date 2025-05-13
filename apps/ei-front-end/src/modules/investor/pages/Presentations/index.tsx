import { InvestorHead } from "@/investor/components/general/InvestorHead";
import { InvestorLayout } from "@/investor/layouts/InvestorLayout";
import { InvestorPermissionsLayout } from "@/investor/layouts/InvestorPermissionsLayout";
import { presentations } from "@/investor/utils/presentations";
import { ReactElement } from "react";
import { PresentationItem } from "./components/PresentationItem";
import "./styles.css";

const Presentations = () => {
  return (
    <section className="investor-presentations-grid">
      {presentations.map((presentation) => (
        <PresentationItem
          key={presentation.id}
          id={presentation.id}
          name={presentation.name}
        />
      ))}
    </section>
  );
};

Presentations.getLayout = (page: ReactElement) => {
  return (
    <InvestorPermissionsLayout>
      <InvestorHead title="Presentations" />
      <InvestorLayout title="Presentations">{page}</InvestorLayout>
    </InvestorPermissionsLayout>
  );
};

export default Presentations;
