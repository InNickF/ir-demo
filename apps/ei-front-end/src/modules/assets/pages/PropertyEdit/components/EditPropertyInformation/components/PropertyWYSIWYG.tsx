import { Editor } from "@/commons/components/data-entry/Editor";
import { EditorProps } from "@/commons/components/data-entry/Editor/components/RawEditor";
import {
  EDITOR_DEFAULT_PLUGINS,
  EDITOR_DEFAULT_TOOLBAR,
} from "@/commons/components/data-entry/Editor/utils";
import { HelperText, Label } from "in-ui-react";
import { forwardRef, useMemo, useRef, useState } from "react";

interface PropertyEditorProps
  extends Omit<EditorProps, "editorRef" | "onChange" | "tags"> {
  onContentChange?: (content: string) => void;
  content: string;
  label: string;
  error?: string;
  className?: string;
}

export const PropertyWYSIWYG = forwardRef<HTMLDivElement, PropertyEditorProps>(
  ({ className, content, error, label, onContentChange, ...props }, ref) => {
    const editorRef = useRef(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoadingEditor, setIsLoadingEditor] = useState(true);

    const getClasses = () => {
      const classes = ["relative"];
      className && classes.push(className);
      return classes.join(" ");
    };

    const MemoPropertyEditor = useMemo(
      () => (
        <Editor
          className="w-full mb-3"
          onInit={(evt, editor) => {
            if (editorRef) {
              editorRef.current = editor;
            }
            setIsLoadingEditor(false);
          }}
          initialValue={content || ""}
          init={{
            plugins: EDITOR_DEFAULT_PLUGINS,
            toolbar: EDITOR_DEFAULT_TOOLBAR,
            quickbars_insert_toolbar: false,
          }}
          onEditorChange={(text: string) => {
            onContentChange(text);
          }}
          {...props}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [content]
    );

    return (
      <div ref={ref} className={getClasses()}>
        <Label className="mb-2">{label}</Label>
        {MemoPropertyEditor}
        <HelperText className={error ? "absolute" : "hidden"} color="error">
          {error}
        </HelperText>
      </div>
    );
  }
);

PropertyWYSIWYG.displayName = "PropertyWYSIWYG";
