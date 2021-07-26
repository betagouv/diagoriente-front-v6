import React, { FunctionComponent, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { decodeUri } from 'common/utils/url';

import ProgressBar from 'components/design-system/ProgressBar';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import AppHeader from 'layouts/AppHeader';
import { ReactComponent as PictoExpPerso } from 'assets/svg/exp_perso_white.svg';
import { EParcoursStep, NewExperienceContext } from 'contexts/NewExperienceContext';
import SaveButtonComponent from 'components/design-system/SaveButton';
import { Activity } from 'common/requests/types';

interface PropsBox {
  title: string;
  index: number;
}

const ParcoursLayoutForDesktop: FunctionComponent = ({ children }) => {
  const context = useContext(NewExperienceContext);
  const location = useLocation();
  const params = decodeUri(location.search);
  const step = location.pathname.split('/').pop();
  const steps = ['Métier', 'Activités', 'Caracteristiques', 'Competences', 'Date'];

  const renderStep = () => {
    let ind = 0;
    switch (step) {
      case 'domaine': {
        ind = 1;
        break;
      }
      case 'activite': {
        ind = 2;
        break;
      }
      case 'question': {
        ind = 3;
        break;
      }
      case 'competences': {
        ind = 4;
        break;
      }
      case 'date': {
        ind = 5;
        break;
      }
      default: {
        ind = 1;
        break;
      }
    }
    return ind;
  };
  const path = () => {
    let text = '';
    if (context.experienceType) {
      switch (context.experienceType) {
        case 'professional': {
          text = 'professionnelles';
          break;
        }
        case 'personnel': {
          text = 'personnelles';
          break;
        }
        case 'voluntary': {
          text = 'bénévolat';
          break;
        }
        default: {
          text = 'personnelles';
          break;
        }
      }
    }
    return text;
  };
  const RenderOptions = ({ title, index }: PropsBox) => (
    <div className="rounder p-4">
      <p>
        {index + 1}-{title}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen h-full flex flex-col">
      <AppHeader />
      <div className="flex flex-row flex-1">
        <div className="w-96 bg-lena-lightgray flex flex-col top-0 left-0 relative">
          <ProgressBar value={renderStep()} maxValue={5} />
          <div className="flex flex-col justify-between flex-grow">
            <div className="flex flex-col space-y-8 p-8">
              <div className="flex items-center justify-center">
                <div
                  className={`flex flex-col justify-center items-center
                bg-white rounded-full h-44 w-44 xl:h-56 xl:w-56 space-y-2`}
                >
                  <PictoExpPerso className="w-12 h-12 xl:w-16 xl:h-16" />
                  <div className="text-center text-lena-blue-dark font-bold md:text-md xl:text-xl">
                    Mes expériences {path()}
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                {steps.map((s, index) => (
                  <RenderOptions index={index} title={s} />
                ))}
              </div>
            </div>
            <div className="px-5 bottom-0">
              <SaveButtonComponent />
              <div className="p-4 text-sm italic text-justify">
                Cette expérience est modifiable à tout moment dans votre profil (en haut à droite)
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:relative">
          {/* {step !== 0 && step !== 3 && step !== 5 && (
            <button onClick={backStep} className="pl-10 pt-5 flex items-center cursor-pointer select-none">
              <ArrowLeftSvg /> <span className="ml-2 text-lena-blue-dark">Retour</span>
            </button>
          )} */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ParcoursLayoutForDesktop;
