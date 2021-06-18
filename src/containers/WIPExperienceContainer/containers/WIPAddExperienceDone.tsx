import React, { FunctionComponent } from 'react';
import AppLayout from 'layouts/AppLayout';
import Illustration from 'assets/images/illu_01.png';

const WipAddExperienceDone: FunctionComponent = () => (
  <AppLayout>
    <div className="bg-lena-blue-darkest text-white flex flex-col flex-1 items-center justify-center">
      <div className="container flex flex-col items-center justify-center text-center space-y-8">
        <div className="text-2xl font-bold">Merci !</div>
        <div className="text-lg">
          Vous avez ajouté avec succès l'expérience <strong>[!!WIP!!]</strong> à votre parcours et identifié de
          nouvelles compétences.
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
            <button className="font-bold text-lg mt-3">Passer cette étape</button>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
);

export default WipAddExperienceDone;
