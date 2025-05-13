import * as api from "@/auth/services/api";
import * as commonApi from "@/commons/services/api";
import { userQueries } from "@/commons/services/managers/react-query/queries/user";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { jwt } from "@/commons/utils";
import { getAuthPrevPath } from "@/commons/utils/auth";
import { email, required } from "@/commons/utils/input-validations";
import { LoginFormData } from "@/modules/auth/typings";
import { useGSAP } from "@gsap/react";
import { useQueryClient } from "@tanstack/react-query";
import gsap from "gsap";
import { Button, Input } from "in-ui-react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

export type LoginData = {
  email: string;
  password: string;
};
interface LoginFormProps {
  pageRef: React.RefObject<HTMLDivElement>;
}
export const LoginForm: FC<LoginFormProps> = ({ pageRef }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [, createNotification] = useAtom(addNotificationAtom);

  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "secret@user.com",
      password: "worldwide_secure_password",
    },
  });

  const { contextSafe } = useGSAP({ scope: pageRef });

  const onSubmitLogin = async (loginData: LoginFormData) => {
    try {
      setIsLoading(true);
      const nextPath = getAuthPrevPath() || "/";

      const goToLobby = () => {
        /* There was a bug where the nextPath is the auth path
        and after login the user was redirected to the login
        form again this validation is to avoid that behavior. */

        const authPaths = ["/auth/", "/auth"];
        router.push(authPaths.includes(nextPath) ? "/" : nextPath);
      };

      contextSafe(() => {
        gsap.to(pageRef.current, {
          opacity: 0,
          ease: "power2.inOut",
          duration: 1,
          onComplete: () => {
            goToLobby();
          },
        });
      })();
    } catch (error) {
      const errorMessage = error?.response?.data?.error;
      createNotification({
        subject: "Login failed",
        message: errorMessage || "Please check your credentials and try again.",
        kind: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="auth-page__form"
        onSubmit={handleSubmit((data) => {
          // Set email value to lowercase before submitting the form
          setValue("email", data.email.toLowerCase());

          onSubmitLogin(getValues());
        })}
      >
        <Input
          label="email"
          {...register("email", {
            required: required("Email"),
            pattern: email(),
          })}
          error={errors?.email?.message}
          className="mb-6"
          color="glass"
        />
        <Input
          type="password"
          label="Password"
          {...register("password", { required: required("Password") })}
          error={errors?.password?.message}
          className="mb-6"
          color="glass"
        />
        <Button
          type="submit"
          block
          loading={isLoading}
          data-cy="auth-login-button"
        >
          Login
        </Button>
      </form>
    </>
  );
};
