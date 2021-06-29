import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import UIButtonComponent from 'components/Register/Button';
import LogoDiago from 'assets/images/logo/diagoriente-white.svg';
import LogoRepublique from 'assets/images/logo/republique.svg';
import { ReactComponent as LogoBeta } from 'assets/images/logo/betagouv-white.svg';
import CrossIcon from 'assets/svg/cross.svg';
import MenuIcon from 'assets/svg/menu.svg';
import LoginIcon from 'assets/svg/user.svg';

const NavDivider: FunctionComponent = () => {
  return <div className="border border-white rotate-90 h-4 w-0" />;
};

const StaticHeader: FunctionComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative z-50">
        <header className="bg-lena-blue pro:bg-lena-blue-dark shadow-2xl z-50 py-2">
          <div className="container flex flex-row justify-between items-center py-2">
            <div className="flex flex-row items-center justify-center pro:lg:space-x-6 sm:space-x-2 md:space-x-4">
              <Link to="/">
                <div className="flex items-start">
                  <img src={LogoDiago} className="w-40 lg:w-52" alt="Logo de Diagoriente" />
                </div>
              </Link>
              <div className="pro:hidden pro:lg:flex hidden sm:flex flex-col space-y-2 md:space-y-1 items-center justify-center">
                <img height={43} width={79} src={LogoRepublique} alt="Logo de la République Française" />
                <LogoBeta />
              </div>
            </div>
            <div aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} className="xl:hidden focus:outline-none">
              {open ? (
                <div className="cursor-pointer select-none" onClick={() => setOpen(false)}>
                  <img src={CrossIcon} alt="Cross Icon" />
                </div>
              ) : (
                <div className="cursor-pointer select-none" onClick={() => setOpen(true)}>
                  <img src={MenuIcon} alt="Menu Icon" />
                </div>
              )}
            </div>
            <nav className="hidden xl:block" aria-label="Navigation principale">
              <div className="flex flex-row justify-between items-center text-white space-x-12">
                <Link to="/">
                  <span className="font-bold hover:opacity-70">Accueil</span>
                </Link>
                <NavDivider />
                <Link to="/aide">
                  <span className="font-bold hover:opacity-70">Aide</span>
                </Link>
                <NavDivider />
                <Link to="/a-propos">
                  <span className="font-bold hover:opacity-70">À propos</span>
                </Link>
                <div className="flex flex-row space-x-4">
                  <UIButtonComponent borderSize="lg" variant="outline-secondary">
                    <a
                      className="flex flex-row justify-center items-center space-x-2"
                      href={`${process.env.GATSBY_APPV5_URL}/login`}
                    >
                      <span>Connexion</span>
                      <img src={LoginIcon} alt="Login Icon" />
                    </a>
                  </UIButtonComponent>
                  <UIButtonComponent borderSize="lg">
                    <a href={process.env.GATSBY_APPV5_PRO_URL}>Diagoriente PRO</a>
                  </UIButtonComponent>
                </div>
              </div>
            </nav>
          </div>
        </header>
        <div
          onClick={() => setOpen(false)}
          className={`${open ? 'block' : 'hidden'} fixed -inset-x-0 w-full h-full z-50 block xl:hidden`}
          style={{ backgroundColor: 'rgba(0,0,0,.6)' }}
        >
          <div className="bg-lena-blue pro:bg-lena-blue-dark" style={{ transition: 'all 2s' }}>
            <div className="border-t border-white border-opacity-20">
              <div className="container flex flex-col space-y-4">
                <ul className="pt-3 pb-3 flex flex-col space-y-4">
                  <li className="text-white hover:opacity-70">
                    <Link to="/">Accueil</Link>
                  </li>
                  <li className="text-white hover:opacity-70">
                    <Link to="/aide">Aide</Link>
                  </li>
                  <li className="text-white">
                    <Link to="/a-propos">À propos</Link>
                  </li>
                </ul>
                <div className="pb-3 inline-block">
                  <a
                    href={`${process.env.GATSBY_APPV5_URL}/login`}
                    className="bg-transparent border border-lena-lightgray text-white font-bold py-2 px-4 flex items-center space-x-4 focus:outline-none justify-center rounded-lg"
                    style={{ width: 200, height: 43 }}
                  >
                    Connexion
                    <img src={LoginIcon} alt="Login Icon" />
                  </a>
                </div>
                <div className="pb-5">
                  <UIButtonComponent width={200} height={43} borderSize="lg">
                    <a href={process.env.GATSBY_APPV5_PRO_URL} hrefLang="fr">
                      Diagoriente PRO
                    </a>
                  </UIButtonComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaticHeader;
