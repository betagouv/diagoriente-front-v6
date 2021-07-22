import classNames from 'common/utils/classNames';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { ReactComponent as ExpandLess } from 'assets/svg/expand_less.svg';
import { ReactComponent as ExpandMore } from 'assets/svg/expand_more.svg';

type Props = {
  label: string;
  open?: boolean;
  onToggleOpen?: () => void;
};

const AccordionControlled: FunctionComponent<Props> = ({ label, children, onToggleOpen, open = false }) => {
  const handleToggleOpen = () => {
    onToggleOpen?.call(null);
  };

  return (
    <div
      className={classNames(
        'border-4 border-lena-blue-lightest rounded-lg',
        open ? 'bg-lena-blue-lightest' : 'bg-white',
      )}
    >
      <div
        className={classNames(
          'p-4 py-2 flex flex-row items-center justify-between cursor-pointer',
          open && 'bg-lena-blue-lightest',
        )}
        onClick={handleToggleOpen}
      >
        <span className={classNames('text-lena-blue-dark text-lg select-none', open && 'font-bold')}>{label}</span>
        <button
          className={classNames(
            'rounded-full h-8 w-8 flex items-center justify-center bg-white focus:outline-none',
            open && 'shadow',
          )}
          onClick={handleToggleOpen}
          aria-label={open ? 'Replier' : 'Déplier'}
        >
          {open ? <ExpandLess /> : <ExpandMore />}
        </button>
      </div>
      <div
        className={classNames(
          !open && 'hidden',
          'divide-y-4 divide-lena-lightgray rounded-lg border border-lena-blue-lightest',
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default AccordionControlled;
