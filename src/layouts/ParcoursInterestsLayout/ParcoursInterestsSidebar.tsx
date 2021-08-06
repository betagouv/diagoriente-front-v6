import React, { FunctionComponent } from 'react';
import { ReactComponent as HeartSvg } from '../../assets/svg/heart_yellow.svg';
import SaveButtonComponent from '../../components/design-system/SaveButton';

const ParcoursInterestsSidebar: FunctionComponent = () => {
  return (
    <div className="w-80 bg-lena-lightgray flex flex-col top-0 left-0 relative filter drop-shadow-sm z-10">
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex flex-col space-y-8 p-8">
          <div className="flex items-center justify-center">
            <div className="flex flex-col justify-center items-center space-y-4">
              <HeartSvg className="w-12 h-12 xl:w-16 xl:h-16" />
              <div className="text-center text-lena-blue-dark font-bold md:text-md xl:text-xl">
                Mes centres d'intérêt
              </div>
            </div>
          </div>
        </div>
        <div className="px-4">
          <SaveButtonComponent />
          <div className="p-4 text-sm italic text-justify">
            Vos centres d’intérêts sont modifiables à tout moment dans votre profil (en haut à droite)
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcoursInterestsSidebar;
