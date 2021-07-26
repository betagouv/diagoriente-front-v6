import React, { FunctionComponent } from 'react';
import { ReactComponent as ProfileIcon } from 'assets/svg/user_profile.svg';
import { Link } from 'react-router-dom';
import AppHeader from '../AppHeader';

const ProfileLayoutForDesktop: FunctionComponent = ({ children }) => {
  return (
    <div className="min-h-screen h-full flex flex-col">
      <AppHeader />
      <div className="flex flex-row flex-1">
        <div className="w-96 bg-lena-lightgray flex flex-col top-0 left-0 relative">
          <div className="flex flex-col justify-between flex-grow">
            <div className="flex flex-col space-y-8 p-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <ProfileIcon className="w-12 h-12 xl:w-16 xl:h-16" />
                <div className="text-center text-lena-blue-dark font-bold md:text-md xl:text-xl">Mon profil</div>
              </div>
              <div className="flex flex-col space-y-4">
                <div>
                  <Link className="text-lena-blue-dark font-bold" to="/profil/mes-experiences">
                    Mes expériences
                  </Link>
                  <div className="flex flex-col">
                    <Link to="/profil/mes-experiences/professionnal">Professionnelles</Link>
                    <Link to="/profil/mes-experiences/personal">Personnelles</Link>
                    <Link to="/profil/mes-experiences/voluntary">Bénévolat et volontariat</Link>
                  </div>
                </div>
                <div>
                  <strong className="text-lena-blue-dark font-bold">Mes centres d'intérêt</strong>
                </div>
                <div>
                  <strong className="text-lena-blue-dark font-bold">Réglages</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:relative">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayoutForDesktop;
