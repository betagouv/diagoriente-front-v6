import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import clsx from 'clsx';

export type ButtonProps = {
  size?: 'normal' | 'lg';
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
  lg: 'px-16 py-4 text-md',
};

const Button: FunctionComponent<ButtonProps> = ({ variant = 'primary', size = 'normal', children, ...rest }) => {
  const classes = clsx([
    'rounded font-bold focus:outline-none focus:ring-0',
    'disabled :cursor-default disabled:opacity-50',
    variants[variant],
    sizes[size],
  ]);
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
