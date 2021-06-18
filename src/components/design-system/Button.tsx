import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import clsx from 'clsx';

export type ButtonProps = {
  size?: 'normal' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
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
  normal: 'px-4 py-2',
  md: 'px-24 py-3 text-md',
  lg: 'px-32 py-3 text-lg',
};

const Button: FunctionComponent<ButtonProps> = ({ variant, size = 'normal', children, className, ...rest }) => {
  const classes = clsx([
    'rounded font-bold focus:outline-none focus:ring-0',
    'disabled:cursor-default disabled:opacity-50',
    variant && variants[variant],
    sizes[size],
  ]);
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
