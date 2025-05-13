import { useReducer } from "react";
import { CompModalState } from "../types";
import { ModalProps } from "in-ui-react";

enum ModalReducerActionTypes {
  CREATE = "CREATE",
  EDIT = "EDIT",
  RESET = "RESET",
  DELETE = "DELETE",
}

type CompReducerModalState = CompModalState & {
  modal?: boolean;
  size?: ModalProps["size"];
};

interface CompModalReducerCreateAction {
  type: ModalReducerActionTypes;
  payload: CompReducerModalState;
}

interface CompModalReducerEditAction {
  type: ModalReducerActionTypes.EDIT;
  payload: Omit<CompReducerModalState, "comp"> & {
    comp: CompReducerModalState["comp"];
  };
}

interface CompModalReducerDeleteAction {
  type: ModalReducerActionTypes.DELETE;
  payload: Omit<CompReducerModalState, "comp"> & {
    comp: CompReducerModalState["comp"];
  };
}

const initialState: CompReducerModalState = {
  comp: null,
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
  [key in ModalReducerActionTypes]: CompReducerModalState;
};

type ReducerObjectFn = (
  state: CompReducerModalState,
  payload:
    | CompModalReducerCreateAction["payload"]
    | CompModalReducerEditAction["payload"]
    | CompModalReducerDeleteAction["payload"]
) => ReducerObject;

const reducerObject: ReducerObjectFn = (state, payload) => ({
  [ModalReducerActionTypes.RESET]: {
    ...state,
    ...payload,
  },
  [ModalReducerActionTypes.CREATE]: {
    ...state,
    header: "Create new comp",
    cancelText: "Cancel",
    actionText: "Create comp",
    modal: true,
    size: "normal",
    onCancel: initialState.onCancel,
    ...payload,
  },
  [ModalReducerActionTypes.EDIT]: {
    ...state,
    header: `Edit Comp ${payload.comp?.address}`,
    cancelText: "Cancel edition",
    actionText: "Save edition",
    modal: true,
    size: "normal",
    onCancel: initialState.onCancel,
    ...payload,
  },
  [ModalReducerActionTypes.DELETE]: {
    ...state,
    header: `Delete Comp ${payload.comp?.address}`,
    cancelText: "Cancel",
    actionText: "Delete comp",
    modal: true,
    size: "smallest",
    onCancel: initialState.onCancel,
    ...payload,
  },
});

type Reducer = (
  state: CompReducerModalState,
  action:
    | CompModalReducerCreateAction
    | CompModalReducerEditAction
    | CompModalReducerDeleteAction
) => CompReducerModalState;

const reducer: Reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type]
    ? reducerObject(state, action.payload)[action.type]
    : state;
};

export const useCompModal = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createComp = (payload: CompModalReducerCreateAction["payload"]) => {
    dispatch({ type: ModalReducerActionTypes.CREATE, payload });
  };

  const editComp = (payload: CompModalReducerEditAction["payload"]) => {
    dispatch({ type: ModalReducerActionTypes.EDIT, payload });
  };

  const resetModalState = () => {
    dispatch({ type: ModalReducerActionTypes.RESET, payload: initialState });
  };

  const deleteComp = (payload: CompModalReducerDeleteAction["payload"]) => {
    dispatch({ type: ModalReducerActionTypes.DELETE, payload });
  };

  return {
    state,
    createComp,
    editComp,
    resetModalState,
    deleteComp,
  };
};
