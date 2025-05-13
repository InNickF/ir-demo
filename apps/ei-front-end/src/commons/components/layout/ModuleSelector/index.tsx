import { useOutsideClick } from "@/commons/hooks/useOutsideClick";
import { useMe } from "@/commons/services/managers/react-query/queries/user";
import { AppModule, appModules } from "@/commons/utils";
import { userPermissions } from "@/commons/utils/user";
import {
  ArrowUturnLeftIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { Button, LogoProps, Tooltip } from "in-ui-react";
import Link from "next/link";
import { FC, useRef, useState } from "react";
import { TextLogo } from "../../other/TextLogo";
import "./styles.css";

interface ModuleSelectorProps {
  className?: string;
  icon?: JSX.Element;
}

type UserPermissionsBasedOnVisualModules = Exclude<
  typeof userPermissions[number],
  "PITCHBOOK" | "WEBHOOKS" | "IN_DISPOSITIONS" | "IN_SIGHT" | "IN_VESTOR"
>[];

const availableModules: Record<
  UserPermissionsBasedOnVisualModules[number],
  string
> = {
  IN_ACQUISITIONS: "Acquisitions",
  IN_ASSETS: "Assets",
  IN_DEBT: "Debt",
  IN_TOOLS: "Tools",
} as const;

export const ModuleSelector: FC<ModuleSelectorProps> = ({
  icon = <Squares2X2Icon />,
  className,
}) => {
  const prefix = "ui-commons-module-selector";

  const [selectorIsOpen, setSelectorIsOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const { data: user } = useMe();

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const authorizedModules = (user?.modules ?? [])
    .map((name) => availableModules[name] ?? null)
    .filter(Boolean) as LogoProps["name"][];

  const userModules = appModules.filter(({ name }) =>
    authorizedModules.includes(name)
  ) as AppModule[];

  const alphabeticallySortedApps = userModules.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  useOutsideClick(ref, () => {
    if (!selectorIsOpen) return;
    setSelectorIsOpen(false);
  });

  return (
    <div className={getClasses()}>
      <Tooltip content="Change Module">
        <Button
          ref={ref}
          onClick={() => {
            setSelectorIsOpen((prev) => !prev);
          }}
          className={`${prefix}__button navbar-button--size`}
          icon={icon}
          onlyIcon
          kind="ghost"
        />
      </Tooltip>
      <div
        className={`${prefix}__container ${
          selectorIsOpen && `${prefix}__container--open`
        }`}
      >
        <div className={`${prefix}__modules-grid`}>
          {alphabeticallySortedApps.map(({ name, to }) => (
            <div
              key={name}
              className={`${prefix}__module-link ${prefix}__module-link--${name}`}
            >
              <Button as="a" kind="ghost" href={to} target="_blank">
                <TextLogo name={name} opacity="semi-transparent" />
              </Button>
            </div>
          ))}
          <div className={`${prefix}__lobby-button-container`}>
            <Link href="/" passHref>
              <Button
                icon={<ArrowUturnLeftIcon />}
                as="a"
                kind="ghost"
                size="small"
                block
                className={`${prefix}__lobby-button-container__button`}
              >
                Go back to lobby
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
