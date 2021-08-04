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
import UserContext from '../../../common/contexts/UserContext';

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
      <header
        className={`bg-white flex flex-row items-center justify-between px-4
      md:px-8 py-4 space-x-4 shadow-md sticky top-0 z-50`}
        style={{ height: 58 }}
      >
        <div className="flex flex-row items-center justify-center space-x-6">
          <Link to="/">
            <img src={LogoDiagoriente} alt="Logo de Diagoriente" style={{ width: 155, height: 37 }} />
          </Link>
          <img src={RepubliqueSvg} alt="Logo de la République Française" style={{ width: 68, height: 36 }} />
          <img src={LogoBetagouv} alt="Logo de Beta.gouv.fr" style={{ width: 80, height: 14 }} />
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
  );
};

export default AppHeader;
