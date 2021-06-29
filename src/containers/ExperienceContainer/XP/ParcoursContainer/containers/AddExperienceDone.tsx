import React, { FunctionComponent, useContext } from 'react';
import Illustration from 'assets/images/illu_01.png';
import ParcoursLayout from '../layout/ParcoursLayout';
import { NewExperienceContext } from '../../../../../contexts/NewExperienceContext';

const AddExperienceDone: FunctionComponent = () => {
  const { theme } = useContext(NewExperienceContext);

  return (
    <ParcoursLayout>
      <div className="bg-lena-blue-darkest text-white flex flex-col flex-1 items-center justify-center">
        <div className="container flex flex-col items-center justify-center text-center space-y-8 lg:w-1/2">
          <div className="text-2xl font-bold">Merci !</div>
          <div className="text-lg">
            Vous avez ajouté avec succès l'expérience <strong className="uppercase">{theme?.name}</strong> à votre
            parcours et identifié de nouvelles compétences.
          </div>
          <div>
            <img src={Illustration} alt="Illustration" />
          </div>
          <div>
            Vous pouvez maintenant demander une <strong>recommandation</strong> pour cette expérience, elle donnera
            confiance à vos futurs recruteurs.
          </div>
          <div className="flex flex-col space-y-4 w-full">
            <button className="mt-2 rounded-md focus:ring-0 focus:outline-none w-full bg-lena-pink-dark text-white py-3 text-center font-bold text-lg">
              Être recommandé.e
            </button>
            <div className="text-center">
              <button className="font-bold text-lg mt-3 focus:ring-0, focus:outline-none">Passer cette étape</button>
            </div>
          </div>
        </div>
      </div>
    </ParcoursLayout>
  );
};

export default AddExperienceDone;
