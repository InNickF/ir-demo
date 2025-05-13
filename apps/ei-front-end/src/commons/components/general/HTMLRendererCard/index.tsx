import { HTMLRenderer } from "@/commons/components/data-display/HTMLRenderer";
import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { Empty } from "in-ui-react";
import { FC } from "react";

interface HTMLRendererCardProps extends CardWithHeaderProps {
  content: string;
  emptyText?: string;
}

export const HTMLRendererCard: FC<HTMLRendererCardProps> = ({
  content,
  className,
  title,
  emptyText = "There is no information to show.",
  ...props
}) => {
  const prefix = "commons-html-renderer-card";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <CardWithHeader className={getClasses()} title={title} {...props}>
      {content && content !== "" ? (
        <HTMLRenderer html={genericGetValue(content)} />
      ) : (
        <Empty className="pt-0 mx-auto" description={<p>{emptyText}</p>} />
      )}
    </CardWithHeader>
  );
};
