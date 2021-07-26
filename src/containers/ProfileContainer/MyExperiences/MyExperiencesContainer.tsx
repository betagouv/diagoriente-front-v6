import React, { FunctionComponent } from 'react';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import { ReactComponent as StarIcon } from 'assets/svg/star.svg';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ExpProSvg } from 'assets/svg/exp_professional.svg';
import { ReactComponent as ExpPersoSvg } from 'assets/svg/exp_perso_white.svg';
import { ReactComponent as ArrowLeftSvg } from '../../../assets/images/svg/picto/arrow-left.svg';
import useMediaQuery from '../../../hooks/useMediaQuery';

const allExperienceTypes = [
  {
    label: 'Mes expériences professionnelles',
    param: 'professional',
    icon: <ExpProSvg height={40} />,
  },
  {
    label: 'Mes expériences personnelles',
    param: 'personal',
    icon: <ExpPersoSvg height={40} />,
  },
  {
    label: 'Mes expériences de bénévolat',
    param: 'voluntary',
    icon: <ExpProSvg height={40} />,
  },
];

const MyExperiencesContainer: FunctionComponent = () => {
  const history = useHistory();
  const isDesktop = useMediaQuery('md');

  return (
    <ProfileLayout>
      <div className="container flex flex-col space-y-8 py-8 items-center">
        {!isDesktop && (
          <button
            onClick={() => history.push('/profil')}
            className="flex items-center mb-5 focus:ring-0 focus:outline-none"
          >
            <ArrowLeftSvg />
            <span className="text-sm mt-1 ml-3 text-lena-blue-dark">Retour</span>
          </button>
        )}
        <div className="flex flex-col items-center justify-center space-y-2">
          <StarIcon height={25} />
          <h2 className="font-bold text-lena-blue-dark text-lg uppercase">Mes expériences</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 md:w-1/2 gap-4">
          {allExperienceTypes.map((v) => (
            <button
              key={v.param}
              onClick={() => history.push(`/profil/mes-experiences/${v.param}`)}
              className={`flex flex-col justify-center
              items-center py-8 px-4 bg-lena-blue-light2 rounded-md
              cursor-pointer select-none focus:ring-0
              focus:outline-none hover:bg-lena-blue-alt-light`}
            >
              {v.icon}
              <span className="inline-block text-center mt-5 text-lena-blue-dark font-bold">{v.label}</span>
            </button>
          ))}
        </div>
        <div>TODO: Load experiences on Desktop here instead of redirecting to URL</div>
      </div>
    </ProfileLayout>
  );
};

export default MyExperiencesContainer;
