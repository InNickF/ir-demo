import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface IUseIdFromQueryParams {
  model: string;
  redirectOnNotFound: boolean;
  redirectURL: string;
}

export const useIdFromQueryParams = ({
  redirectOnNotFound,
  redirectURL,
  model,
}: IUseIdFromQueryParams) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  const router = useRouter();
  const { id } = router.query as { id: string };

  useEffect(() => {
    if (!id && redirectOnNotFound && redirectURL) {
      router.push(redirectURL);
      createNotification({
        kind: "error",
        subject: `${model} not found.`,
        message: `The ${model} you are looking for does not exist.`,
      });
    }
  }, [id, router, redirectOnNotFound, redirectURL, createNotification, model]);
  return id;
};
