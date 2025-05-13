import { AnyObject, GenericLabelValueObject } from "@/commons/typings";
import { IdSwitcherKeyDetails } from "..";
import { ValueFormatter } from "@/commons/model-in/formatters/types";
import { useEffect, useMemo, useRef } from "react";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { Heading } from "in-ui-react";

export interface IdSwitcherItemProps<TModel extends AnyObject> {
  item: TModel;
  keyDetails?: IdSwitcherKeyDetails<TModel>[];
  nameAccessor: keyof TModel;
  idAccessor: keyof TModel;
  formatter?: ValueFormatter<TModel>;
  onSelect?: (item: TModel) => void;
  isSelected?: boolean;
  onMoveEnter?: (item: TModel) => void;
  onRefocus?: () => void;
}

export const IdSwitcherItem = <TModel extends AnyObject>({
  item,
  keyDetails,
  nameAccessor,
  idAccessor,
  formatter,
  onSelect,
  isSelected,
  onMoveEnter,
  onRefocus,
}: IdSwitcherItemProps<TModel>) => {
  const ref = useRef<HTMLButtonElement>(null);
  const details = useMemo(() => {
    const items: GenericLabelValueObject[] = keyDetails?.map((keyDetail) => {
      const value = item[keyDetail.key];
      return {
        label:
          keyDetail.label ||
          convertToTitleCase(humanizeSnakeCase(keyDetail.key as string)),
        value: formatter
          ? formatter.format({ key: keyDetail.key, value }).value
          : (genericGetValue(value) as string),
      };
    });
    return items;
  }, [item, keyDetails, formatter]);

  const getClasses = (): string => {
    const classes = [
      "transform",
      "transition-all",
      "block",
      "w-full",
      "text-left",
      "grid",
      "grid-cols-1",
    ];
    isSelected ? classes.push("bg-ghost-2") : classes.push("bg-ghost-1");
    return classes.join(" ");
  };

  const isFirstMount = useRef(true);

  useEffect(
    function focusOnIsFocused() {
      if (isSelected && !isFirstMount.current) {
        ref.current?.focus();
        onRefocus?.();
      }
      isFirstMount.current = false;
    },
    [isSelected, onRefocus]
  );

  return (
    <button
      ref={ref}
      className={getClasses()}
      onClick={() => {
        onSelect?.(item);
      }}
      onMouseEnter={() => {
        onMoveEnter?.(item);
      }}
    >
      <header className="border-b border-b-silver px-2 pt-2 pb-1">
        <Heading kind="subtitle-1">
          {genericGetValue(item?.[nameAccessor], true) as string}
        </Heading>
      </header>
      <ul className="grid sm:grid-cols-[repeat(auto-fill,minmax(theme(spacing.44),1fr))] grid-cols-1 gap-2 px-2 py-1">
        {details?.map((detail) => (
          <li
            key={`${item[idAccessor]}-${detail?.label}`}
            className="grid grid-cols-1"
          >
            <Heading kind="subtitle-2" sans className="text-sm">
              {detail?.label}
            </Heading>
            <small className="text-silver">{detail?.value}</small>
          </li>
        ))}
      </ul>
    </button>
  );
};
