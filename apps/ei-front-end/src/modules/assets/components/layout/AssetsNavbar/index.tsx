import { LogoutButton } from "@/commons/components/general/LogoutButton";
import { ThemeSelector } from "@/commons/components/general/ThemeSelector";
import { LayoutDock } from "@/commons/components/layout/Dock";
import { NavbarMobileMenu } from "@/commons/components/layout/MobileMenu";
import { ModuleSelector } from "@/commons/components/layout/ModuleSelector";
import { TextLogo } from "@/commons/components/other/TextLogo";
import { NavigationBarRoutes } from "@/commons/typings";
import {
  BuildingOffice2Icon as BuildingOffice2IconOutline,
  DocumentChartBarIcon as DocumentChartBarIconOutline,
} from "@heroicons/react/24/outline";
import {
  BuildingOffice2Icon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/solid";
import { AsElement, Navbar } from "in-ui-react";
import Link from "next/link";
import "./styles.css";

export const AssetsNavbar = () => {
  const prefix = "assets-navbar";
  const navigationRoutes: NavigationBarRoutes[] = [
    {
      href: "/assets/",
      regexToMatch: /^(\/assets\/$|\/assets\/portfolio\/.*)/,
      icon: <DocumentChartBarIcon />,
      outlineIcon: <DocumentChartBarIconOutline />,
      label: "Portfolio",
      description: null,
      as: "a" as AsElement,
    },
    {
      href: "/assets/properties/",
      regexToMatch: /(\/assets\/properties).*/,
      icon: <BuildingOffice2Icon />,
      outlineIcon: <BuildingOffice2IconOutline />,
      label: "Properties",
      as: "a" as AsElement,
    },
  ];

  return (
    <>
      <Navbar paddingX="left" className={prefix}>
        <div className={`${prefix}-container`}>
          <Link href="/assets">
            <a>
              <TextLogo name="Assets" className="text-3xl" />
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
