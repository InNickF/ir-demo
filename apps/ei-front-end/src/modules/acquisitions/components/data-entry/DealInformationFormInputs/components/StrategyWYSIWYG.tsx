import {
  StrategyEditor,
  StrategyEditorProps as BaseStrategyEditorProps,
} from "@/acquisitions/components/data-entry/DealStrategyEditor";
import { useDealStrategyTags } from "@/acquisitions/services/queries/deals";
import { HelperText, Label, TextArea, TextAreaProps } from "in-ui-react";
import { forwardRef, useMemo, useRef } from "react";

interface StrategyEditorProps
  extends Omit<BaseStrategyEditorProps, "editorRef" | "onChange" | "tags">,
    TextAreaProps {
  onContentChange?: (content: string) => void;
}

export const StrategyWYSIWYG = forwardRef<
  HTMLTextAreaElement,
  StrategyEditorProps
>(({ className, content, error, label, onContentChange, ...props }, ref) => {
  const editorRef = useRef(null);
  const { data: strategyTags } = useDealStrategyTags();

  const getClasses = () => {
    const classes = ["relative"];
    className && classes.push(className);
    return classes.join(" ");
  };

  const MemoDealStrategyEditor = useMemo(
    () => (
      <StrategyEditor
        tags={strategyTags}
        content={content}
        editorRef={editorRef}
        onChange={(text: string) => {
          onContentChange(text);
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [strategyTags, content]
  );

  return (
    <div className={getClasses()}>
      <Label className="mb-2">{label}</Label>
      {MemoDealStrategyEditor}
      <HelperText className={error ? "absolute" : "hidden"} color="error">
        {error}
      </HelperText>
      <TextArea ref={ref} className="hidden" {...props} />
    </div>
  );
});

StrategyWYSIWYG.displayName = "StrategyWYSIWYG";
