import { useReducer } from "react";
import { DealRisksAndMitigantsModalState } from "../types";
import { ModalProps } from "in-ui-react";
import { slicedTextWithEllipsis } from "@/commons/model-in/formatters/utils";

enum ModalReducerActionTypes {
  VIEW = "VIEW",
  CREATE = "CREATE",
  EDIT = "EDIT",
  RESET = "RESET",
  DELETE = "DELETE",
}

type DealRisksAndMitigantsReducerModalState =
  DealRisksAndMitigantsModalState & {
    modal?: boolean;
    size?: ModalProps["size"];
  };

interface DealRisksAndMitigantsModalReducerViewAction {
  type: ModalReducerActionTypes.VIEW;
  payload: Omit<DealRisksAndMitigantsReducerModalState, "item"> & {
    item: DealRisksAndMitigantsReducerModalState["item"];
  };
}
interface DealRisksAndMitigantsModalReducerCreateAction {
  type: ModalReducerActionTypes;
  payload: DealRisksAndMitigantsReducerModalState;
}

interface DealRisksAndMitigantsModalReducerEditAction {
  type: ModalReducerActionTypes.EDIT;
  payload: Omit<DealRisksAndMitigantsReducerModalState, "item"> & {
    item: DealRisksAndMitigantsReducerModalState["item"];
  };
}

interface DealRisksAndMitigantsModalReducerDeleteAction {
  type: ModalReducerActionTypes.DELETE;
  payload: Omit<DealRisksAndMitigantsReducerModalState, "item"> & {
    item: DealRisksAndMitigantsReducerModalState["item"];
  };
}

const initialState: DealRisksAndMitigantsReducerModalState = {
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
  [key in ModalReducerActionTypes]: DealRisksAndMitigantsReducerModalState;
};

type ReducerObjectFn = (
  state: DealRisksAndMitigantsReducerModalState,
  payload:
    | DealRisksAndMitigantsModalReducerCreateAction["payload"]
    | DealRisksAndMitigantsModalReducerEditAction["payload"]
    | DealRisksAndMitigantsModalReducerDeleteAction["payload"]
) => ReducerObject;

const reducerObject: ReducerObjectFn = (state, payload) => ({
  [ModalReducerActionTypes.RESET]: {
    ...state,
    ...payload,
  },
  [ModalReducerActionTypes.VIEW]: {
    ...state,
    header: `Risk: ${slicedTextWithEllipsis({
      text: payload.item?.risk,
      maxLength: 130,
    })}`,
    cancelText: "Close",
    modal: true,
    size: "big",
    onCancel: initialState.onCancel,
    ...payload,
  },
  [ModalReducerActionTypes.CREATE]: {
    ...state,
    header: "Create Risk and Mitigant",
    cancelText: "Cancel",
    actionText: "Save",
    modal: true,
    size: "big",
    onCancel: initialState.onCancel,
    ...payload,
  },
  [ModalReducerActionTypes.EDIT]: {
    ...state,
    header: `Editing Risk: ${slicedTextWithEllipsis({
      text: payload.item?.risk,
      maxLength: 130,
    })}`,
    cancelText: "Cancel",
    actionText: "Save changes",
    modal: true,
    size: "big",
    onCancel: initialState.onCancel,
    ...payload,
  },
  [ModalReducerActionTypes.DELETE]: {
    ...state,
    header: `Deleting Risk: ${slicedTextWithEllipsis({
      text: payload.item?.risk,
      maxLength: 80,
    })}`,
    cancelText: "Cancel",
    actionText: "Delete",
    modal: true,
    size: "normal",
    onCancel: initialState.onCancel,
    ...payload,
  },
});

type Reducer = (
  state: DealRisksAndMitigantsReducerModalState,
  action:
    | DealRisksAndMitigantsModalReducerViewAction
    | DealRisksAndMitigantsModalReducerCreateAction
    | DealRisksAndMitigantsModalReducerEditAction
    | DealRisksAndMitigantsModalReducerDeleteAction
) => DealRisksAndMitigantsReducerModalState;

const reducer: Reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type]
    ? reducerObject(state, action.payload)[action.type]
    : state;
};

export const useDealRisksAndMitigantsModal = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const viewRiskAndMitigant = (
    payload: DealRisksAndMitigantsModalReducerViewAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.VIEW, payload });
  };

  const createRiskAndMitigant = (
    payload: DealRisksAndMitigantsModalReducerCreateAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.CREATE, payload });
  };

  const editRiskAndMitigant = (
    payload: DealRisksAndMitigantsModalReducerEditAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.EDIT, payload });
  };

  const resetModalState = () => {
    dispatch({ type: ModalReducerActionTypes.RESET, payload: initialState });
  };

  const deleteRiskAndMitigant = (
    payload: DealRisksAndMitigantsModalReducerDeleteAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.DELETE, payload });
  };

  return {
    state,
    viewRiskAndMitigant,
    createRiskAndMitigant,
    editRiskAndMitigant,
    resetModalState,
    deleteRiskAndMitigant,
  };
};
