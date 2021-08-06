import React, { FunctionComponent, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import SaveButtonComponent from 'components/design-system/SaveButton';
import { ReactComponent as PictoExpPro } from 'assets/svg/picto-ajout-xp-pro.svg';
import { ReactComponent as PictoExpPerso } from 'assets/svg/picto-ajout-xp-perso.svg';
import { ReactComponent as PictoExpBenevolat } from 'assets/svg/picto-ajout-xp-benevolat.svg';
import classNames from 'common/utils/classNames';
import PathPicto from 'assets/svg/pictoPath.svg';
import ThemeContext from 'common/contexts/ThemeContext';
import { decodeUri } from 'common/utils/url';

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
    let text = '';
    if (theme) {
      switch (theme.domain) {
        case 'professional': {
          text = 'professionnelles';
          break;
        }
        case 'personal': {
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

  const progressColor = useMemo(() => {
    if (theme) {
      switch (theme.domain) {
        case 'professional':
          return 'bg-parcours-pro';
        case 'personal':
          return 'bg-parcours-perso';
        case 'voluntary':
          return 'bg-parcours-voluntary';
        default:
          break;
      }
    }
    return 'bg-lena-blue';
  }, [theme]);

  const renderPicto = () => {
    switch (params.type) {
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
          'rounded-lg px-4 py-3 flex items-center justify-between',
          progressColor,
          index < urlStep ? 'bg-opacity-1' : 'bg-opacity-20',
        )}
      >
        <p className={classNames('text-lena-lightgray flex items-center')}>{`${index + 1} - ${title}`}</p>
        {index < urlStep ? <img src={PathPicto} alt="loup" className="mx-2 w-6" /> : null}
      </div>
    );
  };

  return (
    <div className="w-80 bg-lena-blue-dark flex flex-col top-0 left-0 relative filter drop-shadow-sm z-10">
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex flex-col space-y-8 p-8">
          <div className="flex items-center justify-center mt-10">
            <div className="flex flex-col justify-center items-center space-y-4">
              {renderPicto()}
              <div className="text-center text-white font-bold md:text-md xl:text-xl">Ajout d'expériences {path()}</div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
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
