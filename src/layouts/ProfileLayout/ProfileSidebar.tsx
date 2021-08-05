import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import classNames from '../../common/utils/classNames';
import { ReactComponent as ProfileIcon } from '../../assets/svg/user_profile.svg';

const ProfileSidebar: FunctionComponent = () => {
  return (
    <div
      className={classNames('w-96 bg-lena-lightgray flex flex-col top-0 left-0 relative', 'filter drop-shadow-sm z-10')}
    >
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex flex-col space-y-8 p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <ProfileIcon className="w-12 h-12 xl:w-16 xl:h-16" />
            <div className="text-center text-lena-blue-dark font-bold md:text-md xl:text-xl">Mon profil</div>
          </div>
          <div className="flex flex-col space-y-4">
            <Link className="text-lena-blue-dark" to="/profil/mes-experiences">
              Mes expériences
            </Link>
            <Link className="text-lena-blue-dark" to="/profil/mes-centres-d-interet">
              Mes centres d'intérêt
            </Link>
            <Link className="text-lena-blue-dark" to="/mon-cv-competences">
              Mon CV compétences
            </Link>
            <Link className="text-lena-blue-dark" to="/mon-top-metiers">
              Mon top métiers
            </Link>
            <Link className="text-lena-blue-dark border-b border-t border-lena-lightgray2 py-4" to="/profil/reglages">
              Mes réglages
            </Link>
            <Link className="text-lena-blue-dark " to="/deconnexion">
              Déconnexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
