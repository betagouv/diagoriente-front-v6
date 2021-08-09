import React, { FunctionComponent, useState, useRef, useEffect, useContext, useMemo } from 'react';
import ThemeContext from 'common/contexts/ThemeContext';
import { useLocation } from 'react-router-dom';
import useOnclickOutside from 'common/hooks/useOnclickOutside';
import { ReactComponent as CrossIcon } from 'assets/svg/cross3.svg';
import ProgressBar from 'components/design-system/ProgressBar';

const ParcoursExperienceLayoutForMobile: FunctionComponent<{ showHeader: boolean }> = ({ showHeader, children }) => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const step = location.pathname.split('/').pop();
  const { theme } = useContext(ThemeContext);

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

  const title = useMemo(() => {
    if (theme) {
      switch (theme.domain) {
        case 'professional':
          return 'EXPéRIENCE PRO';
        case 'personal':
          return 'EXPéRIENCE PERSO';
        case 'voluntary':
          return 'EXPéRIENCE BENEVOLAT';
        default:
          break;
      }
    }
    return 'EXPéRIENCE PERSO';
  }, [theme]);

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

  const menuRef: any = useRef();
  useOnclickOutside(menuRef, () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    showMenu && setShowMenu(false);
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen md:min-h-0 h-full flex flex-col">
      {showHeader && (
        <div className="sticky top-0 shadow-md z-50">
          <div className="h-14 p-2 bg-lena-blue-dark text-white flex flex-row items-center justify-between">
            <div className="px-4 font-bold text-lg">{renderStep().title}</div>
            <CrossIcon onClick={() => setShowMenu(!showMenu)} />
          </div>
          <ProgressBar color={progressColor} value={renderStep().ind} maxValue={5} />
        </div>
      )}
      <div className="flex flex-col items-center justify-start flex-1">{children}</div>
    </div>
  );
};

export default ParcoursExperienceLayoutForMobile;
