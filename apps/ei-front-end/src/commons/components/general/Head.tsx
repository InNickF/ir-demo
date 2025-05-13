import { FC, PropsWithChildren } from "react";
import NextHead from "next/head";

export interface HeadProps extends PropsWithChildren {
  title?: string;
  description?: string;
}

export const Head: FC<HeadProps> = ({ title, description, children }) => {
  return (
    <NextHead>
      <title>{title || "I.R"}</title>
      {description && <meta name="description" content={description} />}
      <link rel="icon" href="/favicon.svg" />
      {children}
    </NextHead>
  );
};
