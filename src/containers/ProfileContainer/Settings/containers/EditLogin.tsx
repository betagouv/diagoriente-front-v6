import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as SettingsSvg } from 'assets/svg/settings.svg';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import { ReactComponent as SaveSvg } from 'assets/svg/save_white.svg';
import TextField from 'components/design-system/TextField';
import InputComponent from 'components/Register/Input';
import PrivateBarLayout from 'layouts/PrivateBar';

const EditLoginContainer = () => {
  const history = useHistory();
  return (
    <div className="min-h-screen h-full flex flex-col">
      <PrivateBarLayout />
      <div style={{ background: 'rgb(250,250,250)' }} className="pt-3 flex flex-col justify-start flex-1 pb-20">
        <div className="container">
          <button
            onClick={() => history.push('/profil/reglages')}
            className="flex items-center mb-5 focus:ring-0 focus:outline-none"
          >
            <ArrowLeftSvg />
            <span className="text-sm mt-1 ml-3 text-lena-blue-dark">Retour</span>
          </button>
          <div className="flex flex-col items-center mb-7">
            <h2 className="font-bold text-lena-pink-dark uppercase mt-3 text-center">
              Modifier mes identifiants
              <br /> de connexion
            </h2>
          </div>
          <div className="mx-4 mb-12">
            <div className="mb-4">
              <h3 className="text-lena-blue-dark font-bold">Mes identifiants de connexion</h3>
            </div>
            <div className="flex mb-3 items-center">
              <span className="font-bold w-2/5 block flex-shrink-0">Email</span>
              <TextField placeholder="mail@mail.com" />
            </div>
            <div className="flex mb-3 items-center">
              <span className="font-bold w-2/5 block flex-shrink-0">Mot de passe</span>
              <TextField />
            </div>
            <div className="flex mb-3 items-center">
              <span className="font-bold w-2/5 block flex-shrink-0">Répéter le mot de passe</span>
              <TextField />
            </div>
            <div className="mt-5">
              <span className="text-sm">Votre mot de passe doit contenir 8 caractères minimum, dont :</span>
              <div className="ml-4 mt-2 flex">
                <ul className="list-disc mr-14">
                  <li className="text-sm">1 majuscule</li>
                  <li className="text-sm">1 minuscule</li>
                </ul>
                <ul className="list-disc">
                  <li className="text-sm">1 chiffre</li>
                  <li className="text-sm">1 caractère spécial</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <button
          className={`focus:ring-0 focus:outline-none w-full bg-lena-pink-dark hover:bg-lena-pink-darkest text-white
        py-3 text-center font-bold text-lg flex justify-center`}
        >
          <SaveSvg />
          <span className="ml-5">Enregistrer</span>
        </button>
      </div>
    </div>
  );
};

export default EditLoginContainer;
