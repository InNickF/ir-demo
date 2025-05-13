import {
  CompstackCompKeysPayloadByType,
  CompstackCompType,
} from "@/modules/acquisitions/typings/market-analytics";
import {
  ReactElement,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { GenericCompstackCompFormProps } from "../../types";
import { CompFormActions } from "../CompFormActions";
import { CompFormSuccessMessage } from "../CompFormSuccessMessage";
import { setNullEmptyStrings } from "@/commons/utils";

export const GenericCompstackCompForm = <T extends CompstackCompType>({
  rhfProps,
  modalIsVisible,
  useMutation,
  children,
  onSave,
  onClose,
  compType,
}: GenericCompstackCompFormProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const mutation = useMutation();
  const [hideForm, setHideForm] = useState(false);

  const methods = useForm<CompstackCompKeysPayloadByType[T]>(rhfProps);

  useEffect(() => {
    !modalIsVisible && methods.reset();
    setHideForm(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsVisible, methods.reset]);

  const createManualComp = (comp: CompstackCompKeysPayloadByType[T]) => {
    const payload = setNullEmptyStrings(comp);
    setIsLoading(true);
    mutation.mutate(payload, {
      onSettled: () => {
        setIsLoading(false);
      },
      onSuccess: () => {
        setHideForm(true);
        onSave();
      },
    });
  };

  return (
    <form onSubmit={methods.handleSubmit(createManualComp)}>
      {!hideForm ? (
        //This allows to pass the formState to the children instead of having to pass each CompFormFieldsRenderer prop and then to the children
        isValidElement(children) &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cloneElement(children as ReactElement<any>, {
          formState: methods,
        })
      ) : (
        <CompFormSuccessMessage compType={compType} />
      )}
      <CompFormActions
        hideSaveButton={hideForm}
        onClose={onClose}
        isLoading={isLoading}
      />
    </form>
  );
};
