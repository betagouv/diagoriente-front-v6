import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createPopper } from '@popperjs/core';
import classNames from '../../common/utils/classNames';
import OnBoardingPictoHelpSvg from '../../assets/images/svg/picto/onboarding_help.svg';
import CrossTurquoiseSvg from '../../assets/images/svg/picto/cross_turquoise.svg';
import OnBoardingPictoPolyganeSvg from '../../assets/images/svg/picto/onboarding_polygone.svg';

type Props = {
  popover?: string;
  path?: string;
};

const ButtonWithPopover: FunctionComponent<Props> = ({ popover, path, children }) => {
  const history = useHistory();
  const [popoverShow, setPopoverShow] = useState(false);
  const btnRef = React.createRef<any>();
  const popoverRef = React.createRef<any>();
  const openPopover = () => {
    createPopper(btnRef.current, popoverRef.current, {
      placement: 'top',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 5],
          },
        },
      ],
    });
    setPopoverShow(true);
  };
  const closePopover = () => {
    setPopoverShow(false);
  };
  return (
    <>
      <div className="flex flex-wrap">
        {popoverShow && (
          <div
            className="fixed bg-lena-blue-dark bg-opacity-50 z-10 w-full h-full top-0 left-0"
            onClick={() => setPopoverShow(false)}
          />
        )}
        <div className="w-full text-center">
          <div ref={btnRef} className={classNames('flex mb-5 md:block md:mb-8', popoverShow && 'z-30 relative')}>
            <button
              onClick={() => path && history.push(path)}
              className={`bg-lena-blue w-full text-white font-bold
              md:w-72 py-3 rounded-md focus:ring-0 focus:outline-none`}
            >
              {children}
            </button>
            <div className="md:w-72 hidden md:block w-full mx-auto text-lena-blue-dark italic text-sm mt-2">
              {popover}
            </div>
            <button
              type="button"
              className="focus:ring-0 focus:outline-none md:hidden"
              onClick={() => (popoverShow ? closePopover() : openPopover())}
            >
              <img className="pl-4" src={OnBoardingPictoHelpSvg} alt="Picto Help" />
            </button>
          </div>
          <div className={classNames(!popoverShow && 'hidden', 'block z-50')} style={{ width: '90%' }} ref={popoverRef}>
            <div
              className={`bg-white border-0 font-normal leading-normal text-sm
            text-left no-underline break-words rounded-lg`}
            >
              <button
                onClick={closePopover}
                className="bg-white shadow-lg -top-3 absolute p-2 -right-2 rounded-full focus:ring-0 focus:outline-none"
              >
                <img src={CrossTurquoiseSvg} alt="Cross Icon" />
              </button>
              <div className="px-8 py-10">{popover}</div>
            </div>
            <div className="transform rotate-180 flex justify-center -mt-1">
              <img src={OnBoardingPictoPolyganeSvg} alt="Polygone Icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonWithPopover;
