import React, { FunctionComponent, useEffect } from 'react';
import classNames from 'common/utils/classNames';
import { ReactComponent as CrossIcon } from 'assets/svg/cross.svg';
import useMediaQuery from '../../hooks/useMediaQuery';

export type ModalProps = {
  open: boolean;
  onClose?: () => void;
  isMobile?: boolean;
  bgColor?: string;
  variant?: 'primary' | 'secondary' | 'reco' | 'mail';
};

const ModalComponent: FunctionComponent<ModalProps> = ({ open, variant = 'primary', onClose, children, bgColor }) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);
  const mediaQueryMD = useMediaQuery('md');

  return !open ? null : (
    <div
      className={classNames('absolute w-full h-full flex items-center justify-center top-0 left-0 md:absolute z-50')}
    >
      <div
        onClick={() => onClose?.call(null)}
        className={classNames(`modal-overlay absolute md:fixed w-full h-full top-0 left-0 opacity-90 ${bgColor}`)}
      />
      <div
        style={{ height: 'auto', maxHeight: '95%' }}
        className={classNames(
          'rounded-lg relative',
          mediaQueryMD ? 'w-1/2 mx-auto' : 'm-5',
          mediaQueryMD ? 'w-1/2' : 'w-full',
          variant === 'primary' && 'bg-white',
          variant === 'secondary' && 'bg-lena-turquoise-light',
          variant === 'reco' && 'bg-lena-lightgray',
          variant === 'mail' && 'bg-lena-blue-dark',
        )}
      >
        <div className="cursor-pointer z-75 flex justify-end absolute -right-2 -top-2">
          <div
            onClick={() => onClose?.call(null)}
            className={classNames(
              'p-2 rounded-full shadow-lg',
              variant === 'primary' && 'bg-lena-pink-dark',
              variant === 'secondary' && 'bg-white',
              variant === 'reco' && 'bg-white',
              variant === 'mail' && 'bg-white',
            )}
          >
            <CrossIcon
              className={classNames(
                'fill-current',
                variant === 'primary' && 'text-white',
                (variant === 'secondary' || variant === 'mail' || variant === 'reco') && 'text-lena-turquoise',
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
