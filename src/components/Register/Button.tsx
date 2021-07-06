import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import classNames from 'common/utils/classNames';

type Props = {
  variant?: 'primary' | 'secondary' | 'outline-secondary';
  fullWidth?: boolean;
  size?: 'default' | 'sm' | 'md' | 'lg' | 'xl';
  borderSize?: 'default' | 'lg';
  width?: number;
  height?: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonRegister: FunctionComponent<Props> = ({
  children,
  fullWidth = false,
  variant = 'primary',
  size = 'default',
  borderSize = 'default',
  width,
  height,
  className,
  ...rest
}) => {
  const classes = classNames([
    'text-white font-bold focus:outline-none',
    variant === 'primary' && 'bg-lena-pink-dark hover:bg-lena-pink-darkest border border-transparent',
    variant === 'secondary' &&
      'bg-lena-blue hover:bg-lena-blue-dark border border-transparent hover:bg-lena-blue-alt-dark',
    variant === 'outline-secondary' &&
      'border border-white bg-transparent hover:bg-opacity-20 hover:bg-white border-opacity-40 hover:border-opacity-70',
    size === 'default' && 'px-4 py-2 text-base',
    size === 'sm' && 'px-4 py-2 text-sm',
    size === 'lg' && 'px-10 py-6 text-lg',
    size === 'xl' && 'px-16 sm:px-24 pt-3 pb-3 text-xl',
    fullWidth && 'w-full',
    borderSize === 'default' && 'rounded',
    borderSize === 'lg' && 'rounded-lg',
    // TEST: Mérill
    'flex flex-row items-center justify-center space-y-4',
    className,
  ]);

  return (
    <button
      className={classes}
      style={{
        width,
        height,
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonRegister;
