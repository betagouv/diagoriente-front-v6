import React, { FunctionComponent } from 'react';
import { ReactComponent as PictoFormation } from 'assets/svg/picto_formation.svg';

const ImmersionResultItem: FunctionComponent = () => {
  const address = '292 RUE CAMILLE GUERIN\n59800 LILLE\n07 XX XX XX XX';

  return (
    <div
      className={`w-full bg-lena-lightgray px-5 py-7 rounded-lg
    focus:ring-0 focus:outline-none text-left space-y-4`}
    >
      <div className="flex flex-row justify-end items-end gap-x-2">
        <div className="bg-lena-blue-lightest text-lena-blue-dark rounded-full px-3 py-1 text-center">immersion</div>
        <div className="bg-lena-blue-lightest text-lena-blue-dark rounded-full px-3 py-1 text-center">
          stage en entreprise
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lena-blue-dark">K2M GENIE CLIMATIQUE</h3>
        <p className="text-lena-black text-sm">Travaux d'installation d'eau et de gaz en tous locaux</p>
      </div>
      <div>
        <pre>{address}</pre>
      </div>
      <div className="flex flex-row justify-between">
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-start space-x-2">
            <PictoFormation />
            <div>0 à 49 salariés</div>
          </div>
          <div className="flex items-center justify-start space-x-2">
            <PictoFormation />
            <div>1 km du centre ville</div>
          </div>
        </div>
        <div className="flex items-end text-sm font-bold text-lena-turquoise-dark py-1">Conseils de contact</div>
      </div>
    </div>
  );
};

export default ImmersionResultItem;
