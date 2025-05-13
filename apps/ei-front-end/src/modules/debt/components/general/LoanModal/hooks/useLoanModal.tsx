import { useReducer } from "react";
import { LoanModalState } from "../types";
import { ModalProps } from "in-ui-react";

enum ModalReducerActionTypes {
  CREATE = "CREATE",
  EDIT = "EDIT",
  RESET = "RESET",
  DELETE = "DELETE",
}

type LoanModalReducerModalState = LoanModalState & {
  modal?: boolean;
  size?: ModalProps["size"];
};

interface LoanModalModalReducerCreateAction {
  type: ModalReducerActionTypes;
  payload: LoanModalReducerModalState;
}

interface LoanModalModalReducerEditAction {
  type: ModalReducerActionTypes.EDIT;
  payload: LoanModalReducerModalState;
}

interface LoanModalModalReducerDeleteAction {
  type: ModalReducerActionTypes.DELETE;
  payload: LoanModalReducerModalState;
}

const initialState: LoanModalReducerModalState = {
  item: null,
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
  [key in ModalReducerActionTypes]: LoanModalReducerModalState;
};

type ReducerObjectFn = (
  state: LoanModalReducerModalState,
  payload:
    | LoanModalModalReducerCreateAction["payload"]
    | LoanModalModalReducerEditAction["payload"]
    | LoanModalModalReducerDeleteAction["payload"]
) => ReducerObject;

const reducerObject: ReducerObjectFn = (state, payload) => ({
  [ModalReducerActionTypes.RESET]: {
    ...state,
    ...payload,
  },
  [ModalReducerActionTypes.CREATE]: {
    ...state,
    header: "Add Loan",
    cancelText: "Cancel",
    actionText: "Save",
    modal: true,
    size: "big",
    onCancel: initialState.onCancel,
    ...payload,
  },
  [ModalReducerActionTypes.EDIT]: {
    ...state,
    header: "Edit Loan",
    cancelText: "Cancel",
    actionText: "Save",
    modal: true,
    size: "big",
    onCancel: initialState.onCancel,
    ...payload,
  },
  [ModalReducerActionTypes.DELETE]: {
    ...state,
    header: "Delete Loan",
    cancelText: "Cancel",
    actionText: "Delete Loan",
    modal: true,
    size: "smallest",
    onCancel: initialState.onCancel,
    ...payload,
  },
});

type Reducer = (
  state: LoanModalReducerModalState,
  action:
    | LoanModalModalReducerCreateAction
    | LoanModalModalReducerEditAction
    | LoanModalModalReducerDeleteAction
) => LoanModalReducerModalState;

const reducer: Reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type]
    ? reducerObject(state, action.payload)[action.type]
    : state;
};

export const useLoanModal = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createLoan = (
    payload: LoanModalModalReducerCreateAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.CREATE, payload });
  };

  const editLoan = (payload: LoanModalModalReducerEditAction["payload"]) => {
    dispatch({ type: ModalReducerActionTypes.EDIT, payload });
  };

  const resetModalState = () => {
    dispatch({ type: ModalReducerActionTypes.RESET, payload: initialState });
  };

  const deleteLoan = (
    payload: LoanModalModalReducerDeleteAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.DELETE, payload });
  };

  return {
    state,
    resetModalState,
    createLoan,
    editLoan,
    deleteLoan,
  };
};
