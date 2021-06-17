import React, { FunctionComponent } from 'react';
import ParcoursLayout from '../ParcoursLayout';

const WipChoixActivites: FunctionComponent = () => {
  return (
    <ParcoursLayout>
      <div>
        <div className="text-lena-blue-dark">
          Dans le cadre de la boulangerie, quelles sont les <strong>activités</strong> que vous pratiquez ?
        </div>
        <div className="italic">Plusieurs choix possibles</div>
      </div>
      <div className="bg-lena-blue text-white fixed h-16 left-0 bottom-0 w-full flex items-center justify-center">
        Suivant
      </div>
    </ParcoursLayout>
  );
};

export default WipChoixActivites;
