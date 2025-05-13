import { useReducer } from "react";
import { ModalProps } from "in-ui-react";
import { slicedTextWithEllipsis } from "@/commons/model-in/formatters/utils";
import { FundCriticalDatesModalState } from "../components/FundCriticalDatesModal/types";

enum ModalReducerActionTypes {
  CREATE = "CREATE",
  EDIT = "EDIT",
  RESET = "RESET",
  DELETE = "DELETE",
}

type FundCriticalDatesReducerModalState = FundCriticalDatesModalState & {
  modal?: boolean;
  size?: ModalProps["size"];
};

interface FundCriticalDatesModalReducerCreateAction {
  type: ModalReducerActionTypes;
  payload: FundCriticalDatesReducerModalState;
}

interface FundCriticalDatesModalReducerEditAction {
  type: ModalReducerActionTypes.EDIT;
  payload: Omit<FundCriticalDatesReducerModalState, "item"> & {
    item: FundCriticalDatesReducerModalState["item"];
  };
}

interface FundCriticalDatesModalReducerDeleteAction {
  type: ModalReducerActionTypes.DELETE;
  payload: Omit<FundCriticalDatesReducerModalState, "item"> & {
    item: FundCriticalDatesReducerModalState["item"];
  };
}

const initialState: FundCriticalDatesReducerModalState = {
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
  [key in ModalReducerActionTypes]: FundCriticalDatesReducerModalState;
};

type ReducerObjectFn = (
  state: FundCriticalDatesReducerModalState,
  payload:
    | FundCriticalDatesModalReducerCreateAction["payload"]
    | FundCriticalDatesModalReducerEditAction["payload"]
    | FundCriticalDatesModalReducerDeleteAction["payload"]
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
      text: slicedTextWithEllipsis({
        text: payload?.item?.comment,
        maxLength: 20,
      }),
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
      text: slicedTextWithEllipsis({
        text: payload?.item?.comment,
        maxLength: 20,
      }),
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
  state: FundCriticalDatesReducerModalState,
  action:
    | FundCriticalDatesModalReducerCreateAction
    | FundCriticalDatesModalReducerEditAction
    | FundCriticalDatesModalReducerDeleteAction
) => FundCriticalDatesReducerModalState;

const reducer: Reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type]
    ? reducerObject(state, action.payload)[action.type]
    : state;
};

export const useFundCriticalDatesModal = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createFile = (
    payload: FundCriticalDatesModalReducerCreateAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.CREATE, payload });
  };

  const editFile = (
    payload: FundCriticalDatesModalReducerEditAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.EDIT, payload });
  };

  const resetModalState = () => {
    dispatch({ type: ModalReducerActionTypes.RESET, payload: initialState });
  };

  const deleteFile = (
    payload: FundCriticalDatesModalReducerDeleteAction["payload"]
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
