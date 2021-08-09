import React, { FunctionComponent, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import SaveButtonComponent from 'components/design-system/SaveButton';
import { ReactComponent as PictoExpPro } from 'assets/svg/picto-ajout-xp-pro.svg';
import { ReactComponent as PictoExpPerso } from 'assets/svg/picto-ajout-xp-perso.svg';
import { ReactComponent as PictoExpBenevolat } from 'assets/svg/picto-ajout-xp-benevolat.svg';
import classNames from 'common/utils/classNames';
import ThemeContext from 'common/contexts/ThemeContext';
import { decodeUri } from 'common/utils/url';
import ProgressBar from 'components/design-system/ProgressBar';

interface PropsBox {
  title: string;
  index: number;
  stepUrlPath: string;
}

const ParcoursExperienceSidebar: FunctionComponent = () => {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const params = decodeUri(location.search);
  const step = location.pathname.split('/').pop();
  const steps = ['Domaine', 'Dates', 'Activités', 'Caractéristiques', 'Compétences'];
  const stepsUrl = ['create', 'date', 'activite', 'doneAct', 'question', 'questions', 'competences', 'sommaire'];

  const path = () => {
    const domain = theme?.domain || params.type;
    switch (domain) {
      case 'professional':
        return 'professionnelle';
      case 'personal':
        return 'personnelle';
      case 'voluntary':
        return 'bénévolat';
      default:
        return 'professionnelle';
    }
  };

  const renderStep = () => {
    let title: string;
    let ind: number;
    switch (step) {
      case 'domaine': {
        title = 'Domaine';
        ind = 1;
        break;
      }
      case 'date': {
        title = 'Période';
        ind = 2;
        break;
      }
      case 'activite':
      case 'doneAct': {
        title = 'Activités';
        ind = 3;
        break;
      }
      case 'question':
      case 'questions': {
        title = 'Caractéristiques';
        ind = 4;
        break;
      }
      case 'competences': {
        title = 'Compétences';
        ind = 5;
        break;
      }
      default: {
        title = 'Domaine';
        ind = 1;
        break;
      }
    }
    return { title, ind };
  };

  const progressColor = useMemo(() => {
    const domain = theme?.domain || params.type;
    switch (domain) {
      case 'professional':
        return 'bg-parcours-pro';
      case 'personal':
        return 'bg-parcours-perso';
      case 'voluntary':
        return 'bg-parcours-voluntary';
      default:
        return 'bg-lena-blue';
    }
  }, [theme, params]);

  const renderPicto = () => {
    const domain = theme?.domain || params.type;
    switch (domain) {
      case 'professional': {
        return <PictoExpPro className="w-12 h-12 xl:w-16 xl:h-16" />;
      }
      case 'personal': {
        return <PictoExpPerso className="w-12 h-12 xl:w-16 xl:h-16" />;
      }
      case 'voluntary': {
        return <PictoExpBenevolat className="w-12 h-12 xl:w-16 xl:h-16" />;
      }
      default: {
        return <PictoExpPro className="w-12 h-12 xl:w-16 xl:h-16" />;
      }
    }
  };

  const RenderOptions = ({ title, index, stepUrlPath }: PropsBox) => {
    const urlStep = stepsUrl.indexOf(stepUrlPath);
    return (
      <div
        className={classNames(
          'rounded-lg px-4 flex items-center justify-between',
          index < urlStep ? 'opacity-1' : 'opacity-60',
        )}
      >
        <p className="text-lena-lightgray flex items-center">{`${index + 1} - ${title}`}</p>
      </div>
    );
  };

  return (
    <div className="w-80 bg-lena-blue-dark flex flex-col top-0 left-0 relative filter drop-shadow-sm scroll-thin z-10">
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex flex-col space-y-8">
          <div className="flex items-center justify-center mt-10 p-4">
            <div className="flex flex-col justify-center items-center space-y-4">
              {renderPicto()}
              <div className="text-center text-white font-bold md:text-md xl:text-xl">Ajout d'expérience {path()}</div>
            </div>
          </div>
          <ProgressBar color={progressColor} value={renderStep().ind - 1} maxValue={4} />
          <div className="flex flex-col space-y-4 px-4">
            {steps.map((s, index) => (
              <RenderOptions key={s} index={index} title={s} stepUrlPath={step || 'create'} />
            ))}
          </div>
        </div>
        <div className="px-4">
          <SaveButtonComponent />
          <div className="p-4 text-sm italic text-justify text-white">
            Cette expérience est modifiable à tout moment dans votre profil (en haut à droite)
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcoursExperienceSidebar;
