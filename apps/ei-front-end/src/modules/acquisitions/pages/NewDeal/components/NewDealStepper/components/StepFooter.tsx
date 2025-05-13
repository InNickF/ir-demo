import { IsLoadingProp } from "@/commons/typings";
import { Button } from "in-ui-react";
import { useRouter } from "next/router";
import { FC } from "react";
import { SaveAndDontPursueModal } from "./steps/Summary/components/SaveAndPursueModal";

interface StepFooterProps extends IsLoadingProp {
  current: number;
  onBack: () => void;
  beforeCancel?: () => void;
  onContinue?: () => void;
  onDontPursue?: () => void;
  canDontPursue?: boolean;
  isLoadingPursue?: boolean;
  type?: "submit" | "button";
}

export const StepFooter: FC<StepFooterProps> = ({
  current,
  type = "button",
  onBack,
  onContinue,
  beforeCancel,
  isLoading,
  onDontPursue,
  canDontPursue,
  isLoadingPursue,
}) => {
  const router = useRouter();
  const isSomethingLoading = isLoading || isLoadingPursue;
  return (
    <div className="flex justify-between mt-7">
      <Button
        kind="ghost"
        onClick={() => {
          beforeCancel?.();
          router.back();
        }}
        disabled={isSomethingLoading}
      >
        Cancel
      </Button>
      <div className="flex gap-2">
        <Button
          onClick={onBack}
          kind="outline"
          className={current > 1 ? undefined : "hidden"}
          disabled={isSomethingLoading}
        >
          Go Back
        </Button>
        {current === 5 ? (
          <SaveAndDontPursueModal
            canDontPursue={canDontPursue}
            onSave={onDontPursue}
            isLoading={isLoadingPursue}
            disabled={isLoading}
          />
        ) : null}
        <Button onClick={onContinue} type={type} loading={isLoading}>
          {current === 5 ? "Save & Pursue" : "Continue"}
        </Button>
      </div>
    </div>
  );
};
