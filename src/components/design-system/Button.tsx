import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import classNames from 'common/utils/classNames';

export type ButtonProps = {
  size?: 'sm' | 'normal' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline-light';
  fullWidth?: boolean;
  mobileStacked?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary: [
    'bg-lena-pink-dark hover:bg-lena-pink-darkest border border-transparent text-white',
    'disabled:hover:bg-lena-pink-dark',
  ],
  secondary: [
    'bg-lena-blue hover:bg-lena-blue-dark border border-transparent text-white',
    'disabled:hover:bg-lena-blue',
  ],
  'outline-light': [
    'bg-lena-white border border-lena-lightgray2 text-lena-blue-dark font-bold hover:bg-lena-lightgray',
  ],
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  normal: 'px-4 py-2',
  md: 'px-4 md:px-24 py-3 text-lg md:text-md',
  lg: 'px-4 md:px-32 py-3 text-lg',
};

const Button: FunctionComponent<ButtonProps> = ({
  variant,
  size = 'normal',
  fullWidth = false,
  mobileStacked = false,
  children,
  className,
  ...rest
}) => {
  const classes = classNames([
    'md:rounded font-bold focus:outline-none focus:ring-0',
    'disabled:cursor-default disabled:opacity-50',
    variant && variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    mobileStacked && 'fixed bottom-0 left-0 right-0 w-full md:w-auto md:static',
  ]);
  return (
    <button className={classes} {...rest}>
      <div className="flex flex-row items-center justify-center space-x-2">{children}</div>
    </button>
  );
};

export default Button;
