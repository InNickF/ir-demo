/* eslint-disable @typescript-eslint/no-explicit-any */
import { DealStrategyTag } from "@/acquisitions/typings/deals";
import { Editor } from "@/commons/components/data-entry/Editor";
import {
  EDITOR_DEFAULT_PLUGINS,
  EDITOR_DEFAULT_TOOLBAR,
} from "@/commons/components/data-entry/Editor/utils";
import { capitalize } from "@/commons/model-in/formatters/utils";
import { Skeleton } from "in-ui-react";
import { FC, MutableRefObject, useState } from "react";

export interface StrategyEditorProps {
  tags: DealStrategyTag[];
  content: string;
  editorRef?: MutableRefObject<any>;
  onChange?: (text: string) => void;
}
export const StrategyEditor: FC<StrategyEditorProps> = ({
  tags,
  content,
  editorRef,
  onChange,
}) => {
  const skeletonClasses = "w-full h-[400px]";
  const [isLoading, setIsLoading] = useState(true);
  const hasTags = tags && tags.length > 0;
  return (
    <>
      {tags ? (
        <div className={isLoading ? "hidden" : undefined}>
          <Editor
            hideLoading
            onInit={(evt, editor) => {
              if (editorRef) {
                editorRef.current = editor;
              }
              setIsLoading(false);
            }}
            initialValue={content}
            init={{
              plugins: EDITOR_DEFAULT_PLUGINS,
              toolbar: hasTags
                ? `tags | ${EDITOR_DEFAULT_TOOLBAR}`
                : `${EDITOR_DEFAULT_TOOLBAR}`,
              quickbars_insert_toolbar: false,
              setup(editor) {
                if (!hasTags) return;
                editor.ui.registry.addMenuButton("tags", {
                  text: "Deal Tags",
                  fetch: (callback) => {
                    const items = tags.map((tag) => ({
                      type: "menuitem",
                      text: capitalize(tag.label),
                      onAction: () =>
                        editor.insertContent(`&nbsp;${tag.value}`),
                    }));

                    callback(items as any);
                  },
                });
              },
            }}
            onEditorChange={(text: string) => {
              onChange(text);
            }}
          />
        </div>
      ) : null}
      {isLoading ? (
        <Skeleton className={skeletonClasses}>
          <Skeleton.Avatar shape="squared" className={skeletonClasses} />
        </Skeleton>
      ) : null}
    </>
  );
};
