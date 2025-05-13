import { HandlerVisibleConfigComponent } from "@/commons/model-in/configs/types";
import {
  convertToTitleCase,
  humanizeSnakeAndKeepCase,
} from "@/commons/model-in/formatters/utils";
import { ButtonGroup, ButtonGroupItem } from "in-ui-react";

export const ConfigVisibilityButtonGroup: HandlerVisibleConfigComponent = ({
  active,
  configs,
  setActive,
}) => {
  const items: ButtonGroupItem[] = configs.map((config) => ({
    key: config.id,
    text: convertToTitleCase(humanizeSnakeAndKeepCase(config.label)),
    onClick: () => setActive(config.id),
  }));
  return <ButtonGroup size="small" items={items} active={active} />;
};
