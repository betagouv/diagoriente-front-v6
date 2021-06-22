import React, { FunctionComponent } from 'react';
import ProgressBar from 'components/design-system/ProgressBar';
import IconeProfil from 'assets/svg/user_profile.svg';
import AppHeader from '../../layouts/AppHeader';
import { ReactComponent as PictoExpPro } from '../../assets/svg/exp_professional.svg';

const ParcoursLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="min-h-screen h-full flex flex-col relative">
      <AppHeader />
      <div className="flex flex-row flex-1">
        <div className="w-96 bg-lena-lightgray flex flex-col">
          <ProgressBar value={20} />
          <div className="flex flex-col items-center justify-between flex-grow px-2 py-8">
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col justify-center items-center bg-white rounded-full h-56 w-56 space-y-2 p-4">
                <PictoExpPro />
                <div className="text-center text-lena-blue-dark font-bold text-xl">
                  Mes expériences professionnelles
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="bg-lena-blue-lightest text-lena-blue-dark font-bold text-center rounded-md p-2">
                  [!!WIP!!]
                </div>
                <div>
                  <div className="font-bold text-lena-blue-dark">Activités pratiquées</div>
                  <ul className="list-disc list-inside">
                    <li>Activité A</li>
                    <li>Activité B</li>
                    <li>Activité C</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-4 text-sm italic rounded bg-lena-turquoise-light">
              Cette expérience est modifiable à tout moment dans votre profil, accessible en cliquant sur l’icône :
              <img className="inline mx-2" src={IconeProfil} height={32} width={32} alt="Profil utilisateur" />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:relative">{children}</div>
      </div>
    </div>
  );
};

export default ParcoursLayout;
