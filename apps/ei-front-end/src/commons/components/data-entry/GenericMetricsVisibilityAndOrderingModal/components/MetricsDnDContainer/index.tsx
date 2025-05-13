import { DebouncedSearchInput } from "@/commons/components/data-entry/DebouncedSearchInput";
import {
  convertToTitleCase,
  humanizeSnakeCase,
} from "@/commons/model-in/formatters/utils";
import { useDroppable } from "@dnd-kit/core";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FC, useContext, useMemo, useRef, useState } from "react";
import { AnyZodObject } from "zod";
import { GenericMetricsVisibilityAndOrderingSharedStateContext } from "../../context/GenericMetricsVisibilityAndOrderingSharedState";
import { ColumnsActions } from "./components/ColumnsActions";
import { MetricsItem } from "./components/MetricItem";

export const MetricsDnDContainer: FC = () => {
  const { dndId, orderState, uiHiddenKeys, modelHeaderFormatter } = useContext(
    GenericMetricsVisibilityAndOrderingSharedStateContext
  );
  const [search, setSearch] = useState("");
  const id = useMemo(
    () => `generic-metrics-visibility-and-ordering-dnd-container-${dndId}`,
    [dndId]
  );
  const { setNodeRef } = useDroppable({
    id,
  });

  const filteredMetrics = orderState
    .filter((metric) => !uiHiddenKeys.includes(metric))
    .filter((key) => {
      return modelHeaderFormatter
        ? modelHeaderFormatter
            ?.format({ key: key as keyof AnyZodObject })
            .value.toLowerCase()
            .includes(search.toLowerCase())
        : convertToTitleCase(humanizeSnakeCase(key as string))
            .toLowerCase()
            .includes(search.toLowerCase());
    });

  const inputRef = useRef<HTMLInputElement>(null);
  const isSearching = !!search || search.length > 0;

  return (
    <>
      <DebouncedSearchInput
        ref={inputRef}
        placeholder="Search metrics..."
        onSearch={setSearch}
        rightIcon={isSearching ? <XMarkIcon /> : null}
        rightIconAction={() => {
          setSearch("");
          inputRef.current.value = "";
          inputRef.current.focus();
        }}
      />
      <section className="max-h-[400px] overflow-auto mt-4">
        <ColumnsActions className="mb-3" />
        <ul
          className="flex flex-col"
          ref={(e) => {
            setNodeRef(e);
          }}
        >
          {filteredMetrics.map((key) => {
            const formattedTitle = modelHeaderFormatter?.format({
              key: key as keyof AnyZodObject,
            }).value;
            return (
              <MetricsItem
                key={key}
                id={key}
                title={
                  formattedTitle || convertToTitleCase(humanizeSnakeCase(key))
                }
                disableDragging={isSearching}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
};
