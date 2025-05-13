import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { presentations } from "@/investor/utils/presentations";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";

export const usePresentationOrRedirect = () => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const router = useRouter();
  const { id } = router.query as { id: string };
  const presentation = useMemo(
    () => presentations.find((presentation) => presentation.id === id),
    [id]
  );
  const wasRedirected = useRef(false);
  useEffect(() => {
    if (!presentation && !wasRedirected.current) {
      wasRedirected.current = true;
      router.push("/investor/");
      createNotification({
        kind: "error",
        subject: "Presentation not found.",
        message: "The presentation you are looking for does not exist.",
      });
    }
  }, [presentation, router, createNotification]);

  return presentation;
};
