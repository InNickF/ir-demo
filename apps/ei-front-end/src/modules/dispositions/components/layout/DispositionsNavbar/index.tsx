import { LogoutButton } from "@/commons/components/general/LogoutButton";
import { ThemeSelector } from "@/commons/components/general/ThemeSelector";
import { LayoutDock } from "@/commons/components/layout/Dock";
import { NavbarMobileMenu } from "@/commons/components/layout/MobileMenu";
import { ModuleSelector } from "@/commons/components/layout/ModuleSelector";
import { TextLogo } from "@/commons/components/other/TextLogo";
import { NavigationBarRoutes } from "@/commons/typings";
import { DocumentChartBarIcon as DocumentChartBarIconOutline } from "@heroicons/react/24/outline";
import { DocumentChartBarIcon } from "@heroicons/react/24/solid";
import { AsElement, Navbar } from "in-ui-react";
import Link from "next/link";
import "./styles.css";

export const DispositionsNavbar = () => {
  const prefix = "dispositions-navbar";
  const navigationRoutes: NavigationBarRoutes[] = [
    {
      href: "/dispositions/",
      linksToMatch: [
        "/dispositions/",
        "/dispositions/portfolio/investor/",
        "/dispositions/portfolio/growth/",
        "/dispositions/debt/portfolio-summary/",
        "/dispositions/debt/risk-refi/",
      ],
      icon: <DocumentChartBarIcon />,
      outlineIcon: <DocumentChartBarIconOutline />,
      label: "Portfolio Level",
      description: null,
      as: "a" as AsElement,
    },
    {
      href: "/dispositions/property",
      linksToMatch: ["/dispositions/property/", "/dispositions/investor/"],
      icon: <DocumentChartBarIcon />,
      outlineIcon: <DocumentChartBarIconOutline />,
      label: "Asset Level",
      description: null,
      as: "a" as AsElement,
    },
  ];

  return (
    <>
      <Navbar paddingX="left" className={prefix}>
        <div className={`${prefix}-container`}>
          <Link href="/dispositions">
            <a>
              <TextLogo name="Dispositions" className="text-3xl" />
            </a>
          </Link>
          <LayoutDock items={navigationRoutes} />
          <div className="flex">
            <ModuleSelector />
            <ThemeSelector />
            <LogoutButton className="hidden navbar-button--size md:inline-block" />
            <NavbarMobileMenu items={navigationRoutes} />
          </div>
        </div>
      </Navbar>
    </>
  );
};
