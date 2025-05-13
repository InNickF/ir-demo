import { GenericLabelValueObject } from "@/commons/typings";
import { convertToTitleCase } from "../formatters/utils";
import { humanizeSnakeCase } from "../formatters/utils";

export const widgetTags = [
  "table",
  "table__accordion",
  "chart",
  "chart__line",
  "chart__bar",
  "chart__pie",
  "chart__donut",
  "chart__donut",
] as const;

export type WidgetTag = typeof widgetTags[number];

const getReadableWidgetTags = ({
  tags = [],
}: {
  tags: WidgetTag[];
}): string[] => {
  const invertedTags = tags.map((tag) => {
    return tag.split("__").reverse().join(" ");
  });
  return invertedTags.map((tag) => humanizeSnakeCase(tag));
};

export const getWidgetTagsAsOptions = ({
  tags = [],
}: {
  tags: WidgetTag[];
}): GenericLabelValueObject[] => {
  return getReadableWidgetTags({ tags }).map((tag) => ({
    label: convertToTitleCase(humanizeSnakeCase(tag)),
    value: tag,
  }));
};

export const getWidgetChildTags = ({
  tag,
  tags,
}: {
  tag: WidgetTag;
  tags: WidgetTag[];
}): WidgetTag[] => {
  return tags.filter(
    (widgetTag) => widgetTag.startsWith(tag) && widgetTag !== tag
  );
};

export const getParentTags = ({ tags }: { tags: WidgetTag[] }): WidgetTag[] => {
  return tags.filter((tag) => !tag.includes("__"));
};
