import { AssetsNavbar } from "@/assets/components/layout/AssetsNavbar";
import {
  useAllProperties,
  useProperty,
} from "@/assets/services/queries/properties";
import { getPropertyURL } from "@/assets/utils/redirects/properties-redirects";
import { HeaderTitle } from "@/commons/components/data-display/HeaderTitle";
import { IdSwitcher } from "@/commons/components/data-display/IdSwitcher";
import { HeaderGrid } from "@/commons/components/layout/HeaderGrid";
import { HeaderKpi } from "@/commons/components/layout/HeaderKpi";
import { PageContainer } from "@/commons/components/layout/PageContainer";
import { PageHeaderMenu } from "@/commons/components/layout/PageHeaderMenu";
import { useOnChangeRoute } from "@/commons/hooks/useOnchangeRoute";
import { defaultPaginatedData } from "@/commons/utils";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  BoltIcon,
  CreditCardIcon,
  EyeIcon,
  GlobeAltIcon,
  PencilIcon,
  UserGroupIcon,
  VariableIcon,
} from "@heroicons/react/24/outline";
import { AsElement, LoadingLine, PageHeader } from "in-ui-react";
import { FC, PropsWithChildren, useState } from "react";
import { usePropertyIdFromQueryParams } from "../hooks/usePropertyIdFromQueryParams";
import { Property } from "../typings/properties";
import { propertyFormatter } from "../entities/asset/formatters";

export const AssetLayout: FC<PropsWithChildren> = ({ children }) => {
  const [headerDrawer, setHeaderDrawer] = useState(false);
  useOnChangeRoute(() => setHeaderDrawer(false));
  const propertyId = usePropertyIdFromQueryParams();

  const { data, isLoading, isRefetching } = useProperty({
    propertyId: propertyId,
  });

  const {
    data: properties = defaultPaginatedData,
    isLoading: isLoadingProperties,
  } = useAllProperties({
    page_size: "-1",
  });
  const homeRoutes = [
    {
      href: getPropertyURL({
        propertyId,
        section: "details",
      }),
      label: "Property Summary",
      icon: <EyeIcon />,
      as: "a" as AsElement,
    },
    {
      href: getPropertyURL({
        propertyId,
        section: "tenants",
      }),
      label: "Tenants",
      icon: <UserGroupIcon />,
      as: "a" as AsElement,
    },
    {
      href: getPropertyURL({
        propertyId,
        section: "debt",
      }),
      label: "Debt",
      icon: <CreditCardIcon />,
      as: "a" as AsElement,
    },
    {
      href: getPropertyURL({
        propertyId,
        section: "operational-financial-performance",
      }),
      label: "Operational Financial Performance",
      icon: <VariableIcon />,
      as: "a" as AsElement,
    },
    {
      href: getPropertyURL({
        propertyId,
        section: "investing-performance",
      }),
      label: "Investing Performance",
      icon: <BoltIcon />,
      as: "a" as AsElement,
    },
    {
      href: getPropertyURL({
        propertyId,
        section: "market-analytics",
      }),
      label: "Market Analytics",
      icon: <GlobeAltIcon />,
      as: "a" as AsElement,
    },
    {
      href: getPropertyURL({
        propertyId,
        section: "edit",
      }),
      label: "Edit Information",
      icon: <PencilIcon />,
      as: "a" as AsElement,
    },
  ];

  return (
    <>
      <AssetsNavbar />
      <LoadingLine isActive={isRefetching} persist />
      <PageHeader
        drawerIsOpen={headerDrawer}
        closeDrawer={() => {
          setHeaderDrawer(false);
        }}
        openDrawer={() => {
          setHeaderDrawer(true);
        }}
        menu={<PageHeaderMenu items={homeRoutes} />}
        className="header-page-animation"
      >
        <HeaderGrid>
          <HeaderTitle isLoading={isLoading}>
            <div className="flex gap-2 items-center">
              {genericGetValue(data?.name, true)}
              <IdSwitcher
                modelName="Property"
                items={properties?.results as Property[]}
                nameAccessor="name"
                idAccessor="yardi_property_code"
                urlIdGetter="propertyId"
                activeElementId={propertyId}
                isLoading={isLoadingProperties}
                formatter={propertyFormatter.value}
                keyDetails={[
                  { key: "fund_name" },
                  { key: "type" },
                  { key: "rentable_building_area", label: "SF" },
                  { key: "occupancy_rate", label: "Occupancy" },
                ]}
                extraSearchKeys={["address", "city"]}
              />
            </div>
          </HeaderTitle>
          <HeaderGrid.KPIsContainer className="mb-4">
            <HeaderKpi
              title="Market"
              value={genericGetValue(data?.submarket_name)}
              isLoading={isLoading}
              ellipsis
              noWrap
            />
            <HeaderKpi
              title="Property Type"
              value={genericGetValue(data?.type)}
              isLoading={isLoading}
              ellipsis
            />
          </HeaderGrid.KPIsContainer>
        </HeaderGrid>
      </PageHeader>
      <PageContainer>{children}</PageContainer>
    </>
  );
};
