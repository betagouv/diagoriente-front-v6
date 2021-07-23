import React, { FunctionComponent, InputHTMLAttributes } from 'react';

type Props = {
  label: string | React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const RadioButton: FunctionComponent<Props> = ({ label, required, ...rest }: Props) => {
  return (
    <div>
      <label className="cursor-pointer flex gap-x-4 items-center">
        <input
          type="radio"
          className="cursor-pointer h-4 w-4 text-lena-blue-dark focus:ring-0"
          required={required}
          {...rest}
        />
        <span>
          {label}
          {required && <span className="ml-1">*</span>}
        </span>
      </label>
    </div>
  );
};

export default RadioButton;
