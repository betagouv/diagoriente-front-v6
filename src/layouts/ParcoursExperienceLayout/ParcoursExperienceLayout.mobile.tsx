import React, { FunctionComponent, useState, useRef, useEffect, useContext } from 'react';
import ThemeContext from 'common/contexts/ThemeContext';
import { useLocation } from 'react-router-dom';
import useOnclickOutside from 'common/hooks/useOnclickOutside';
import { ReactComponent as UserProfileIcon } from 'assets/svg/user_profile.svg';
import ProgressBar from 'components/design-system/ProgressBar';
import { AppUserMenu } from '../AppUserMenu';

const ParcoursExperienceLayoutForMobile: FunctionComponent = ({ children }) => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const step = location.pathname.split('/').pop();
  const { theme } = useContext(ThemeContext);

  const renderStep = () => {
    let title: string;
    let ind: number;
    switch (step) {
      case 'domaine': {
        title = '> Choix du domaine';
        ind = 1;
        break;
      }
      case 'date': {
        title = '> Sélection de date';
        ind = 2;
        break;
      }
      case 'activite': {
        title = '> Choix des activités';
        ind = 3;
        break;
      }
      case 'question': {
        title = '> Sélection des questions';
        ind = 4;
        break;
      }
      case 'competences': {
        title = '> Sélection des compétences';
        ind = 5;
        break;
      }

      default: {
        title = '> Choix du domaine';
        ind = 1;
        break;
      }
    }
    return { title, ind };
  };
  const renderTitleExp = () => {
    let title = '';
    if (theme) {
      switch (theme.domain) {
        case 'personal': {
          title = 'EXPéRIENCE PERSO';
          break;
        }
        case 'professional': {
          title = 'EXPéRIENCE PRO';
          break;
        }
        case 'voluntary': {
          title = 'EXPéRIENCE BENEVOLAT';
          break;
        }
        default: {
          title = 'EXPéRIENCE PERSO';
          break;
        }
      }
    }
    return title;
  };
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
      {!(step === 'doneAct' || step === 'questions' || step === 'sommaire') && (
        <div className="sticky top-0 shadow-md z-50">
          <ProgressBar value={renderStep().ind} maxValue={5} />
          <div className="p-2 bg-lena-lightgray flex flex-row items-center justify-between">
            <div>
              <strong className="text-lena-blue">{renderTitleExp()}</strong> {renderStep().title}
            </div>
            <UserProfileIcon onClick={() => setShowMenu(!showMenu)} />
          </div>
          {showMenu && <AppUserMenu ref={menuRef} />}
        </div>
      )}
      <div className="flex flex-col items-center justify-start flex-1">{children}</div>
    </div>
  );
};

export default ParcoursExperienceLayoutForMobile;
