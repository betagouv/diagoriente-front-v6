import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import classNames from 'common/utils/classNames';

export type ButtonProps = {
  size?: 'sm' | 'normal' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
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
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  normal: 'px-4 py-2',
  md: 'px-24 py-3 text-md',
  lg: 'px-32 py-3 text-lg',
};

const Button: FunctionComponent<ButtonProps> = ({
  variant,
  size = 'normal',
  fullWidth = false,
  children,
  className,
  ...rest
}) => {
  const classes = classNames([
    'rounded font-bold focus:outline-none focus:ring-0',
    'disabled:cursor-default disabled:opacity-50',
    variant && variants[variant],
    sizes[size],
    fullWidth && 'w-full',
  ]);
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
