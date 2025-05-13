import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface IUseDealIdFromQueryParamsOptions {
  redirectOnNotFound?: boolean;
}
export const useDealIdFromQueryParams = (
  { redirectOnNotFound = true }: IUseDealIdFromQueryParamsOptions = {
    redirectOnNotFound: true,
  }
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  const router = useRouter();
  const { dealId } = router.query as { dealId: string };

  useEffect(() => {
    if (redirectOnNotFound && !dealId) {
      router.push("/acquisitions/deals/");
      createNotification({
        kind: "error",
        subject: "Deal not found.",
        message: "The deal you are looking for does not exist.",
      });
    }
  }, [dealId, router, redirectOnNotFound, createNotification]);
  return dealId;
};
