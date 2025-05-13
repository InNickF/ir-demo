import { convertToTitleCase } from "../model-in/formatters/utils";
import { humanizeKebabCase } from "../model-in/formatters/utils";

interface Section {
  label?: string;
  path: string;
  icon: JSX.Element;
}

interface URLGetterGeneratorParams<
  TModule extends string,
  TRoot extends string,
  TSections extends readonly Section[]
> {
  module: TModule;
  root: TRoot;
  sections: TSections;
}

type URLGetterGeneratorReturnFn<
  TModule extends string,
  TRoot extends string,
  TSections extends readonly Section[]
> = (params: { id: string | null; section?: TSections[number]["path"] }) => {
  URL: `/${TModule}/${TRoot}/${TSections[number]["path"]}/?id=${string}`;
  rootURL: `/${TModule}/${TRoot}/`;
  module: TModule;
  routes: {
    href: string;
    label: string;
    icon: JSX.Element;
  }[];
};

export const URLGetterGenerator = <
  TModule extends string,
  TRoot extends string,
  TSections extends readonly Section[]
>({
  module,
  root,
  sections,
}: URLGetterGeneratorParams<
  TModule,
  TRoot,
  TSections
>): URLGetterGeneratorReturnFn<TModule, TRoot, TSections> => {
  return <TSection extends TSections[number]["path"]>({
    id,
    section,
  }: {
    id: string | null;
    section: TSection;
  }) => {
    const urlId = encodeURIComponent(id || "");
    const urls: Record<TSections[number]["path"], string> = sections.reduce(
      (acc, sec) => ({
        ...acc,
        [sec.path]: id
          ? `/${module}/${root}/${sec.path}/?id=${urlId}`
          : `/${module}/${root}/${sec.path}/`,
      }),
      {} as Record<TSections[number]["path"], string>
    );

    return {
      URL: urls[section] || urls[sections[0]?.path],
      rootURL: `/${module}/${root}/`,
      module,
      routes: sections.map((sec) => ({
        href: urls[sec?.path],
        label: sec.label || convertToTitleCase(humanizeKebabCase(sec.path)),
        icon: sec.icon,
      })),
    };
  };
};
