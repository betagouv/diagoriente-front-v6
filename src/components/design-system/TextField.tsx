import React, { FunctionComponent, useState } from "react";
import { ReactComponent as HidePasswordIcon } from "assets/svg/hide_password.svg";
import { ReactComponent as ShowPasswordIcon } from "assets/svg/show_password.svg";
import { ReactComponent as InvalidIcon } from "assets/svg/validation_error.svg";
import { ReactComponent as ValidIcon } from "assets/svg/validation_ok.svg";
import clsx from "clsx";

export type TextFieldProps = {
  isInvalid?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField: FunctionComponent<TextFieldProps> = ({
                                                        isInvalid = null,
                                                        type = "text",
                                                        ...rest
                                                      }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputClasses = clsx([
    "w-full border rounded-md focus:ring-0 focus:outline-none",
    isInvalid === null && "border-lena-lightgray2 focus:border-lena-gray",
    isInvalid === true && "border-lena-pink-dark focus:border-lena-pink-dark text-lena-pink-dark",
    isInvalid === false && "border-lena-turquoise-dark focus:border-lena-turquoise-dark",
    (type === "password" || isInvalid !== null) && "pr-8"
  ]);

  return (
    <div className="w-full">
      <div className="relative flex justify-center items-center">
        <input className={inputClasses} type={type === "password" && showPassword ? "text" : type} {...rest} />
        <div className="absolute inset-y-0 right-2 flex items-center justify-center">
          {type === "password" && (
            <button type="button" className="focus:outline-none mr-2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <HidePasswordIcon className="fill-current text-lena-gray" />
              ) : (
                <ShowPasswordIcon className="fill-current text-lena-gray" />
              )}
            </button>
          )}
          {isInvalid === true && <InvalidIcon height={12} width={12} className="fill-current text-lena-pink-dark" />}
          {isInvalid === false && (
            <ValidIcon height={12} width={12} className="fill-current text-lena-turquoise-dark" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TextField;
