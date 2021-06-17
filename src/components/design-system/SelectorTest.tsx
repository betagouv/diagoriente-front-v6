import React, { FunctionComponent } from 'react';
import clsx from 'clsx';

export type SelectorTestProps = {
  checked: boolean;
  onClick?: (value: boolean) => void;
};

const SelectorTest: FunctionComponent<SelectorTestProps> = ({ checked = false, onClick, children, ...rest }) => {
  return (
    <div
      onClick={() => onClick?.call(null, !checked)}
      className={clsx(
        'group py-4 px-6 rounded-md flex items-center border-2 cursor-pointer',
        checked ? 'bg-lena-turquoise border-lena-turquoise-dark' : 'bg-lena-turquoise-light border-transparent',
      )}
    >
      <div className="flex flex-row items-start space-x-4">
        <input
          type="checkbox"
          checked={checked}
          className={clsx(
            'border border-lena-lightgray2 checked:border-white checkbox-lena-blue',
            'rounded-md h-6 w-6 cursor-pointer focus:outline-none focus:ring-0 text-white',
            !checked && 'group-hover:border-lena-turquoise-dark group-hover:border-2',
          )}
          {...rest}
        />
        <div className={clsx(checked && 'text-lena-black font-bold')}>{children}</div>
      </div>
    </div>
  );
};

export default SelectorTest;
