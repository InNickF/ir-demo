import { useReducer } from "react";
import { PropertyTimelineModalState } from "../components/PropertyTimelineModal/types";
import { ModalProps } from "in-ui-react";
import { slicedTextWithEllipsis } from "@/commons/model-in/formatters/utils";

enum ModalReducerActionTypes {
  CREATE = "CREATE",
  EDIT = "EDIT",
  RESET = "RESET",
  DELETE = "DELETE",
}

type PropertyTimelineReducerModalState = PropertyTimelineModalState & {
  modal?: boolean;
  size?: ModalProps["size"];
};

interface PropertyTimelineModalReducerCreateAction {
  type: ModalReducerActionTypes;
  payload: PropertyTimelineReducerModalState;
}

interface PropertyTimelineModalReducerEditAction {
  type: ModalReducerActionTypes.EDIT;
  payload: Omit<PropertyTimelineReducerModalState, "item"> & {
    item: PropertyTimelineReducerModalState["item"];
  };
}

interface PropertyTimelineModalReducerDeleteAction {
  type: ModalReducerActionTypes.DELETE;
  payload: Omit<PropertyTimelineReducerModalState, "item"> & {
    item: PropertyTimelineReducerModalState["item"];
  };
}

const initialState: PropertyTimelineReducerModalState = {
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
  [key in ModalReducerActionTypes]: PropertyTimelineReducerModalState;
};

type ReducerObjectFn = (
  state: PropertyTimelineReducerModalState,
  payload:
    | PropertyTimelineModalReducerCreateAction["payload"]
    | PropertyTimelineModalReducerEditAction["payload"]
    | PropertyTimelineModalReducerDeleteAction["payload"]
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
  state: PropertyTimelineReducerModalState,
  action:
    | PropertyTimelineModalReducerCreateAction
    | PropertyTimelineModalReducerEditAction
    | PropertyTimelineModalReducerDeleteAction
) => PropertyTimelineReducerModalState;

const reducer: Reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type]
    ? reducerObject(state, action.payload)[action.type]
    : state;
};

export const usePropertyTimelineModal = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createFile = (
    payload: PropertyTimelineModalReducerCreateAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.CREATE, payload });
  };

  const editFile = (
    payload: PropertyTimelineModalReducerEditAction["payload"]
  ) => {
    dispatch({ type: ModalReducerActionTypes.EDIT, payload });
  };

  const resetModalState = () => {
    dispatch({ type: ModalReducerActionTypes.RESET, payload: initialState });
  };

  const deleteFile = (
    payload: PropertyTimelineModalReducerDeleteAction["payload"]
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
