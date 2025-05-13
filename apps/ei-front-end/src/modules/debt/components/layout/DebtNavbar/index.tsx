import { LogoutButton } from "@/commons/components/general/LogoutButton";
import { ThemeSelector } from "@/commons/components/general/ThemeSelector";
import { LayoutDock } from "@/commons/components/layout/Dock";
import { ModuleSelector } from "@/commons/components/layout/ModuleSelector";
import { TextLogo } from "@/commons/components/other/TextLogo";
import { NavigationBarRoutes } from "@/commons/typings";
import {
  CreditCardIcon,
  DocumentChartBarIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/solid";
import { AsElement, Navbar } from "in-ui-react";
import Link from "next/link";
import "./styles.css";

export const DebtNavbar = () => {
  const prefix = "debt-navbar";

  const navigationRoutes: NavigationBarRoutes[] = [
    {
      href: "/debt/",
      linksToMatch: ["/debt/", "/debt/overview"],
      icon: <DocumentChartBarIcon />,
      outlineIcon: <DocumentChartBarIcon />,
      label: "Overview",
      description: null,
      as: "a" as AsElement,
    },
    {
      href: "/debt/loans/",
      regexToMatch: /(\/debt\/loans).*/,
      icon: <CreditCardIcon />,
      outlineIcon: <CreditCardIcon />,
      label: "Loans",
      description: null,
      as: "a" as AsElement,
    },
    {
      href: "/debt/risk-refi/",
      linksToMatch: ["/debt/risk-refi/"],
      icon: <PresentationChartLineIcon />,
      outlineIcon: <PresentationChartLineIcon />,
      label: "Risk Refi",
      description: null,
      as: "a" as AsElement,
    },
  ];

  return (
    <>
      <Navbar paddingX="left" className={prefix}>
        <div className={`${prefix}-container`}>
          <Link href="/debt">
            <a>
              <TextLogo name="Debt" className="text-3xl" />
            </a>
          </Link>
          <LayoutDock items={navigationRoutes} />
          <div className="flex">
            <ModuleSelector />
            <ThemeSelector />
            <LogoutButton className="hidden navbar-button--size md:inline-block" />
          </div>
        </div>
      </Navbar>
    </>
  );
};
