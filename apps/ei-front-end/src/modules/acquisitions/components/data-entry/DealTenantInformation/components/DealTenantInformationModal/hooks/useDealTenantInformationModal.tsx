import { useReducer } from "react";
import { DealTenantInformationModalState } from "../types";
import { ModalProps } from "in-ui-react";

enum ModalReducerActionTypes {
  VIEW = "VIEW",
  CREATE = "CREATE",
  EDIT = "EDIT",
  RESET = "RESET",
  DELETE = "DELETE",
}

type DealTenantInformationReducerModalState =
  DealTenantInformationModalState & {
    modal?: boolean;
    size?: ModalProps["size"];
  };

interface DealTenantInformationModalReducerViewAction {
  type: ModalReducerActionTypes.VIEW;
  payload: Omit<DealTenantInformationReducerModalState, "item"> & {
    item: DealTenantInformationReducerModalState["item"];
  };
}
interface DealTenantInformationModalReducerCreateAction {
  type: ModalReducerActionTypes;
  payload: DealTenantInformationReducerModalState;
}

interface DealTenantInformationModalReducerEditAction {
  type: ModalReducerActionTypes.EDIT;
  payload: Omit<DealTenantInformationReducerModalState, "item"> & {
    item: DealTenantInformationReducerModalState["item"];
  };
}

interface DealTenantInformationModalReducerDeleteAction {
  type: ModalReducerActionTypes.DELETE;
  payload: Omit<DealTenantInformationReducerModalState, "item"> & {
    item: DealTenantInformationReducerModalState["item"];
  };
}

const initialState: DealTenantInformationReducerModalState = {
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
  [key in ModalReducerActionTypes]: DealTenantInformationReducerModalState;
};

type ReducerObjectFn = (
  state: DealTenantInformationReducerModalState,
  payload:
    | DealTenantInformationModalReducerCreateAction["payload"]
    | DealTenantInformationModalReducerEditAction["payload"]
    | DealTenantInformationModalReducerDeleteAction["payload"]
) => ReducerObject;

const reducerObject: ReducerObjectFn = (state, payload) => ({
  [ModalReducerActionTypes.RESET]: {
    ...state,
    ...payload,
  },
  [ModalReducerActionTypes.VIEW]: {
    ...state,
    header: `Tenant: ${payload.item?.name}`,
    cancelText: "Close",
    modal: true,
    size: "big",
    onCancel: initialState.onCancel,
    ...payload,
  },
  [ModalReducerActionTypes.CREATE]: {
    ...state,
    header: "Create Tenant Information",
    cancelText: "Cancel",
    actionText: "Save",
    modal: true,
    size: "big",
    onCancel: initialState.onCancel,
    ...payload,
  },
  [ModalReducerActionTypes.EDIT]: {
    ...state,
    header: `Editing Tenant: ${payload.item?.name}`,
    cancelText: "Cancel",
    actionText: "Save changes",
    modal: true,
    size: "big",
    onCancel: initialState.onCancel,
    ...payload,
  },
  [ModalReducerActionTypes.DELETE]: {
    ...state,
    header: `Deleting Tenant: ${payload.item?.name}`,
    cancelText: "Cancel",
    actionText: "Delete",
    modal: true,
    size: "small",
    onCancel: initialState.onCancel,
    ...payload,
  },
});

type Reducer = (
  state: DealTenantInformationReducerModalState,
  action:
    | DealTenantInformationModalReducerViewAction
    | DealTenantInformationModalReducerCreateAction
    | DealTenantInformationModalReducerEditAction
    | DealTenantInformationModalReducerDeleteAction
) => DealTenantInformationReducerModalState;

const reducer: Reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type]
    ? reducerObject(state, action.payload)[action.type]
    : state;
};

export const useDealTenantInformationModal = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const viewTenantInformation = (
    payload: DealTenantInformationModalReducerViewAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.VIEW, payload });
  };

  const createTenantInformation = (
    payload: DealTenantInformationModalReducerCreateAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.CREATE, payload });
  };

  const editTenantInformation = (
    payload: DealTenantInformationModalReducerEditAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.EDIT, payload });
  };

  const resetModalState = () => {
    dispatch({ type: ModalReducerActionTypes.RESET, payload: initialState });
  };

  const deleteTenantInformation = (
    payload: DealTenantInformationModalReducerDeleteAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.DELETE, payload });
  };

  return {
    state,
    viewTenantInformation,
    createTenantInformation,
    editTenantInformation,
    resetModalState,
    deleteTenantInformation,
  };
};
