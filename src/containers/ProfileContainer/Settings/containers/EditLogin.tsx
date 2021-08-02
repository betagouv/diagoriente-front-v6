import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import { ReactComponent as SaveSvg } from 'assets/svg/save_white.svg';
import TextField from 'components/design-system/TextField';
import Button from 'components/design-system/Button';
import useMediaQuery from 'hooks/useMediaQuery';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';

const EditLoginContainer = () => {
  const history = useHistory();
  const isDesktop = useMediaQuery('md');

  return (
    <ProfileLayout>
      <div className="bg-white py-4 flex flex-col justify-start flex-1">
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
            <div className="flex mb-3 items-center">
              <div className="hidden md:block w-2/5 block flex-shrink-0" />
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
            <div className="flex flex-row items-center justify-center py-8">
              <Button variant="primary" mobileStacked={true} size="md">
                {!isDesktop && <SaveSvg />}
                <span>Enregistrer</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default EditLoginContainer;
