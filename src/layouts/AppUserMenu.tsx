import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as StarSvg } from '../assets/svg/star_m.svg';
import { ReactComponent as HeartSvg } from '../assets/svg/heart_m.svg';
import { ReactComponent as CVSvg } from '../assets/svg/cv_m.svg';
import { ReactComponent as SettingsSvg } from '../assets/svg/settings_m.svg';
import { ReactComponent as SearchSvg } from '../assets/svg/search_m.svg';
import { ReactComponent as LogoutSvg } from '../assets/svg/logout.svg';

export const AppUserMenu = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
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
  );
});
