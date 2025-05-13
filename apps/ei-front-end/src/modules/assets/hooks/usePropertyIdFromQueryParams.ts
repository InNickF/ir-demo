import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface IUsePropertyIdFromQueryParams {
  redirectOnNotFound?: boolean;
}
export const usePropertyIdFromQueryParams = (
  { redirectOnNotFound = true }: IUsePropertyIdFromQueryParams = {
    redirectOnNotFound: true,
  }
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  const router = useRouter();
  const { propertyId } = router.query as { propertyId: string };

  useEffect(() => {
    if (redirectOnNotFound && !propertyId) {
      router.push("/assets/properties/");
      createNotification({
        kind: "error",
        subject: "Property not found.",
        message: "The property you are looking for does not exist.",
      });
    }
  }, [propertyId, router, redirectOnNotFound, createNotification]);
  return propertyId;
};
