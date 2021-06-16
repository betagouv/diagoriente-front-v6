import { useContext } from 'react';
import SnackbarContext, { SnackBarActionType, SnackbarVariant } from 'common/contexts/SnackbarContext';

export default () => {
  const { dispatch } = useContext(SnackbarContext);

  const open = (message: string, variant?: SnackbarVariant) => {
    dispatch({ type: SnackBarActionType.open, message, variant });
  };
  const close = () => {
    dispatch({ type: SnackBarActionType.close });
  };

  return { open, close };
};
