import { useReducer } from "react";
import { LocalDealRoomModalState } from "../types";
import { ModalProps } from "in-ui-react";

enum ModalReducerActionTypes {
  CREATE = "CREATE",
  EDIT = "EDIT",
  RESET = "RESET",
  DELETE = "DELETE",
}

type LocalDealRoomReducerModalState = LocalDealRoomModalState & {
  modal?: boolean;
  size?: ModalProps["size"];
};

interface LocalDealRoomModalReducerCreateAction {
  type: ModalReducerActionTypes;
  payload: LocalDealRoomReducerModalState;
}

interface LocalDealRoomModalReducerEditAction {
  type: ModalReducerActionTypes.EDIT;
  payload: Omit<LocalDealRoomReducerModalState, "item"> & {
    item: LocalDealRoomReducerModalState["item"];
  };
}

interface LocalDealRoomModalReducerDeleteAction {
  type: ModalReducerActionTypes.DELETE;
  payload: Omit<LocalDealRoomReducerModalState, "item"> & {
    item: LocalDealRoomReducerModalState["item"];
  };
}

const initialState: LocalDealRoomReducerModalState = {
  item: null,
  labels: null,
  Form: null,
  header: null,
  actionText: "Save",
  cancelText: "Cancel",
  size: "normal",
  onAction: () => null,
  onCancel: () => null,
  modal: false,
};

type ReducerObject = {
  [key in ModalReducerActionTypes]: LocalDealRoomReducerModalState;
};

type ReducerObjectFn = (
  state: LocalDealRoomReducerModalState,
  payload:
    | LocalDealRoomModalReducerCreateAction["payload"]
    | LocalDealRoomModalReducerEditAction["payload"]
    | LocalDealRoomModalReducerDeleteAction["payload"]
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
    header: `Edit file ${payload.item?.file[0]?.name}`,
    cancelText: "Cancel edition",
    actionText: "Save edition",
    modal: true,
    size: "normal",
    onCancel: initialState.onCancel,
    ...payload,
  },
  [ModalReducerActionTypes.DELETE]: {
    ...state,
    header: `Delete file ${payload.item?.file[0]?.name}`,
    cancelText: "Cancel",
    actionText: "Delete file",
    modal: true,
    size: "smallest",
    onCancel: initialState.onCancel,
    ...payload,
  },
});

type Reducer = (
  state: LocalDealRoomReducerModalState,
  action:
    | LocalDealRoomModalReducerCreateAction
    | LocalDealRoomModalReducerEditAction
    | LocalDealRoomModalReducerDeleteAction
) => LocalDealRoomReducerModalState;

const reducer: Reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type]
    ? reducerObject(state, action.payload)[action.type]
    : state;
};

export const useLocalDealRoomModal = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createFile = (
    payload: LocalDealRoomModalReducerCreateAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.CREATE, payload });
  };

  const editFile = (
    payload: LocalDealRoomModalReducerEditAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.EDIT, payload });
  };

  const resetModalState = () => {
    dispatch({ type: ModalReducerActionTypes.RESET, payload: initialState });
  };

  const deleteFile = (
    payload: LocalDealRoomModalReducerDeleteAction["payload"]
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
