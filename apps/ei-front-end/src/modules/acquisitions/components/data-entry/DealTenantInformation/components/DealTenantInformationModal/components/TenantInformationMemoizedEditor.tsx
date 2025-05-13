import { Editor } from "@/commons/components/data-entry/Editor";
import {
  EDITOR_DEFAULT_PLUGINS,
  EDITOR_DEFAULT_TOOLBAR,
} from "@/commons/components/data-entry/Editor/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { required } from "@/commons/utils/input-validations";
import { DealTenantInformation } from "@/modules/acquisitions/typings/deals";
import { HelperText, Label } from "in-ui-react";
import { FC, useMemo, useRef } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface TenantInformationMemoizedEditorProps {
  memoDependency?: string;
  fieldName: keyof DealTenantInformation;
  error?: string;
  register: UseFormRegister<DealTenantInformation>;
  setValue: UseFormSetValue<DealTenantInformation>;
}

export const TenantInformationMemoizedEditor: FC<
  TenantInformationMemoizedEditorProps
> = ({ memoDependency, fieldName, error, register, setValue }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>();

  const TenantInformationMemoizedEditor = useMemo(() => {
    return (
      <>
        <Label className="mb-2">{humanizeSnakeCase(fieldName)}</Label>
        <Editor
          onInit={(evt, editor) => {
            if (editorRef) {
              editorRef.current = editor;
            }
          }}
          initialValue={memoDependency}
          init={{
            plugins: EDITOR_DEFAULT_PLUGINS,
            toolbar: EDITOR_DEFAULT_TOOLBAR,
            quickbars_insert_toolbar: false,
          }}
          {...register(fieldName, {
            required: required(humanizeSnakeCase(fieldName)),
            validate: () => {
              return editorRef.current && editorRef.current.getContent() !== "";
            },
          })}
          onEditorChange={(text: string) => {
            setValue(fieldName, text);
          }}
        />
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoDependency || ""]);

  return (
    <div className="relative">
      {TenantInformationMemoizedEditor}
      <HelperText className={error ? "absolute" : "hidden"} color="error">
        {error}
      </HelperText>
    </div>
  );
};
