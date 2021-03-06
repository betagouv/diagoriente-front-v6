import React, { FunctionComponent, useEffect } from 'react';
import classNames from 'common/utils/classNames';
import { ReactComponent as CrossIcon } from 'assets/svg/cross.svg';
import useMediaQuery from '../../hooks/useMediaQuery';

export type ModalProps = {
  open: boolean;
  onClose?: () => void;
  isMobile?: boolean;
  bgColor?: string;
  variant?: 'primary' | 'secondary' | 'reco';
};

const ModalComponent: FunctionComponent<ModalProps> = ({ open, variant = 'primary', onClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  const mediaQueryMD = useMediaQuery('md');

  return !open ? null : (
    <div className={classNames('fixed w-full h-full flex items-center justify-center top-0 left-0 md:absolute')}>
      <div
        onClick={() => onClose?.call(null)}
        style={{ backgroundColor: 'rgba(1, 26, 94, .2)' }}
        className={classNames('modal-overlay absolute md:fixed w-full  h-full top-0 left-0 bg-gray-900 opacity-100')}
      />
      <div
        style={{ height: 'auto', maxHeight: '95%' }}
        className={classNames(
          'rounded-lg z-50 relative',
          mediaQueryMD ? 'w-1/2 mx-auto' : 'm-5',
          mediaQueryMD ? 'w-1/2' : 'w-full',
          variant === 'primary' && 'bg-white',
          variant === 'secondary' && 'bg-lena-turquoise-light',
          variant === 'reco' && 'bg-lena-lightgray',
        )}
      >
        <div className="cursor-pointer z-50 flex justify-end absolute -right-2 -top-2">
          <div
            onClick={() => onClose?.call(null)}
            className={classNames(
              'p-2 rounded-full shadow-lg',
              variant === 'primary' && 'bg-lena-pink-dark',
              variant === 'secondary' && 'bg-white',
            )}
          >
            <CrossIcon
              className={classNames(
                'fill-current',
                variant === 'primary' && 'text-white',
                variant === 'secondary' && 'text-lena-turquoise',
              )}
            />
          </div>
        </div>
        <div className="modal-content py-4 text-left px-6">{children}</div>
      </div>
    </div>
  );
};

export default ModalComponent;
