import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useOnclickOutside from 'common/hooks/useOnclickOutside';

import { ReactComponent as UserProfileIcon } from 'assets/svg/user_profile.svg';
import { ReactComponent as StarSvg } from 'assets/svg/star_m.svg';
import { ReactComponent as HeartSvg } from 'assets/svg/heart_m.svg';
import { ReactComponent as CVSvg } from 'assets/svg/cv_m.svg';
import { ReactComponent as LogoutSvg } from 'assets/svg/logout.svg';
import { ReactComponent as SearchSvg } from 'assets/svg/search_m.svg';
import { ReactComponent as SettingsSvg } from 'assets/svg/settings_m.svg';
import ProgressBar from 'components/design-system/ProgressBar';
import { decodeUri } from 'common/utils/url';

const ParcoursExperienceLayoutForMobile: FunctionComponent = ({ children }) => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const step = location.pathname.split('/').pop();
  const params = decodeUri(location.search);
  const renderStep = () => {
    let title = '';
    let ind = 0;
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
    if (params.type) {
      switch (params.type) {
        case 'personal': {
          title = 'EXPÉRIENCE PERSO';
          break;
        }
        case 'professional': {
          title = 'EXPÉRIENCE PRO';
          break;
        }
        case 'voluntary': {
          title = 'EXPÉRIENCE BENEVOLAT';
          break;
        }
        default: {
          title = 'EXPÉRIENCE PERSO';
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
            {showMenu && (
              <div
                ref={menuRef}
                className="fixed right-2 top-20 mt-1 bg-white rounded-lg z-30"
                style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
              >
                <div className="border-b border-lena-lightgray2">
                  <ul>
                    <Link to="/profil/mes-experiences">
                      <li className="flex flex-row items-center space-x-4 hover:bg-lena-turquoise-light px-5 py-2">
                        <StarSvg height={18} width={18} />
                        <div className="text-lena-blue-dark font-bold">Mes expériences</div>
                      </li>
                    </Link>
                    <Link to="/profil/mes-centres-d-interet">
                      <li className="flex flex-row items-center space-x-4 hover:bg-lena-turquoise-light px-5 py-2">
                        <HeartSvg height={18} width={18} />
                        <div className="text-lena-blue-dark font-bold">Mes centres d'intérêt</div>
                      </li>
                    </Link>
                    <Link to="/skill_card">
                      <li className="flex lex-row items-center space-x-4 hover:bg-lena-turquoise-light px-5 py-2">
                        <CVSvg height={18} width={18} />
                        <div className="text-lena-blue-dark font-bold">Mon CV compétences</div>
                      </li>
                    </Link>
                  </ul>
                </div>
                <div className="border-b border-lena-lightgray2">
                  <ul>
                    <Link to="/profil/reglages">
                      <li className="flex flex-row items-center space-x-4 hover:bg-lena-turquoise-light px-5 py-2">
                        <SettingsSvg height={18} width={18} />
                        <div className="text-lena-blue-dark">Mes réglages</div>
                      </li>
                    </Link>
                  </ul>
                </div>
                <div className="border-b border-lena-lightgray2">
                  <ul>
                    <li className="flex  flex-row items-center space-x-4  hover:bg-lena-turquoise-light px-5 py-2">
                      <SearchSvg height={18} width={18} />
                      <div className="text-lena-blue-dark">Recherche (stage, emploi...)</div>
                    </li>
                  </ul>
                </div>
                <div className="bg-lena-lightgray hover:bg-lena-purple-light rounded-b-lg">
                  <ul>
                    <li className="flex flex-row items-center space-x-4 hover:bg-lena-turquoise-light px-5 py-2">
                      <LogoutSvg height={18} width={18} />
                      <div>Déconnexion</div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-start flex-1">{children}</div>
    </div>
  );
};

export default ParcoursExperienceLayoutForMobile;
