import React, { FunctionComponent } from 'react';
import AppLayout from 'layouts/AppLayout';
import Illustration from 'assets/images/illu_01.png';
import Button from 'components/design-system/Button';

const WipAddExperienceDone: FunctionComponent = () => (
  <AppLayout>
    <div className="bg-lena-blue-darkest text-white flex flex-col flex-1 items-center justify-center">
      <div className="container flex flex-col items-center justify-center text-center space-y-8">
        <div className="text-2xl font-bold">Merci !</div>
        <div>
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
        <div className="flex flex-col items-center justify-center space-y-4">
          <Button variant="primary" size="md">
            Être recommandé.e
          </Button>
          <Button className="font-bold text-white">Passer cette étape</Button>
        </div>
      </div>
    </div>
  </AppLayout>
);

export default WipAddExperienceDone;
