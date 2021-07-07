import React, { FunctionComponent } from 'react';
import classNames from 'common/utils/classNames';

export type SelectorTestProps = {
  checked: boolean;
  onClick?: (value: boolean) => void;
  color?: string;
  size?: 'normal' | 'small';
};

const SelectorTest: FunctionComponent<SelectorTestProps> = ({
  color,
  size = 'normal',
  checked = false,
  onClick,
  children,
  ...rest
}) => {
  return (
    <div
      onClick={() => onClick?.call(null, !checked)}
      className={classNames(
        'group px-6 rounded-md flex items-center border-2 cursor-pointer',
        size === 'normal' ? 'py-4' : 'py-3',
        checked
          ? color !== 'yellow'
            ? 'bg-lena-turquoise border-lena-turquoise-dark'
            : 'bg-lena-yellow border-lena-yellow-dark'
          : color !== 'yellow'
          ? 'bg-lena-turquoise-light border-transparent'
          : 'bg-lena-yellow-light border-transparent',
      )}
    >
      <div className="flex flex-row items-start space-x-4">
        <input
          type="checkbox"
          readOnly
          checked={checked}
          className={classNames(
            'border border-lena-lightgray2 checked:border-white checkbox-lena-blue',
            'rounded-md h-6 w-6 cursor-pointer focus:outline-none focus:ring-0 text-white',
            !checked && 'group-hover:border-lena-turquoise-dark group-hover:border-2',
          )}
          {...rest}
        />
        <div className={classNames(checked && 'text-lena-black font-bold')}>{children}</div>
      </div>
    </div>
  );
};

export default SelectorTest;
