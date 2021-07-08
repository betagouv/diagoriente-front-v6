import React, { FunctionComponent } from 'react';
import classNames from 'common/utils/classNames';
import TextField from '../design-system/TextField';

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
    <div
      className={classNames(
        'md:flex-grow',
        !fullWidth && 'lg:max-w-58p md:max-w69p',
        !fullWidth && 'lg:w-58p md:w-69p',
        fullWidth && 'w-full',
      )}
    >
      <div className="md:flex relative items-center">
        <div className="w-full">
          <div className={classNames('relative', fullWidth ? 'w-full' : '2xl:w-1/2 lg:w-3/4 md:w-4/5')}>
            <TextField {...rest} isInvalid={isInvalid} />
            {withSelect && selectShow && (
              <div
                className={`absolute z-30 bg-white w-full mt-1 border
              border-lena-lightgray2 rounded-md overflow-y-auto max-h-80`}
              >
                <ul>{withSelect}</ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputRegister;
