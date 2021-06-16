import { createContext, Dispatch } from 'react';

export type SnackbarVariant = 'info' | 'error' | 'warning' | 'success';

export enum SnackBarActionType {
  open = 'OPEN',
  close = 'CLOSE',
}

export const snackbarState = {
  open: false,
  message: '',
  variant: 'info' as SnackbarVariant,
};

type SnackBarActions =
  | { type: SnackBarActionType.open; message: string; variant?: SnackbarVariant }
  | { type: SnackBarActionType.close };

export const snackbarReducer = (state: typeof snackbarState, action: SnackBarActions) => {
  switch (action.type) {
    case SnackBarActionType.open:
      return {
        ...state,
        open: true,
        message: action.message,
        variant: action.variant || 'info',
      };
    case SnackBarActionType.close:
      return { ...snackbarState };
    default:
      return state;
  }
};

export default createContext({ state: snackbarState, dispatch: (() => {}) as Dispatch<SnackBarActions> });
