import React from 'react';
import { Theme } from 'common/requests/types';
import ParcoursLayout from '../layout/ParcoursLayout';

interface Props {
  competencesValues: string[];
  theme: Theme;
}

const AddExperienceDone = ({ competencesValues, theme }: Props) => {
  return (
    <ParcoursLayout>
      <div className="bg-lena-blue-darkest text-white flex flex-col flex-1 items-center justify-center">
        <div className="container flex flex-col items-center justify-center text-center space-y-8 lg:w-1/2">
          <div className="text-2xl font-bold">Très bien.</div>
          <div className="text-lg">
            Vous avez ajouté une expérience et identifié de nouvelles compétences. Les voici ci dessous récapitulées en
            fonction du CEC. Vous pourrez les retrouver dans votre profil / carte de compétences.
          </div>
          <div>
            Vous pouvez maintenant demander une recommandation pour cette expérience, elle donnera confiance à vos
            futurs recruteurs.
          </div>
          <div className="flex flex-col space-y-4 w-full">
            <button
              className={`mt-2 rounded-md focus:ring-0
            focus:outline-none w-full bg-lena-pink-dark
            text-white py-3 text-center font-bold text-lg`}
            >
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
