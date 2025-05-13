import { useReducer } from "react";
import { LoanTimelineModalState } from "../types";
import { ModalProps } from "in-ui-react";
import { slicedTextWithEllipsis } from "@/commons/model-in/formatters/utils";

enum ModalReducerActionTypes {
  CREATE = "CREATE",
  EDIT = "EDIT",
  RESET = "RESET",
  DELETE = "DELETE",
}

type LoanTimelineReducerModalState = LoanTimelineModalState & {
  modal?: boolean;
  size?: ModalProps["size"];
};

interface LoanTimelineModalReducerCreateAction {
  type: ModalReducerActionTypes;
  payload: LoanTimelineReducerModalState;
}

interface LoanTimelineModalReducerEditAction {
  type: ModalReducerActionTypes.EDIT;
  payload: Omit<LoanTimelineReducerModalState, "item"> & {
    item: LoanTimelineReducerModalState["item"];
  };
}

interface LoanTimelineModalReducerDeleteAction {
  type: ModalReducerActionTypes.DELETE;
  payload: Omit<LoanTimelineReducerModalState, "item"> & {
    item: LoanTimelineReducerModalState["item"];
  };
}

const initialState: LoanTimelineReducerModalState = {
  item: null,
  Form: null,
  header: null,
  actionText: "Save",
  cancelText: "Cancel",
  useMutation: null,
  size: "normal",
  onAction: () => null,
  onCancel: () => null,
  modal: false,
};

type ReducerObject = {
  [key in ModalReducerActionTypes]: LoanTimelineReducerModalState;
};

type ReducerObjectFn = (
  state: LoanTimelineReducerModalState,
  payload:
    | LoanTimelineModalReducerCreateAction["payload"]
    | LoanTimelineModalReducerEditAction["payload"]
    | LoanTimelineModalReducerDeleteAction["payload"]
) => ReducerObject;

const reducerObject: ReducerObjectFn = (state, payload) => ({
  [ModalReducerActionTypes.RESET]: {
    ...state,
    ...payload,
  },
  [ModalReducerActionTypes.CREATE]: {
    ...state,
    header: "Add New Critical Date",
    cancelText: "Cancel",
    actionText: "Save Changes",
    modal: true,
    size: "normal",
    onCancel: initialState.onCancel,
    ...payload,
  },
  [ModalReducerActionTypes.EDIT]: {
    ...state,
    header: `Edit Critical Date: ${slicedTextWithEllipsis({
      text: payload?.item?.comment,
      maxLength: 20,
    })}`,
    cancelText: "Cancel Edition",
    actionText: "Save Edition",
    modal: true,
    size: "normal",
    onCancel: initialState.onCancel,
    ...payload,
  },
  [ModalReducerActionTypes.DELETE]: {
    ...state,
    header: `Delete Critical Date: ${slicedTextWithEllipsis({
      text: payload?.item?.comment,
      maxLength: 20,
    })}`,
    cancelText: "Cancel",
    actionText: "Delete Critical Date",
    modal: true,
    size: "smallest",
    onCancel: initialState.onCancel,
    ...payload,
  },
});

type Reducer = (
  state: LoanTimelineReducerModalState,
  action:
    | LoanTimelineModalReducerCreateAction
    | LoanTimelineModalReducerEditAction
    | LoanTimelineModalReducerDeleteAction
) => LoanTimelineReducerModalState;

const reducer: Reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type]
    ? reducerObject(state, action.payload)[action.type]
    : state;
};

export const useLoanTimelineModal = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createFile = (
    payload: LoanTimelineModalReducerCreateAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.CREATE, payload });
  };

  const editFile = (payload: LoanTimelineModalReducerEditAction["payload"]) => {
    dispatch({ type: ModalReducerActionTypes.EDIT, payload });
  };

  const resetModalState = () => {
    dispatch({ type: ModalReducerActionTypes.RESET, payload: initialState });
  };

  const deleteFile = (
    payload: LoanTimelineModalReducerDeleteAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.DELETE, payload });
  };

  return {
    state,
    createFile,
    editFile,
    resetModalState,
    deleteFile,
  };
};
