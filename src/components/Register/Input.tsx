import React, { FunctionComponent } from 'react';
import classNames from 'clsx';
import TextField from "../design-system/TextField";

type Props = {
  fullWidth?: boolean;
  isInvalid?: boolean | undefined;
  error?: any;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputRegister: FunctionComponent<Props> = ({
  isInvalid = undefined,
  required = false,
  fullWidth,
  error,
  ...rest
}) => {

  return (
    <div
      className={classNames(
        'md:flex-grow',
        !fullWidth && 'lg:max-w-58p md:max-w69p',
        !fullWidth && 'lg:w-58p md:w-69p',
      )}
    >
      <div className="md:flex relative items-center">
        <div className="w-full">
          <div className={classNames('relative', fullWidth ? 'w-full' : 'lg:w-2/4 md:w-4/5')}>
            <TextField {...rest} isInvalid={isInvalid} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputRegister;
