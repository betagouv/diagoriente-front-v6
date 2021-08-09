import AppLayout from 'layouts/AppLayout/AppLayout';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'common/utils/classNames';
import { ReactComponent as PictoExpPro } from 'assets/svg/picto-ajout-xp-pro.svg';
import { ReactComponent as PictoExpPerso } from 'assets/svg/picto-ajout-xp-perso.svg';
import { ReactComponent as PictoExpBenevolat } from 'assets/svg/picto-ajout-xp-benevolat.svg';

const ExperienceIntroContainer: FunctionComponent = () => {
  const types = [
    {
      svg: <PictoExpPro height={128} width={128} />,
      label: 'Expérience professionnelle',
      url: '/experience/theme-pro',
    },
    {
      svg: <PictoExpPerso height={128} width={128} />,
      label: 'Expérience personnelle',
      url: '/experience/theme?type=personal',
    },
    {
      svg: <PictoExpBenevolat height={128} width={128} />,
      label: 'Expérience bénévolat volontariat',
      url: '/experience/theme?type=voluntary',
    },
    {
      label: 'Reprendre : "Développeur Web"',
      url: '/',
    },
  ];

  return (
    <AppLayout>
      <div className="flex flex-1 items-center justify-center px-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 flex-1 w-full">
          {types.map((v) => (
            <Link
              key={v.label}
              to={v.url}
              className={classNames(
                'font-bold text-xl text-white px-2 py-16 text-center items-center flex flex-col',
                'space-y-8 md:py-64 bg-lena-blue-dark md:hover:bg-lena-blue-alt-dark justify-center',
              )}
            >
              {v.svg && <div>{v.svg}</div>}
              <div>{v.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default ExperienceIntroContainer;
