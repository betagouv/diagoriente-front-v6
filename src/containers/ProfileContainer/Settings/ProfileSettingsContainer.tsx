import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as SettingsSvg } from 'assets/svg/settings.svg';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import { ReactComponent as EditSvg } from 'assets/svg/edit_white.svg';

const ProfileSettingsContainer = () => {
  const history = useHistory();
  return (
    <div className="min-h-screen h-full flex flex-col">
      <div style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)' }} className="bg-lena-blue-dark py-5">
        <div className="container flex items-center justify-between">
          <span className="uppercase font-bold text-white text-xl">LÉNA MAZILU</span>
          <button className="">
            <SettingsSvg />
          </button>
        </div>
      </div>
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
              <span className="block flex-shrink overflow-hidden overflow-ellipsis">Mazilu</span>
            </div>
            <div className="flex border-b border-lena-blue-light pb-3 mb-3">
              <span className="font-bold w-1/2 block flex-shrink-0">Prénom</span>
              <span className="block flex-shrink overflow-hidden overflow-ellipsis">Léna</span>
            </div>
            <div className="flex border-b border-lena-blue-light pb-3 mb-3">
              <span className="font-bold w-1/2 block flex-shrink-0">Ville</span>
              <span className="block flex-shrink overflow-hidden overflow-ellipsis">Paris</span>
            </div>
            <div className="flex border-b border-lena-blue-light pb-3 mb-3">
              <span className="font-bold w-1/2 block flex-shrink-0">Code groupe</span>
              <span className="block flex-shrink overflow-hidden overflow-ellipsis">1234567</span>
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
              <span className="block flex-shrink overflow-hidden overflow-ellipsis">mail@mail.fr</span>
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
