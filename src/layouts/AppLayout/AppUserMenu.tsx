import React from 'react';
import { Link } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
import { ReactComponent as UserProfileIcon } from '../../assets/svg/user_profile.svg';
import StarSvg from '../../assets/svg/star_m.svg';
import HeartSvg from '../../assets/svg/heart_m.svg';
import CVSvg from '../../assets/svg/cv_m.svg';
import SettingsSvg from '../../assets/svg/settings_m.svg';
import LogoutSvg from '../../assets/svg/logout.svg';
import classNames from '../../common/utils/classNames';

export const AppUserMenu = () => {
  const links = [
    [
      {
        label: 'Mes expériences',
        icon: StarSvg,
        link: '/profil/mes-experiences',
      },
      {
        label: "Mes centres d'intérêt",
        icon: HeartSvg,
        link: '/profil/mes-centres-d-interet',
      },
      {
        label: 'Mon CV compétences',
        icon: CVSvg,
        link: '/mon-cv-competences',
      },
    ],
    [
      {
        label: 'Réglages',
        icon: SettingsSvg,
        link: '/profil/reglages',
      },
    ],
    [
      {
        label: 'Déconnexion',
        icon: LogoutSvg,
        link: '/logout',
      },
    ],
  ];

  const link = (icon: any, label: string, url: string) => {
    return (
      <Link to={url}>
        <div
          className={classNames(
            'flex flex-row items-center space-x-2 text-lena-blue-dark',
            'hover:bg-lena-lightgray2 rounded px-4 py-2',
          )}
        >
          {icon && <img className="object-cover" src={icon} alt={label} height={16} width={16} />}
          <span>{label}</span>
        </div>
      </Link>
    );
  };

  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center focus:outline-none focus:ring-0">
        <UserProfileIcon />
      </Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform opacity-0"
      >
        <Popover.Panel className="absolute right-0 z-10 bg-white rounded-md w-max filter drop-shadow-md">
          <div className="divide-y divide-lena-lightgray2">
            <div className="pb-2 divide-y divide-lena-lightgray2">
              {links.map((v) => (
                <div className="py-2">
                  {v.map((w) => (
                    <div key={w.label} className="px-2">
                      {link(w.icon, w.label, w.link)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
