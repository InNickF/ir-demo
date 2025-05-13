import * as api from "@/auth/services/api";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { email } from "@/commons/utils/input-validations";
import { ForgotFormData } from "@/modules/auth/typings";
import { Button, Input } from "in-ui-react";
import { useAtom } from "jotai";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const ForgotForm = ({
  authStateSwitch,
}: {
  authStateSwitch: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [, createNotification] = useAtom(addNotificationAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>();

  const onSubmitForgot = async (email: ForgotFormData) => {
    try {
      setIsLoading(true);
      await api.forgot({ ...email });
      authStateSwitch();
      createNotification({
        subject: "Email sent",
        message: "Please check your email to reset your password.",
        kind: "success",
      });
    } catch ({ response }) {
      const error = response?.data?.error;
      createNotification({
        subject: "Email not sent",
        message: error || "Cannot reset your password. Please try again later.",
        kind: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="auth-page__form" onSubmit={handleSubmit(onSubmitForgot)}>
      <Input
        label="Email"
        {...register("email", { required: true, pattern: email() })}
        error={errors?.email?.message}
        className="mb-6"
        color="glass"
      />
      <Button type="submit" block loading={isLoading}>
        Submit
      </Button>
    </form>
  );
};
