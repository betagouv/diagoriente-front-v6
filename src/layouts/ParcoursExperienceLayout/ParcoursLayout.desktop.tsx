import React, { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import { decodeUri } from 'common/utils/url';
import className from 'common/utils/classNames';
import ProgressBar from 'components/design-system/ProgressBar';
import { ReactComponent as PictoExpPerso } from 'assets/svg/exp_perso_white.svg';
import PathPicto from 'assets/svg/pictoPath.svg';
import SaveButtonComponent from 'components/design-system/SaveButton';
import AppHeader from '../AppLayout/components/AppHeader';

interface PropsBox {
  title: string;
  index: number;
  stepUrlPath: string;
}

const ParcoursLayoutForDesktop: FunctionComponent = ({ children }) => {
  const location = useLocation();
  const params = decodeUri(location.search);
  const step = location.pathname.split('/').pop();
  const steps = ['Métier', 'Activités', 'Caracteristiques', 'Competences', 'Date'];
  const stepsUrl = ['create', 'activite', 'question', 'competences', 'date'];

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
    if (params.type) {
      switch (params.type) {
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
  const RenderOptions = ({ title, index, stepUrlPath }: PropsBox) => {
    const urlStep = stepsUrl.indexOf(stepUrlPath);
    return (
      <div className="rounded-lg border p-4">
        <p className={className('text-lena-blue-dark flex items-center', index < urlStep ? 'opacity-1' : 'opacity-50')}>
          {index < urlStep ? <img src={PathPicto} alt="loup" className="mx-2 w-6" /> : index + 1}{' '}
          {index >= urlStep && '-'} {title}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen h-full flex flex-col">
      <AppHeader />
      <div className="flex flex-row flex-1">
        <div className="w-96 bg-lena-lightgray flex flex-col top-0 left-0 relative">
          <ProgressBar value={renderStep()} maxValue={5} />
          <div className="flex flex-col justify-between flex-grow">
            <div className="flex flex-col space-y-8 p-8">
              <div className="flex items-center justify-center mt-10">
                <div
                  className={`flex flex-col justify-center items-center
                space-y-2`}
                >
                  <PictoExpPerso className="w-12 h-12 xl:w-16 xl:h-16" />
                  <div className="text-center text-lena-blue-dark font-bold md:text-md xl:text-xl">
                    Mes expériences {path()}
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                {steps.map((s, index) => (
                  <RenderOptions index={index} title={s} stepUrlPath={step || 'create'} />
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
