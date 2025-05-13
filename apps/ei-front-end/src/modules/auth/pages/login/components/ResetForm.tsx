import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, Heading, Input } from "in-ui-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as api from "@/auth/services/api";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { useAtom } from "jotai";
import {
  passwordValidations,
  required,
} from "@/commons/utils/input-validations";
import { ResetFormData } from "@/modules/auth/typings";

export const ResetForm = () => {
  const router = useRouter();
  const { token: authToken } = router.query as { token: string };
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, createNotification] = useAtom(addNotificationAtom);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetFormData>();

  const onSubmitReset = async (resetData: ResetFormData) => {
    try {
      setIsLoading(true);
      setShowPassword(false);
      await api.reset({ password: resetData.newPassword, token: authToken });
      router.push(router.pathname, undefined, { shallow: true });
      createNotification({
        subject: "Password resetted",
        message:
          "Your password has been resetted. Please login with your new password.",
        kind: "success",
      });
    } catch ({ response }) {
      const error = response?.data?.error;
      createNotification({
        subject: "Password reset failed",
        message: error || "Cannot reset your password. Please try again later.",
        kind: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <Heading kind="h4">Reset your password</Heading>
        <Heading kind="subtitle-1" className="text-silver">
          Enter your new password below.
        </Heading>
      </div>
      <form className="auth-page__form" onSubmit={handleSubmit(onSubmitReset)}>
        <Input
          label="New Password"
          type={showPassword ? "text" : "password"}
          {...register("newPassword", {
            required: required("A password"),
            validate: { ...passwordValidations },
          })}
          error={errors?.newPassword?.message}
          className="mb-6"
          color="glass"
          rightIcon={showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          rightIconAction={() => setShowPassword(!showPassword)}
        />
        <Input
          label="Confirm password"
          type={showConfirmPassword ? "text" : "password"}
          {...register("confirmPassword", {
            required: required("Password confirmation"),
            validate: (value: string) =>
              watch("newPassword") === value || "Passwords do not match",
          })}
          error={errors?.confirmPassword?.message}
          className="mb-6"
          color="glass"
          rightIcon={showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
          rightIconAction={() => setShowConfirmPassword(!showConfirmPassword)}
        />
        <Button type="submit" block loading={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
};
