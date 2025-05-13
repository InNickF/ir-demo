import { IsLoadingProp } from "@/commons/typings";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Container, LoadingLine, TextArea } from "in-ui-react";
import { FC, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "./styles.css";

interface ChatFormProps extends IsLoadingProp {
  placeholder?: string;
  onMessage?: (data: ChatFormValues) => void;
  disabled?: boolean;
}

interface ChatFormValues {
  content: string;
}

export const ChatForm: FC<ChatFormProps> = ({
  placeholder = "Type your message here...",
  onMessage,
  disabled = false,
  isLoading = false,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { register, handleSubmit, reset } = useForm<ChatFormValues>();
  const { ref, ...rest } = register("content", {
    required: "A message is required",
  });

  useEffect(function focusOnMount() {
    inputRef.current?.focus();
  }, []);

  useEffect(
    function focusOnChangeDisabled() {
      if (!disabled || !isLoading) {
        inputRef.current?.focus();
      }
    },
    [disabled, isLoading]
  );

  const onSubmit = (data: ChatFormValues) => {
    onMessage?.(data);
    reset();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      if (isDisabled) return;
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const isDisabled = disabled || isLoading;
  const prefix = "insight-chat-form";
  return (
    <section className={prefix}>
      <Container className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextArea
            className={`${prefix}__input`}
            disabled={isDisabled}
            onKeyDown={handleKeyDown}
            ref={(input) => {
              ref(input);
              inputRef.current = input;
            }}
            rightIcon={<PaperAirplaneIcon />}
            rightIconAction={() => {
              if (isDisabled) return;
              handleSubmit(onSubmit)();
            }}
            placeholder={placeholder}
            {...rest}
          />
        </form>
      </Container>
      <LoadingLine
        className={`${prefix}__loading-line`}
        isActive={isLoading}
        persist
      />
    </section>
  );
};
