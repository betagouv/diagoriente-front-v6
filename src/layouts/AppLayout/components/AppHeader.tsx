import React, { FunctionComponent, useContext, useRef, useState } from 'react';
import LogoDiagoriente from 'assets/images/logo/diagoriente.svg';
import RepubliqueSvg from 'assets/images/logo/republique.svg';
import LogoBetagouv from 'assets/images/logo/betagouv.svg';
import IconProfile from 'assets/svg/user_profile.svg';
import { Link } from 'react-router-dom';
import useOnclickOutside from 'common/hooks/useOnclickOutside';
import { AppUserMenu } from 'layouts/AppUserMenu';
import UserContext from '../../../common/contexts/UserContext';
import AppDeskopMenu from '../../AppDeskopMenu';

const AppHeader: FunctionComponent = () => {
  const { user } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef: any = useRef();

  useOnclickOutside(menuRef, () => {
    if (showMenu) setShowMenu(false);
  });

  return (
    <div className="sticky top-0 shadow-md z-50">
      <header
        className={`bg-white flex flex-row items-center justify-between px-4
      md:px-8 py-4 space-x-4 shadow-md sticky top-0 z-50 h-14`}
      >
        <div className="flex flex-row items-center justify-center space-x-6">
          <Link to="/">
            <img src={LogoDiagoriente} alt="Logo de Diagoriente" style={{ width: 155, height: 37 }} />
          </Link>
          <img src={RepubliqueSvg} alt="Logo de la République Française" style={{ width: 68, height: 36 }} />
          <img src={LogoBetagouv} alt="Logo de Beta.gouv.fr" style={{ width: 80, height: 14 }} />
          <AppDeskopMenu />
        </div>
        <div>
          {user && (
            <button onClick={() => setShowMenu(!showMenu)} className="focus:ring-0 focus:outline-none">
              <img src={IconProfile} width={32} height={32} alt="Profil utilisateur" />
            </button>
          )}
        </div>
      </header>
      {showMenu && <AppUserMenu ref={menuRef} />}
    </div>
  );
};

export default AppHeader;
