import React, { FunctionComponent, useState } from 'react';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import { ReactComponent as StarIcon } from 'assets/svg/star.svg';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as ExpProSvg } from 'assets/svg/exp_professional.svg';
import { ReactComponent as ExpPersoSvg } from 'assets/svg/exp_perso_white.svg';
import { ReactComponent as ArrowLeftSvg } from '../../../assets/images/svg/picto/arrow-left.svg';
import useMediaQuery from '../../../hooks/useMediaQuery';
import AppLoader from '../../../components/ui/AppLoader';
import classNames from '../../../common/utils/classNames';
import { ReactComponent as PlusSvg } from '../../../assets/svg/plus.svg';

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
  const isDesktop = useMediaQuery('md');
  const history = useHistory();
  const [selectedType, setSelectedType] = useState('');

  const handleSelectCard = (param: string) => {
    return isDesktop ? setSelectedType(param) : history.push(`/profil/mes-experiences/${param}`);
  };

  return (
    <ProfileLayout>
      <div className="container flex flex-col space-y-8 py-4 md:py-8">
        {!isDesktop && (
          <Link to="/profil" className="flex items-center mb-5 focus:ring-0 focus:outline-none">
            <ArrowLeftSvg />
            <span className="text-sm mt-1 ml-3 text-lena-blue-dark">Retour</span>
          </Link>
        )}
        <div className="flex flex-col items-center justify-center space-y-2">
          <StarIcon height={25} />
          <h2 className="font-bold text-lena-blue-dark text-lg uppercase">Mes expériences</h2>
        </div>
        <div className="flex flex-col items-center space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 md:w-1/2 gap-4">
            {allExperienceTypes.map((v) => (
              <button
                key={v.param}
                onClick={() => handleSelectCard(v.param)}
                className={classNames(
                  'flex flex-col justify-center items-center',
                  'py-8 px-4 rounded-md cursor-pointer select-none',
                  'focus:ring-0 focus:outline-none hover:bg-lena-blue-alt-light',
                  selectedType === v.param ? 'bg-lena-blue-alt-light' : 'bg-lena-blue-light2',
                )}
              >
                {v.icon}
                <span className="inline-block text-center mt-5 text-lena-blue-dark font-bold">{v.label}</span>
              </button>
            ))}
          </div>
          {selectedType === '' && <div>TODO: Load experiences on Desktop here instead of redirecting to URL</div>}
          {selectedType !== '' && (
            <>
              <AppLoader />
              <button
                onClick={() => history.push(`/experience/theme/create?type=${selectedType}`)}
                className="flex items-center focus:ring-0 focus:outline-none"
              >
                <PlusSvg /> <span className="ml-3 text-lena-blue-dark">Ajouter une expérience ({selectedType})</span>
              </button>
            </>
          )}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default MyExperiencesContainer;
