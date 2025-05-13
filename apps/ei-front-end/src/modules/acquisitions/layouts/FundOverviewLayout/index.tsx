import { HeaderKpi } from "@/commons/components/layout/HeaderKpi";
import { useFundsKPIs } from "@/acquisitions/services/queries/funds";
import { FundKPIs } from "@/acquisitions/typings/funds";
import { HeaderGrid } from "@/commons/components/layout/HeaderGrid";
import { AcqNavbar } from "@/modules/acquisitions/components/layout/AcqNavbar";
import { PageContainer } from "@/commons/components/layout/PageContainer";
import { PageHeaderMenu } from "@/commons/components/layout/PageHeaderMenu";
import { useOnChangeRoute } from "@/commons/hooks/useOnchangeRoute";
import { IsLoadingProp } from "@/commons/typings";
import { numberAbbreviation } from "@/commons/model-in/formatters/utils/amount-conversions";
import { ArrowsRightLeftIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Heading, PageHeader, TagProps } from "in-ui-react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useState } from "react";
import {
  overviewPageFilterAtom,
  pipelinePageFilterAtom,
} from "../../pages/FundsOverview/store/jotai";
import "./styles.css";

interface IFundsKISs {
  title: string;
  key: "deals" | "equity" | "cost" | "sf";
  tag?: TagProps["color"];
}

const KPIs: IFundsKISs[] = [
  {
    title: "Deals",
    key: "deals",
  },
  {
    title: "Equity",
    key: "equity",
  },
  {
    title: "Cost",
    key: "cost",
  },
  {
    title: "SF",
    key: "sf",
  },
];

const FundsKPIs = ({ kpis, isLoading }: { kpis: FundKPIs } & IsLoadingProp) => {
  const getValue = (key: IFundsKISs["key"]) => {
    if (!kpis) return null;
    const currencies = ["equity", "cost"];
    const isCurrency = currencies.includes(key);
    return numberAbbreviation({ value: kpis[key], isCurrency });
  };

  return (
    <>
      {KPIs.map(({ title, key, tag }) => (
        <HeaderKpi
          key={key}
          title={title}
          value={getValue(key)}
          tag={tag}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};

export const FundOverviewLayout: FC<PropsWithChildren> = ({ children }) => {
  const [headerDrawer, setHeaderDrawer] = useState(false);
  useOnChangeRoute(() => setHeaderDrawer(false));

  const router = useRouter();
  const isPipelinePage = router.pathname.includes("pipeline");

  const { data: fundsKPIs, isLoading } = useFundsKPIs(isPipelinePage ? {} : {});

  const homeRoutes = [
    {
      href: "/acquisitions/",
      label: "Overview",
      icon: <EyeIcon />,
    },
    {
      href: "/acquisitions/pipeline/",
      label: "Pipeline",
      icon: <ArrowsRightLeftIcon />,
    },
  ];

  const headerClasses = `acq-funds-overview-header header-page-animation ${
    isPipelinePage ? "acq-pipeline-page" : ""
  }`;

  return (
    <>
      <AcqNavbar />
      <PageHeader
        drawerIsOpen={headerDrawer}
        closeDrawer={() => {
          setHeaderDrawer(false);
        }}
        openDrawer={() => {
          setHeaderDrawer(true);
        }}
        menu={<PageHeaderMenu items={homeRoutes} />}
        className={headerClasses}
      >
        <HeaderGrid>
          <Heading
            data-cy="fund-overview-heading"
            className={isPipelinePage ? "text-6xl 3xl:text-7xl" : undefined}
          >
            {isPipelinePage ? "Pipeline" : "Overview"}
          </Heading>
          <div className="self-end text-left lg:text-right">
            <HeaderGrid.KPIsContainer>
              <FundsKPIs kpis={fundsKPIs} isLoading={isLoading} />
            </HeaderGrid.KPIsContainer>
          </div>
        </HeaderGrid>
      </PageHeader>
      {isPipelinePage ? children : <PageContainer>{children}</PageContainer>}
    </>
  );
};
