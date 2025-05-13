import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import {
  messageUnableToCreate,
  messageUnableToDelete,
  messageUnableToUpdate,
  subjectErrorCRUD,
} from "@/commons/utils/notification-messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { invalidateLoansQueries } from "../../utils/query-invalidations";
import {
  deleteDebtLoanRoomItem,
  deleteDebtLoanTimeline,
  patchDebtLoanRoomItem,
  patchDebtLoanTimeline,
  patchLoanOrdering,
  postDebtContract,
  legacyPostDebtLoan,
  postDebtLoanRoomItem,
  postDebtLoanTimeline,
  postDebtLoan,
  patchDebtLoanStatus,
  postDebtLoanCapMappings,
  patchDebtLoanCapMappings,
} from "../api/loans";
import { queries } from "../keys";
import { IPaginatedResponse } from "@/commons/typings";
import { DebtLoan } from "../../typings/loans";
import { cleanEmptyObjectValues } from "@/commons/utils";

export const useLegacyMutatePostDebtLoan = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: legacyPostDebtLoan,
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Loan abstract file uploaded successfully.`,
        message: `Uploaded loan abstract file for "${variables?.property?.label}"`,
        kind: "success",
      });
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(
          error,
          `Error uploading loan abstract file for "${variables?.property?.label}"`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePostDebtLoan = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postDebtLoan,
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Loan abstract file uploaded successfully.`,
        message: `Uploaded loan abstract file for "${variables?.loan_name?.label}"`,
        kind: "success",
      });
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(
          error,
          `Error uploading loan abstract file for "${variables?.loan_name}"`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePostDebtLoanContract = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postDebtContract,
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Loan contract file uploaded successfully.`,
        message: `Uploaded loan contract file for loan: "${variables?.loan_abstract_id}"`,
        kind: "success",
      });
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(
          error,
          `Error uploading loan contract file for loan: "${variables?.loan_abstract_id}"`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePostDebtLoanTimeline = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postDebtLoanTimeline,
    onMutate: async ({ loan_abstract_id, id }) => {
      return { loan_abstract_id, id };
    },
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Loan timeline uploaded successfully.`,
        message: `Uploaded loan timeline for loan: "${variables?.loan_abstract_id}"`,
        kind: "success",
      });
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(
          error,
          `Error uploading loan timeline for loan: "${variables?.loan_abstract_id}"`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePatchDebtLoanTimeline = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: patchDebtLoanTimeline,
    onMutate: async ({ loan_abstract_id, id }) => {
      return { loan_abstract_id, id };
    },
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Loan timeline updated successfully.`,
        message: `Updated loan timeline for loan: "${variables?.loan_abstract_id}"`,
        kind: "success",
      });
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "PATCH" }),
        message: parseError(
          error,
          `Error updating loan timeline for loan: "${variables?.loan_abstract_id}"`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutateDeleteDebtLoanTimeline = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: deleteDebtLoanTimeline,
    onMutate: async ({ loan_abstract_id, id }) => {
      return { loan_abstract_id, id };
    },
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Loan timeline deleted successfully.`,
        message: `Deleted loan timeline for loan: "${variables?.loan_abstract_id}"`,
        kind: "success",
      });
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "DELETE" }),
        message: parseError(
          error,
          `Error deleting loan timeline for loan: "${variables?.loan_abstract_id}"`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePostLoanRoomItem = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postDebtLoanRoomItem,
    onMutate: async ({ loan_abstract_id }) => {
      return { loan_abstract_id };
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(
          error,
          messageUnableToCreate(
            `document for loan "${variables?.loan_abstract_id}"`
          )
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePatchLoanRoomItem = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: patchDebtLoanRoomItem,
    onMutate: async ({ loan_abstract_id }) => {
      return { loan_abstract_id };
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "PATCH" }),
        message: parseError(
          error,
          messageUnableToUpdate(
            `document for loan "${variables?.loan_abstract_id}"`
          )
        ),
        kind: "error",
      });
    },
  });
};

export const useMutateDeleteLoanRoomItem = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: deleteDebtLoanRoomItem,
    onMutate: async ({ loan_abstract_id }) => {
      return { loan_abstract_id };
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "DELETE" }),
        message: parseError(
          error,
          messageUnableToDelete(
            `document for loan "${variables?.loan_abstract_id}"`
          )
        ),
        kind: "error",
      });
    },
  });
};

export const useMutationPatchLoanOrdering = () => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchLoanOrdering,
    onMutate: async ({ activeItem, overItem, filters, isBelowOverItem }) => {
      await queryClient.cancelQueries({
        queryKey: queries.loans.debtLoans._def,
      });

      const previousLoanList = queryClient.getQueryData<
        IPaginatedResponse<DebtLoan>
      >(queries.loans.debtLoans(cleanEmptyObjectValues(filters)).queryKey);

      const overItemIndex = previousLoanList?.results.findIndex(
        (loan) => loan?.id === overItem?.id
      );

      const modifier = isBelowOverItem ? 1 : 0;
      const sliceEnd = overItemIndex + modifier;

      const nextPreviousItems = previousLoanList?.results
        .slice(0, sliceEnd)
        .filter((loan?) => loan?.id !== activeItem?.id);

      const lastPreviousItem =
        nextPreviousItems[nextPreviousItems?.length - 1] || null;

      const newActiveItem: DebtLoan = {
        ...activeItem,
        sorting: lastPreviousItem ? lastPreviousItem.sorting + 1 : 0,
      };

      const newNextLoanList =
        nextPreviousItems
          .concat(newActiveItem)
          .concat(
            previousLoanList?.results
              .slice(sliceEnd)
              .filter((loan) => loan?.id !== activeItem?.id)
          ) || [];

      queryClient.setQueryData<IPaginatedResponse<DebtLoan>>(
        queries.loans.debtLoans(cleanEmptyObjectValues(filters)).queryKey,
        (data) => ({
          ...data,
          results: newNextLoanList,
        })
      );
    },
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Loan order changed.`,
        message: `Loan order changed for "${variables?.activeItem?.loan_name}"`,
        kind: "success",
      });
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error changing loan order.`,
        message: parseError(
          error,
          `Unable to change loan order for "${variables?.activeItem?.loan_name}"`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutationPatchLoanStatus = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: patchDebtLoanStatus,
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Loan status updated successfully.`,
        message: `Updated status for loan: "${variables?.loan_name}"`,
        kind: "success",
      });
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(
          error,
          `Error updating loan status for loan: "${variables?.loan_name}"`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePostDebtLoanCap = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postDebtLoanCapMappings,
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Loan cap created successfully.`,
        message: `Created cap for loan: "${variables?.loan_name}"`,
        kind: "success",
      });
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(
          error,
          `Error creating cap for loan: "${variables?.loan_name}"`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePatchDebtLoanCap = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: patchDebtLoanCapMappings,
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Loan cap updated successfully.`,
        message: `Updated cap for loan: "${variables?.loan_name}"`,
        kind: "success",
      });
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "PATCH" }),
        message: parseError(
          error,
          `Error updating cap for loan: "${variables?.loan_name}"`
        ),
        kind: "error",
      });
    },
  });
};
