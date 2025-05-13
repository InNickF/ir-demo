import { useReducer } from "react";
import { DealRoomModalState } from "../types";
import { ModalProps } from "in-ui-react";

enum ModalReducerActionTypes {
  CREATE = "CREATE",
  EDIT = "EDIT",
  RESET = "RESET",
  DELETE = "DELETE",
}

type DealRoomReducerModalState = DealRoomModalState & {
  modal?: boolean;
  size?: ModalProps["size"];
};

interface DealRoomModalReducerCreateAction {
  type: ModalReducerActionTypes;
  payload: DealRoomReducerModalState;
}

interface DealRoomModalReducerEditAction {
  type: ModalReducerActionTypes.EDIT;
  payload: Omit<DealRoomReducerModalState, "item"> & {
    item: DealRoomReducerModalState["item"];
  };
}

interface DealRoomModalReducerDeleteAction {
  type: ModalReducerActionTypes.DELETE;
  payload: Omit<DealRoomReducerModalState, "item"> & {
    item: DealRoomReducerModalState["item"];
  };
}

const initialState: DealRoomReducerModalState = {
  item: null,
  labels: null,
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
  [key in ModalReducerActionTypes]: DealRoomReducerModalState;
};

type ReducerObjectFn = (
  state: DealRoomReducerModalState,
  payload:
    | DealRoomModalReducerCreateAction["payload"]
    | DealRoomModalReducerEditAction["payload"]
    | DealRoomModalReducerDeleteAction["payload"]
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
  state: DealRoomReducerModalState,
  action:
    | DealRoomModalReducerCreateAction
    | DealRoomModalReducerEditAction
    | DealRoomModalReducerDeleteAction
) => DealRoomReducerModalState;

const reducer: Reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type]
    ? reducerObject(state, action.payload)[action.type]
    : state;
};

export const useDealRoomModal = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createFile = (payload: DealRoomModalReducerCreateAction["payload"]) => {
    dispatch({ type: ModalReducerActionTypes.CREATE, payload });
  };

  const editFile = (payload: DealRoomModalReducerEditAction["payload"]) => {
    dispatch({ type: ModalReducerActionTypes.EDIT, payload });
  };

  const resetModalState = () => {
    dispatch({ type: ModalReducerActionTypes.RESET, payload: initialState });
  };

  const deleteFile = (payload: DealRoomModalReducerDeleteAction["payload"]) => {
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
