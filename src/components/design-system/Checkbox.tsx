import React, { FunctionComponent, InputHTMLAttributes } from 'react';

type Props = {
  label: string | React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox: FunctionComponent<Props> = ({ label, required, ...rest }: Props) => {
  return (
    <div>
      <label className="cursor-pointer flex gap-x-4 items-center">
        <input
          type="checkbox"
          className="cursor-pointer rounded h-6 w-6 text-lena-turquoise-dark focus:ring-0"
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

export default Checkbox;
