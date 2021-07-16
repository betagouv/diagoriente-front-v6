import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import userContext from 'common/contexts/UserContext';
import { ReactComponent as SettingsSvg } from 'assets/svg/settings.svg';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import { ReactComponent as EditSvg } from 'assets/svg/edit_white.svg';
import PrivateBarLayout from 'layouts/PrivateBar';

const ProfileSettingsContainer = () => {
  const history = useHistory();
  const { user } = useContext(userContext);
  return (
    <div className="min-h-screen h-full flex flex-col">
      <PrivateBarLayout />
      <div style={{ background: 'rgb(250,250,250)' }} className="pt-3 flex flex-col justify-start flex-1 pb-20">
        <div className="container">
          <button
            onClick={() => history.push('/profil')}
            className="flex items-center mb-5 focus:ring-0 focus:outline-none"
          >
            <ArrowLeftSvg />
            <span className="text-sm mt-1 ml-3 text-lena-blue-dark">Retour</span>
          </button>
          <div className="flex flex-col items-center mb-7">
            <h2 className="font-bold text-lena-blue-dark uppercase mt-3">Réglages</h2>
          </div>
          <div className="mx-4 mb-12">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lena-blue-dark font-bold">Mes infos</h3>
              <button
                onClick={() => history.push('/profil/reglages/infos')}
                className="focus:outline-none focus:ring-0"
              >
                <EditSvg />
              </button>
            </div>
            <div className="flex border-b border-lena-blue-light pb-3 mb-3">
              <span className="font-bold w-1/2 block flex-shrink-0">Nom</span>
              <span className="block flex-shrink overflow-hidden overflow-ellipsis">{user?.lastName}</span>
            </div>
            <div className="flex border-b border-lena-blue-light pb-3 mb-3">
              <span className="font-bold w-1/2 block flex-shrink-0">Prénom</span>
              <span className="block flex-shrink overflow-hidden overflow-ellipsis">{user?.firstName}</span>
            </div>
            <div className="flex border-b border-lena-blue-light pb-3 mb-3">
              <span className="font-bold w-1/2 block flex-shrink-0">Ville</span>
              <span className="block flex-shrink overflow-hidden overflow-ellipsis">{user?.location.address}</span>
            </div>
            <div className="flex border-b border-lena-blue-light pb-3 mb-3">
              <span className="font-bold w-1/2 block flex-shrink-0">Code groupe</span>
              <span className="block flex-shrink overflow-hidden overflow-ellipsis">{user?.group}</span>
            </div>
          </div>
          <div className="mx-4 mb-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lena-blue-dark font-bold">Mes identifiants de connexion</h3>
              <button
                onClick={() => history.push('/profil/reglages/login')}
                className="focus:outline-none focus:ring-0"
              >
                <EditSvg />
              </button>
            </div>
            <div className="flex border-b border-lena-blue-light pb-3 mb-3">
              <span className="font-bold w-1/2 block flex-shrink-0">Email</span>
              <span className="block flex-shrink overflow-hidden overflow-ellipsis">{user?.email}</span>
            </div>
            <div className="flex border-b border-lena-blue-light pb-3 mb-3">
              <span className="font-bold w-1/2 block flex-shrink-0">Mot de passe</span>
              <span className="block flex-shrink overflow-hidden overflow-ellipsis">**********</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsContainer;
