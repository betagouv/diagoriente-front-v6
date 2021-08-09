import React, { FunctionComponent, useContext } from 'react';
import LogoDiagoriente from 'assets/images/logo/diagoriente.svg';
import RepubliqueSvg from 'assets/images/logo/republique.svg';
import LogoBetagouv from 'assets/images/logo/betagouv.svg';
import { Link } from 'react-router-dom';
import { AppUserMenu } from 'layouts/AppLayout/AppUserMenu';
import UserContext from '../../common/contexts/UserContext';
import AppDesktopMenu from './AppDesktopMenu';

const AppHeaderDesktop: FunctionComponent = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="sticky top-0 shadow-md z-50">
      <header
        className={`bg-white flex flex-row items-center justify-between px-4
      md:px-8 py-4 space-x-4 shadow sticky top-0 z-50 h-14`}
      >
        <div className="flex flex-row items-center justify-center space-x-6">
          <Link to="/">
            <img src={LogoDiagoriente} alt="Logo de Diagoriente" style={{ width: 155, height: 37 }} />
          </Link>
          <img src={RepubliqueSvg} alt="Logo de la République Française" style={{ width: 68, height: 36 }} />
          <img src={LogoBetagouv} alt="Logo de Beta.gouv.fr" style={{ width: 80, height: 14 }} />
          <div>{user && <AppDesktopMenu />}</div>
        </div>
        <AppUserMenu />
      </header>
    </div>
  );
};

export default AppHeaderDesktop;
