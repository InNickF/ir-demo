import { useMutateDealPipelinePhase } from "@/acquisitions/services/mutations/deals";
import {
  DealPhase,
  DealPipelineSummary,
  PipelineStage,
} from "@/acquisitions/typings/deals";
import { DEAL_STATUS_TAGS } from "@/acquisitions/utils";
import { GenericFilterPayload } from "@/commons/typings";
import { getGenericValueOrString } from "@/commons/utils";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  numberToDollar,
  readableNumber,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  Heading,
  Tag,
  TagProps,
  Tooltip,
} from "in-ui-react";
import { useRouter } from "next/router";
import { FC, memo, useMemo } from "react";
import { findNextStage } from "../../utils";
import "./styles.css";

interface PipelineDealCardProps {
  deal: DealPipelineSummary;
  filters: GenericFilterPayload & {
    phase: DealPhase;
  };
}
export const PipelineDealCard: FC<PipelineDealCardProps> = ({
  deal,
  filters,
}) => {
  const router = useRouter();
  const mutation = useMutateDealPipelinePhase();
  const goToDeal = () => {
    router.push(`/acquisitions/deals/deal-summary/?dealId=${deal.id}`);
  };
  const actions = useMemo(() => {
    const dropdownActions: DropdownItem[] = [
      {
        text: "View deal details",
        onClick: () => {
          goToDeal();
        },
      },
      {
        text: "Edit deal",
        onClick: () => {
          router.push(`/acquisitions/deals/edit/?dealId=${deal.id}`);
        },
      },
    ];
    const moveDealToNextStageAction = (stage: PipelineStage) => ({
      text: `Move to "${stage.name}"`,
      onClick: () => {
        if (!deal?.has_post_screening_data) {
          router.push(`/acquisitions/deals/change-phase/?dealId=${deal.id}`);
        } else {
          mutation.mutate({
            deal,
            newPhase: stage.id,
            filters,
          });
        }
      },
    });
    const dealPhase = getGenericValueOrString(deal?.phase);

    const nextStage = findNextStage(dealPhase);
    nextStage && dropdownActions.push(moveDealToNextStageAction(nextStage));

    return dropdownActions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deal]);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: deal.id,
      data: { deal, filters },
      disabled: true,
    });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const getClasses = () => {
    const classes = ["acq-pipeline-deal-card", "generic-entrance-animation"];
    isDragging && classes.push("acq-pipeline-deal-card--dragging");
    return classes.join(" ");
  };

  const getBodyClasses = () => {
    const classes = ["acq-pipeline-deal-card--body"];
    isDragging && classes.push("acq-pipeline-deal-card--body--dragging");
    return classes.join(" ");
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={getClasses()}
      padding={false}
    >
      <div className={getBodyClasses()}>
        <PipelineDealCardBody deal={deal} dropdownActions={actions} />
      </div>
    </Card>
  );
};

const PipelineDealCardBody = memo(
  ({
    deal,
    dropdownActions,
  }: {
    deal: DealPipelineSummary;
    dropdownActions: DropdownItem[];
  }) => {
    return (
      <>
        <header className="acq-pipeline-deal-card__header">
          <PipelineDealCardTitle name={deal.name} dealId={deal.id} />
          <Dropdown
            className="justify-self-end z-control"
            items={dropdownActions}
            dropdownInitialState={{ placement: "bottom-end" }}
            disclosure={
              <Button
                kind="ghost"
                icon={<EllipsisHorizontalIcon />}
                onlyIcon
                size="small"
              />
            }
          />
        </header>
        <small className="acq-pipeline-deal-card__header-details">
          Address: {genericGetValue(deal?.address)}
        </small>
        <PipelineDealCardImage
          img={deal?.pictures.length ? deal.pictures[0].file : null}
          dealName={deal.name}
          dealId={deal.id}
        />
        <footer className="acq-pipeline-deal-card__footer">
          <div className="acq-pipeline-deal-card__footer--details">
            <small>Equity: {numberToDollar({ value: deal?.equity })}</small>
            <small>SF: {readableNumber(deal?.sf)}</small>
          </div>
          <PipelineDealCardStatus status={deal?.status} />
        </footer>
      </>
    );
  }
);

PipelineDealCardBody.displayName = "PipelineDealCardBody";

const PipelineDealCardTitle: FC<{
  name: DealPipelineSummary["name"];
  dealId: DealPipelineSummary["id"];
}> = ({ name, dealId }) => {
  const router = useRouter();
  const goToDeal = () => {
    router.push(`/acquisitions/deals/deal-summary/?dealId=${dealId}`);
  };
  const textSliceLength = 45;
  const textLength = name.length;
  const isLongText = textLength > textSliceLength;
  const slicedText = (text: string): string => {
    return text.slice(0, textSliceLength)?.concat("...");
  };
  const HeadingWithTooltip = () => (
    <Tooltip content={name}>
      <Heading onClick={goToDeal} className="self-center" kind="subtitle-1">
        {slicedText(name)}
      </Heading>
    </Tooltip>
  );

  return isLongText ? (
    <HeadingWithTooltip />
  ) : (
    <Heading onClick={goToDeal} className="self-center" kind="subtitle-1">
      {name}
    </Heading>
  );
};

const PipelineDealCardImage: FC<{
  img: string;
  dealName: DealPipelineSummary["name"];
  dealId: DealPipelineSummary["id"];
}> = ({ img, dealName, dealId }) => {
  const router = useRouter();
  const goToDeal = () => {
    router.push(`/acquisitions/deals/deal-summary/?dealId=${dealId}`);
  };
  return img ? (
    <img
      onClick={goToDeal}
      className="acq-pipeline-deal-card__image"
      src={img}
      alt={dealName}
    />
  ) : (
    <div
      onClick={goToDeal}
      className="acq-pipeline-deal-card__image acq-pipeline-deal-card__image--no-image"
    >
      No image
    </div>
  );
};

const PipelineDealCardStatus: FC<{ status: DealPipelineSummary["status"] }> = ({
  status,
}) => {
  const getTag = (): TagProps["color"] =>
    DEAL_STATUS_TAGS.find((tag) => tag.value === status?.label)?.color;

  return (
    <Tag
      className="self-center justify-self-end whitespace-nowrap"
      size="small"
      textSliceLength={10}
      color={getTag()}
      text={status?.label}
    />
  );
};
