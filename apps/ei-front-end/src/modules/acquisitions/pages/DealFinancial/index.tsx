import { AcqHead } from "@/acquisitions/components/general/AcqHead";
import { DealLayout } from "@/acquisitions/layouts/DealLayout";
import { InAcqPermissionsLayout } from "@/acquisitions/layouts/InAcqPermissionsLayout";
import { NextPageWithLayout } from "@/commons/typings";
import { ButtonGroup } from "in-ui-react";
import { ReactElement } from "react";
import { useFinancialSections } from "./hooks/useFinancialSections";
import "./styles.css";

const DealFinancial: NextPageWithLayout = () => {
  const {
    CurrentSection,
    activeSection,
    dealFinancialSectionsButtonGroupItems,
  } = useFinancialSections();
  return (
    <>
      <section className="mb-3">
        <ButtonGroup
          active={activeSection}
          items={dealFinancialSectionsButtonGroupItems}
          className="max-w-max"
        />
      </section>
      <CurrentSection />
    </>
  );
};

DealFinancial.getLayout = (page: ReactElement) => {
  return (
    <InAcqPermissionsLayout>
      <DealLayout>
        <AcqHead title="Deal Financial" />
        {page}
      </DealLayout>
    </InAcqPermissionsLayout>
  );
};

export default DealFinancial;
