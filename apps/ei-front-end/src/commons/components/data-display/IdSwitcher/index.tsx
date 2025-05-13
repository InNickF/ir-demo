import { useDebouncedFunction } from "@/commons/hooks/useDebouncedFunction";
import {
  useNavigateSwitcherItems,
  useToggleIdSwitcherVisibility,
} from "@/commons/hotkeys";
import { AnyObject, IsLoadingProp } from "@/commons/typings";
import { ValueFormatter } from "@/commons/model-in/formatters/types";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Empty,
  Heading,
  Input,
  Modal,
  Skeleton,
  Tooltip,
} from "in-ui-react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IdSwitcherItem } from "./components/IdSwitcherItem";

export interface IdSwitcherKeyDetails<TModel extends AnyObject> {
  label?: string;
  key: keyof TModel;
}

export interface IdSwitcherProps<TModel extends AnyObject>
  extends IsLoadingProp {
  modelName: string;
  items: TModel[];
  onSelect?: (item: TModel) => void;
  onClose?: () => void;
  keyDetails?: IdSwitcherKeyDetails<TModel>[];
  nameAccessor: keyof TModel;
  idAccessor: keyof TModel;
  formatter?: ValueFormatter<TModel>;
  urlIdGetter?: string;
  keepOnSelect?: boolean;
  activeElementId?: string | number;
  extraSearchKeys?: (keyof TModel)[];
}
export const IdSwitcher = <TModel extends AnyObject>({
  modelName,
  items,
  onSelect,
  onClose,
  keyDetails,
  nameAccessor,
  idAccessor,
  formatter,
  urlIdGetter = "id",
  keepOnSelect,
  activeElementId,
  isLoading,
  extraSearchKeys = [],
}: IdSwitcherProps<TModel>) => {
  const [show, setShow] = useState(false);
  const [focusedItem, setFocusedItem] = useState<number>(0);
  const [search, setSearch] = useState<string>(null);
  const input = useRef<HTMLInputElement>(null);

  const filteredItems = () => {
    const keysToSearch = [nameAccessor, idAccessor, ...extraSearchKeys];
    return search
      ? items
          ?.filter((item) => {
            return keysToSearch.some((key) => {
              const value = item[key];
              return value
                ?.toString()
                .toLowerCase()
                .includes(search?.toLowerCase());
            });
          })
          ?.filter((item) => item[idAccessor] !== activeElementId)
      : items;
  };
  const hasItems = filteredItems()?.length > 0;

  const router = useRouter();
  const switchURL = (id: string) => {
    if (!id) return;
    router.push({ query: { [urlIdGetter]: id } });
  };

  const select = (item: TModel) => {
    const id = filteredItems()?.[focusedItem]?.[idAccessor] as string;
    if (!id) return;
    onSelect?.(item);
    const urlId = encodeURIComponent(id);
    switchURL(urlId);
    if (!keepOnSelect) {
      setShow(false);
      input.current?.focus();
      input.current.value = "";
      setSearch(null);
    }
  };

  const close = () => {
    setShow(false);
    onClose?.();
  };

  useToggleIdSwitcherVisibility({
    toggleCallback: () => {
      setShow((prev) => !prev);
    },
  });

  useNavigateSwitcherItems({
    onDown: () => {
      setFocusedItem((prev) => (prev + 1) % filteredItems()?.length);
    },
    onUp: () => {
      setFocusedItem(
        (prev) => (prev - 1 + filteredItems()?.length) % filteredItems()?.length
      );
    },
    onEnter: () => {
      select(filteredItems()?.[focusedItem]);
    },
    enabled: show,
  });

  const activeItem = items?.find(
    (item) => item[idAccessor] === activeElementId
  );
  const debouncedSearch = useDebouncedFunction({
    delay: 150,
    func: (value: string) => {
      focusedItem !== 0 && setFocusedItem(0);
      setSearch(value);
    },
  });

  useEffect(
    function focusInputOnMount() {
      if (show) {
        input.current?.focus();
      }
    },
    [show]
  );

  return (
    <>
      <Tooltip content="Switch (Cmd+S, Ctrl+S)">
        <Button
          onlyIcon
          kind="ghost"
          size="small"
          icon={<ArrowsRightLeftIcon />}
          onClick={() => {
            setShow((prev) => !prev);
          }}
        />
      </Tooltip>
      <Modal
        disclosure={<span className="hidden"></span>}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            close();
          }
        }}
        visible={show}
        size="big"
      >
        {() => (
          <>
            <Modal.Header
              onClose={() => {
                close?.();
              }}
            >
              Switch {convertToTitleCase(modelName)}
            </Modal.Header>
            <section className="grid gap-3 p-3">
              <Input
                ref={input}
                onChange={(e) => debouncedSearch(e.target.value)}
                placeholder={`Search ${convertToTitleCase(modelName)}...`}
              />
              <section className="bg-ghost-contrast-2 h-[theme(spacing.60)] sm:h-[theme(spacing.96)] overflow-auto">
                <div className="grid items-start gap-2 p-2 ">
                  {isLoading && (
                    <Skeleton>
                      <Skeleton.Text kind="title" rows={8} className="h-20" />
                    </Skeleton>
                  )}

                  {hasItems &&
                    !isLoading &&
                    filteredItems().map((item, index) => (
                      <IdSwitcherItem
                        key={`${item[idAccessor]}-${index}`}
                        item={item}
                        keyDetails={keyDetails}
                        nameAccessor={nameAccessor}
                        idAccessor={idAccessor}
                        formatter={formatter}
                        onSelect={select}
                        isSelected={focusedItem === index}
                        onMoveEnter={() => {
                          setFocusedItem(index);
                        }}
                        onRefocus={() => {
                          input.current?.focus();
                        }}
                      />
                    ))}

                  {!hasItems && !isLoading && <Empty />}
                </div>
              </section>
            </section>
            <footer className="grid gap-1 px-3 pb-3 mt-2">
              <Heading kind="h5">
                Current {convertToTitleCase(modelName)}
              </Heading>
              {activeItem ? (
                <IdSwitcherItem
                  item={activeItem}
                  keyDetails={keyDetails}
                  nameAccessor={nameAccessor}
                  idAccessor={idAccessor}
                  formatter={formatter}
                />
              ) : (
                <Empty />
              )}
            </footer>
          </>
        )}
      </Modal>
    </>
  );
};
