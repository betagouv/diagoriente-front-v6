import React, { FunctionComponent } from 'react';
import classNames from 'common/utils/classNames';

const Pill: FunctionComponent<{ extraClassName?: string; size?: 'sm' }> = ({ extraClassName, size, children }) => {
  return (
    <div
      className={classNames(
        'inline-block bg-lena-blue-lightest text-lena-blue-dark rounded-full px-3 py-1 text-center',
        size === 'sm' && 'text-sm',
        extraClassName,
      )}
    >
      {children}
    </div>
  );
};

export default Pill;
