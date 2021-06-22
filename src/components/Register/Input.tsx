import React, { FunctionComponent, useState } from "react";
import ShowPasswordIcon from "assets/svg/show_password.svg";
import HidePasswordIcon from "assets/svg/hide_password.svg";
import CheckIcon from "assets/svg/check.svg";
import Cross2Icon from "assets/svg/cross2.svg";
import classNames from "clsx";

type Props = {
  fullWidth?: boolean;
  isInvalid?: boolean | null;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputRegister: FunctionComponent<Props> = ({
  isInvalid = null,
  type = "text",
  required = false,
  fullWidth,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={classNames(
        "md:flex-grow",
        !fullWidth && "lg:max-w-58p md:max-w69p",
        !fullWidth && "lg:w-58p md:w-69p"
      )}
    >
      <div className="md:flex relative items-center">
        <div className="w-full">
          <div className={classNames("relative", fullWidth ? "w-full" : "lg:w-2/4 md:w-4/5")}>
            <input
              className={classNames(
                isInvalid === null && "border-lena-lightgray2 focus:border-lena-gray",
                isInvalid === true && "border-lena-pink-dark focus:border-lena-pink-dark text-lena-pink-dark",
                isInvalid === false && "border-lena-turquoise-dark focus:border-lena-turquoise-dark",
                "w-full border rounded-md focus:outline-none focus:ring-0 text-lg",
                type === "password" ? (isInvalid ? "pr-12" : "pr-9") : "pr-7"
              )}
              type={type === "password" ? (showPassword ? "text" : "password") : type}
              required={required}
              {...rest}
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none">
              {type === "password" && (
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="mr-1">
                  {showPassword ? <img alt="Hide Icon" src={HidePasswordIcon} /> : <img alt="Show Icon" src={ShowPasswordIcon} />}
                </button>
              )}
              {isInvalid === null ? <></> : isInvalid ? <img src={Cross2Icon} alt="Cross Icon" /> : <img alt="Check Icon" src={CheckIcon} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputRegister;
