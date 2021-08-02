import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import userContext from 'common/contexts/UserContext';
import { ReactComponent as EditSvg } from 'assets/svg/edit_white.svg';
import ProfileLayout from '../../../layouts/ProfileLayout/ProfileLayout';

const ProfileSettingsContainer = () => {
  const history = useHistory();
  const { user } = useContext(userContext);

  return (
    <ProfileLayout>
      <div className="container py-8 flex flex-col space-y-8 items-center">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-lena-blue-dark text-xl">Réglages</h2>
        </div>
        <div className="w-3/4 flex flex-col space-y-8">
          <div>
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
          <div>
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
    </ProfileLayout>
  );
};

export default ProfileSettingsContainer;
