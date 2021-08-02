import React, { FunctionComponent, ReactNode, useState } from 'react';
import { ReactComponent as HidePasswordIcon } from 'assets/svg/hide_password.svg';
import { ReactComponent as ShowPasswordIcon } from 'assets/svg/show_password.svg';
import { ReactComponent as InvalidIcon } from 'assets/svg/validation_error.svg';
import classNames from 'common/utils/classNames';

export type TextFieldProps = {
  isInvalid?: boolean;
  icon?: ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField: FunctionComponent<TextFieldProps> = ({ isInvalid = null, type = 'text', icon, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputClasses = classNames([
    'w-full border rounded-md focus:ring-0 focus:outline-none',
    !isInvalid && 'border-lena-lightgray2 focus:border-lena-gray',
    isInvalid === true && 'border-lena-pink-dark focus:border-lena-pink-dark text-lena-pink-dark',
    // TODO: find a way to display both valid/invalid/neutral
    // isInvalid === false && "border-lena-turquoise-dark focus:border-lena-turquoise-dark",
    (type === 'password' || isInvalid !== null) && 'pr-8',
    icon && 'pl-8',
  ]);

  return (
    <div className="w-full">
      <div className="relative flex justify-center items-center">
        {icon && <div className="absolute inset-y-0 left-2 flex items-center justify-center">{icon}</div>}
        <input className={inputClasses} type={type === 'password' && showPassword ? 'text' : type} {...rest} />
        <div className="absolute inset-y-0 right-2 flex items-center justify-center">
          {type === 'password' && (
            <button type="button" className="focus:outline-none mr-2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <HidePasswordIcon className="fill-current text-lena-gray" />
              ) : (
                <ShowPasswordIcon className="fill-current text-lena-gray" />
              )}
            </button>
          )}
          {isInvalid === true && <InvalidIcon height={12} width={12} className="fill-current text-lena-pink-dark" />}
          {/* TODO: find a way to display both valid/invalid/neutral */}
          {/* isInvalid === false && (
            <ValidIcon height={12} width={12} className="fill-current text-lena-turquoise-dark" />
          ) */}
        </div>
      </div>
    </div>
  );
};

export default TextField;
