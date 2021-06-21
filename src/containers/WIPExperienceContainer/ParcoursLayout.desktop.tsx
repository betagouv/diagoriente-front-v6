import React, { FunctionComponent } from 'react';
import ProgressBar from 'components/design-system/ProgressBar';
import IconeProfil from 'assets/svg/user_profile.svg';
import AppHeader from '../../layouts/AppHeader';
import useMediaQuery from '../../hooks/useMediaQuery';

const ParcoursLayout: FunctionComponent = ({ children }) => {
  const isDesktop = useMediaQuery('md');

  return (
    <div className="min-h-screen h-full flex flex-col relative">
      {isDesktop && <AppHeader />}
      <div className="flex flex-row flex-1">
        <div className="w-96 bg-lena-lightgray flex flex-col">
          <ProgressBar value={20} />
          <div className="flex flex-col items-center justify-between flex-grow px-2">
            <div>aa</div>
            <div className="mb-4 p-4 text-sm italic rounded bg-lena-turquoise-light">
              Cette expérience est modifiable à tout moment dans votre profil, accessible en cliquant sur l’icône :
              <img className="inline mx-2" src={IconeProfil} height={32} width={32} alt="Profil utilisateur" />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">{children}</div>
      </div>
    </div>
  );
};

export default ParcoursLayout;
