import { useReducer } from "react";
import { LoanRoomModalState } from "../types";
import { ModalProps } from "in-ui-react";

enum ModalReducerActionTypes {
  CREATE = "CREATE",
  EDIT = "EDIT",
  RESET = "RESET",
  DELETE = "DELETE",
}

type LoanRoomReducerModalState = LoanRoomModalState & {
  modal?: boolean;
  size?: ModalProps["size"];
};

interface LoanRoomModalReducerCreateAction {
  type: ModalReducerActionTypes;
  payload: LoanRoomReducerModalState;
}

interface LoanRoomModalReducerEditAction {
  type: ModalReducerActionTypes.EDIT;
  payload: Omit<LoanRoomReducerModalState, "item"> & {
    item: LoanRoomReducerModalState["item"];
  };
}

interface LoanRoomModalReducerDeleteAction {
  type: ModalReducerActionTypes.DELETE;
  payload: Omit<LoanRoomReducerModalState, "item"> & {
    item: LoanRoomReducerModalState["item"];
  };
}

const initialState: LoanRoomReducerModalState = {
  item: null,
  type: null,
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
  [key in ModalReducerActionTypes]: LoanRoomReducerModalState;
};

type ReducerObjectFn = (
  state: LoanRoomReducerModalState,
  payload:
    | LoanRoomModalReducerCreateAction["payload"]
    | LoanRoomModalReducerEditAction["payload"]
    | LoanRoomModalReducerDeleteAction["payload"]
) => ReducerObject;

const reducerObject: ReducerObjectFn = (state, payload) => ({
  [ModalReducerActionTypes.RESET]: {
    ...state,
    ...payload,
  },
  [ModalReducerActionTypes.CREATE]: {
    ...state,
    header: "Upload new file",
    cancelText: "Cancel",
    actionText: "Upload file",
    modal: true,
    size: "normal",
    onCancel: initialState.onCancel,
    ...payload,
  },
  [ModalReducerActionTypes.EDIT]: {
    ...state,
    header: `Edit file ${payload.item?.name}`,
    cancelText: "Cancel edition",
    actionText: "Save edition",
    modal: true,
    size: "normal",
    onCancel: initialState.onCancel,
    ...payload,
  },
  [ModalReducerActionTypes.DELETE]: {
    ...state,
    header: `Delete file ${payload.item?.name}`,
    cancelText: "Cancel",
    actionText: "Delete file",
    modal: true,
    size: "smallest",
    onCancel: initialState.onCancel,
    ...payload,
  },
});

type Reducer = (
  state: LoanRoomReducerModalState,
  action:
    | LoanRoomModalReducerCreateAction
    | LoanRoomModalReducerEditAction
    | LoanRoomModalReducerDeleteAction
) => LoanRoomReducerModalState;

const reducer: Reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type]
    ? reducerObject(state, action.payload)[action.type]
    : state;
};

export const useLoanRoomModal = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createFile = (payload: LoanRoomModalReducerCreateAction["payload"]) => {
    dispatch({ type: ModalReducerActionTypes.CREATE, payload });
  };

  const editFile = (payload: LoanRoomModalReducerEditAction["payload"]) => {
    dispatch({ type: ModalReducerActionTypes.EDIT, payload });
  };

  const resetModalState = () => {
    dispatch({ type: ModalReducerActionTypes.RESET, payload: initialState });
  };

  const deleteFile = (payload: LoanRoomModalReducerDeleteAction["payload"]) => {
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
