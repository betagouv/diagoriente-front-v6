import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ExpProSvg } from 'assets/svg/exp_professional.svg';
import { ReactComponent as ExpPersoSvg } from 'assets/svg/exp_perso_white.svg';

const ExperienceContainer = () => {
  const history = useHistory();
  return (
    <div className="min-h-screen h-full flex flex-col">
      <div style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)' }} className="bg-lena-blue-dark py-5">
        <div className="container">
          <span className="uppercase font-bold text-white text-xl">Mes expériences</span>
        </div>
      </div>
      <div style={{ background: 'rgb(250,250,250)' }} className="pt-9 flex flex-col justify-start flex-1">
        <div className="container">
          <h2 className="font-bold text-lena-blue-dark mb-10">
            Les competencesips dolor sit amet, consectetur adipiscing elit. Fusce arcu eros, fermentum vitae.
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => history.push('/experience/xp')}
              style={{ background: '#ECE8F0' }}
              className="flex flex-col justify-center items-center py-8 rounded-md cursor-pointer select-none focus:ring-0 focus:outline-none"
            >
              <ExpProSvg height={45} />
              <span className="inline-block text-center mt-5 text-lena-blue-dark font-bold">
                Mes expériences professionnelles
              </span>
            </button>
            <div
              style={{ background: '#ECE8F0' }}
              className="flex flex-col justify-center items-center py-8 rounded-md cursor-pointer select-none focus:ring-0 focus:outline-none"
            >
              <ExpPersoSvg height={45} />
              <span className="inline-block text-center mt-5 text-lena-blue-dark font-bold">
                Mes expériences personnelles (no route)
              </span>
            </div>
            <div
              style={{ background: '#ECE8F0' }}
              className="flex flex-col justify-center items-center py-8 rounded-md cursor-pointer select-none focus:ring-0 focus:outline-none"
            >
              <ExpProSvg height={45} />
              <span className="inline-block text-center mt-5 text-lena-blue-dark font-bold">
                Mes expériences de bénévolat (no route)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceContainer;
