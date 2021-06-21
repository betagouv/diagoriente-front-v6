import React, { FunctionComponent } from 'react';
import LogoDiagoriente from 'assets/images/logo/diagoriente.svg';
import LogoRepublique from 'assets/images/logo/republique.png';
import LogoBetagouv from 'assets/images/logo/betagouv.svg';
import IconProfile from 'assets/svg/user_profile.svg';
import { Link } from 'react-router-dom';

const AppHeader: FunctionComponent = () => {
  return (
    <header className="bg-white flex flex-row justify-between px-8 py-4 shadow-md">
      <div className="flex flex-row items-center justify-center space-x-6">
        <Link to="/">
          <img src={LogoDiagoriente} alt="Logo de Diagoriente" className="w-40 lg:w-52" />
        </Link>
        <img src={LogoRepublique} alt="Logo de la République Française" className="h-10" />
        <img src={LogoBetagouv} alt="Logo de Beta.gouv.fr" className="h-6" />
      </div>
      <div>
        <Link to="/profil">
          <img src={IconProfile} width={32} height={32} alt="Profil utilisateur" />
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
