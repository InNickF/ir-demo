import { LogoutButton } from "@/commons/components/general/LogoutButton";
import { ThemeSelector } from "@/commons/components/general/ThemeSelector";
import { LayoutDock } from "@/commons/components/layout/Dock";
import { NavbarMobileMenu } from "@/commons/components/layout/MobileMenu";
import { ModuleSelector } from "@/commons/components/layout/ModuleSelector";
import { TextLogo } from "@/commons/components/other/TextLogo";
import { NavigationBarRoutes } from "@/commons/typings";
import {
  BuildingOfficeIcon as BuildingOfficeIconOutline,
  DocumentChartBarIcon as DocumentChartBarIconOutline,
  DocumentMagnifyingGlassIcon as DocumentMagnifyingGlassIconOutline,
} from "@heroicons/react/24/outline";
import {
  BuildingOfficeIcon,
  DocumentChartBarIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { AsElement, Navbar } from "in-ui-react";
import Link from "next/link";
import "./styles.css";

export const AcqNavbar = () => {
  const prefix = "acq-navbar";

  const navigationRoutes: NavigationBarRoutes[] = [
    {
      href: "/acquisitions",
      linksToMatch: ["/acquisitions/", "/acquisitions/pipeline/"],
      icon: <DocumentChartBarIcon />,
      outlineIcon: <DocumentChartBarIconOutline />,
      label: "Overview",
      description: null,
      as: "a" as AsElement,
    },
    {
      href: "/acquisitions/deals",
      regexToMatch: /(\/acquisitions\/deals).*/,
      icon: <BuildingOfficeIcon />,
      outlineIcon: <BuildingOfficeIconOutline />,
      label: "Deals",
      description: null,
      as: "a" as AsElement,
    },
    {
      href: "/acquisitions/market",
      regexToMatch: /(\/acquisitions\/market).*/,
      icon: <DocumentMagnifyingGlassIcon />,
      outlineIcon: <DocumentMagnifyingGlassIconOutline />,
      label: "Market",
      description: null,
      as: "a" as AsElement,
    },
  ];

  return (
    <>
      <Navbar paddingX="left" className={prefix}>
        <div className={`${prefix}-container`}>
          <Link href="/acquisitions">
            <a>
              <TextLogo name="Acquisitions" className="text-3xl" />
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
