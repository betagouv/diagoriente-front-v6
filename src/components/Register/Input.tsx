import React, { FunctionComponent } from 'react';
import classNames from 'common/utils/classNames';
import TextField from '../design-system/TextField';
import InputWrapper from './InputWrapper';

type Props = {
  fullWidth?: boolean;
  isInvalid?: boolean | undefined;
  error?: any;
  selectShow?: boolean;
  withSelect?: any;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputRegister: FunctionComponent<Props> = ({
  isInvalid = undefined,
  required = false,
  fullWidth,
  selectShow = false,
  withSelect,
  error,
  ...rest
}) => {
  return (
    <InputWrapper fullWidth={fullWidth} withSelect={withSelect} selectShow={selectShow}>
      <TextField {...rest} isInvalid={isInvalid} />
    </InputWrapper>
  );
};

export default InputRegister;
