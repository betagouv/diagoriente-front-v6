import React, { FunctionComponent, useContext, useRef, useState } from 'react';
import LogoDiagoriente from 'assets/images/logo/diagoriente.svg';
import RepubliqueSvg from 'assets/images/logo/republique.svg';
import LogoBetagouv from 'assets/images/logo/betagouv.svg';
import IconProfile from 'assets/svg/user_profile.svg';
import { ReactComponent as StarSvg } from 'assets/svg/star_m.svg';
import { ReactComponent as HeartSvg } from 'assets/svg/heart_m.svg';
import { ReactComponent as CVSvg } from 'assets/svg/cv_m.svg';
import { ReactComponent as LogoutSvg } from 'assets/svg/logout.svg';
import { ReactComponent as SearchSvg } from 'assets/svg/search_m.svg';
import { ReactComponent as SettingsSvg } from 'assets/svg/settings_m.svg';
import { Link } from 'react-router-dom';
import useOnclickOutside from 'common/hooks/useOnclickOutside';
import UserContext from '../common/contexts/UserContext';

const AppHeader: FunctionComponent = () => {
  const { user } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef: any = useRef();
  useOnclickOutside(menuRef, () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    showMenu && setShowMenu(false);
  });

  return (
    <div>
      <header className="bg-white flex flex-row justify-between px-16 py-4 shadow-md sticky top-0 z-50">
        <div className="flex flex-row items-center justify-center space-x-6">
          <Link to="/">
            <img src={LogoDiagoriente} alt="Logo de Diagoriente" className="w-40 lg:w-52" />
          </Link>
          <img src={RepubliqueSvg} alt="Logo de la République Française" className="h-10" />
          <img src={LogoBetagouv} alt="Logo de Beta.gouv.fr" className="h-6" />
        </div>
        <div>
          {user && (
            <button onClick={() => setShowMenu(!showMenu)} className="focus:ring-0 focus:outline-none">
              <img src={IconProfile} width={32} height={32} alt="Profil utilisateur" />
            </button>
          )}
        </div>
      </header>
      {showMenu && (
        <div
          ref={menuRef}
          className="fixed right-5 mt-1 bg-white rounded-lg z-30"
          style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
        >
          <div className="border-b border-lena-lightgray2">
            <ul>
              <Link to="/experience">
                <li className="flex items-center hover:bg-lena-turquoise-light px-5 py-2">
                  <div style={{ width: 18 }}>
                    <StarSvg />
                  </div>{' '}
                  <span className="ml-3 text-lena-blue-dark font-bold mt-1">Mes expériences</span>
                </li>
              </Link>
              <Link to="/centres_interet">
                <li className="flex items-center hover:bg-lena-turquoise-light px-5 py-2">
                  <div style={{ width: 18 }}>
                    <HeartSvg />
                  </div>{' '}
                  <span className="ml-3 text-lena-blue-dark font-bold mt-1">Mes centres d'intérêt</span>
                </li>
              </Link>
              <li className="flex items-center hover:bg-lena-turquoise-light px-5 py-2">
                <div style={{ width: 18 }}>
                  <CVSvg />
                </div>{' '}
                <span className="ml-3 text-lena-blue-dark font-bold mt-1">Mon CV compétences</span>
              </li>
            </ul>
          </div>
          <div className="border-b border-lena-lightgray2">
            <ul>
              <Link to="/profil/reglages">
                <li className="flex items-center hover:bg-lena-turquoise-light px-5 py-2">
                  <div style={{ width: 18 }}>
                    <SettingsSvg />
                  </div>{' '}
                  <span className="ml-3 text-lena-blue-dark mt-1">Mes réglages</span>
                </li>
              </Link>
            </ul>
          </div>
          <div className="border-b border-lena-lightgray2">
            <ul>
              <li className="flex items-center hover:bg-lena-turquoise-light px-5 py-2">
                <div style={{ width: 18 }}>
                  <SearchSvg />
                </div>{' '}
                <span className="ml-3 text-lena-blue-dark mt-1">Recherche (stage, emploi...)</span>
              </li>
            </ul>
          </div>
          <div className="bg-lena-lightgray hover:bg-lena-purple-light rounded-b-lg">
            <ul>
              <li className="flex items-center pb-2 px-5 py-2">
                <div style={{ width: 18 }}>
                  <LogoutSvg className="-mt-1" />
                </div>{' '}
                <span className="ml-3 mt-1">Déconnexion</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppHeader;
