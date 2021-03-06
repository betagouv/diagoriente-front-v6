import { Popover, Transition } from '@headlessui/react';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'common/utils/classNames';
import PictoExperience from 'assets/svg/star.svg';
import PictoInterests from 'assets/svg/heart.svg';
import PictoPlaceholder from 'assets/svg/cross3.svg';
import { ReactComponent as ArrowDownSvg } from 'assets/svg/arrow_down.svg';

const AppDesktopMenu: FunctionComponent = () => {
  const links = [
    { label: 'Ajouter une expérience', icon: PictoExperience, link: '/ajout-exp' },
    { label: "Ajouter mes centres d'intérêt", icon: PictoInterests, link: '/centres_interet/create' },
    { label: 'Rechercher engagement', icon: PictoPlaceholder, link: '/immersion/recherche' },
    { label: 'Rechercher métier', icon: PictoPlaceholder, link: '/metiers/recherche' },
  ];

  const link = (icon: any, label: string, url: string) => {
    return (
      <Link to={url}>
        <div
          className={classNames(
            'flex flex-row items-center space-x-2 text-lena-blue-dark',
            'hover:bg-lena-turquoise-light active:bg-lena-turquoise rounded px-4 py-2',
          )}
        >
          {icon && <img src={icon} alt={label} height={16} width={16} />}
          <span>{label}</span>
        </div>
      </Link>
    );
  };

  return (
    <Popover>
      <Popover.Button
        className={classNames(
          'rounded px-4 py-2 bg-lena-lightgray text-lena-blue-dark uppercase',
          'hover:bg-lena-lightgray2 focus:outline-none focus:ring-0',
        )}
      >
        <div className="flex flex-row space-x-4 items-center justify-center">
          <span>Menu</span>
          <ArrowDownSvg />
        </div>
      </Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform opacity-0"
      >
        <Popover.Panel className="absolute z-10 bg-white rounded-md w-max filter drop-shadow-md">
          <div className="p-2 divide-y divide-lena-lightgray2">
            <div className="pb-2">
              {links.map((v) => (
                <div key={v.label}>{link(v.icon, v.label, v.link)}</div>
              ))}
            </div>
            <div className="pt-2">{link(null, 'Aide', '/aide')}</div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default AppDesktopMenu;
