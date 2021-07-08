import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ExpProSvg } from 'assets/svg/exp_professional.svg';
import { ReactComponent as ExpPersoSvg } from 'assets/svg/exp_perso_white.svg';
import { ReactComponent as StarSvg } from 'assets/svg/star.svg';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import PrivateBarLayout from 'layouts/PrivateBar';

const ExperienceContainer = () => {
  const history = useHistory();
  return (
    <div className="min-h-screen h-full flex flex-col">
      <PrivateBarLayout />
      <div style={{ background: 'rgb(250,250,250)' }} className="pt-3 flex flex-col justify-start flex-1">
        <div className="container">
          <button onClick={() => history.push('/')} className="flex items-center mb-5 focus:ring-0 focus:outline-none">
            <ArrowLeftSvg />
            <span className="text-sm mt-1 ml-3 text-lena-blue-dark">Retour</span>
          </button>
          <div className="flex flex-col items-center mb-3">
            <StarSvg />
            <h2 className="font-bold text-lena-blue-dark mb-10 uppercase mt-3">Mes expériences</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => history.push('/experience/theme?type=professional')}
              className="flex flex-col justify-center items-center py-8 bg-lena-blue-light2 rounded-md cursor-pointer select-none focus:ring-0 focus:outline-none hover:bg-lena-blue-alt-light"
            >
              <ExpProSvg height={45} />
              <span className="inline-block text-center mt-5 text-lena-blue-dark font-bold">
                Mes expériences professionnelles
              </span>
            </button>
            <button
              onClick={() => history.push('/experience/theme?type=personal')}
              className="flex flex-col justify-center items-center py-8 rounded-md cursor-pointer select-none focus:ring-0 focus:outline-none bg-lena-blue-light2 hover:bg-lena-blue-alt-light"
            >
              <ExpPersoSvg height={45} />
              <span className="inline-block text-center mt-5 text-lena-blue-dark font-bold">
                Mes expériences personnelles
              </span>
            </button>
            <button
              onClick={() => history.push('/experience/theme?type=voluntary')}
              className="flex flex-col justify-center items-center py-8 rounded-md cursor-pointer select-none focus:ring-0 focus:outline-none bg-lena-blue-light2 hover:bg-lena-blue-alt-light"
            >
              <ExpProSvg height={45} />
              <span className="inline-block text-center mt-5 text-lena-blue-dark font-bold">
                Mes expériences de bénévolat
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceContainer;
