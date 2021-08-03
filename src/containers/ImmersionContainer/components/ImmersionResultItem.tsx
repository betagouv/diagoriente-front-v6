import React, { FunctionComponent } from 'react';
import { ReactComponent as PictoFormation } from 'assets/svg/picto_formation.svg';
import Pill from '../../../components/design-system/Pill';

const ImmersionResultItem: FunctionComponent = () => {
  const address = '292 RUE CAMILLE GUERIN\n59800 LILLE\n07 XX XX XX XX';
  const tags = ['stage', 'immersion en entreprise', 'formation', 'apprentissage', 'emploi', "mission d'engagement"];

  return (
    <div
      className={`w-full bg-lena-lightgray px-4 py-4 rounded-lg
    focus:ring-0 focus:outline-none text-left space-y-4`}
    >
      <div className="w-full flex flex-row justify-end items-end flex-wrap space-x-2 space-y-2">
        {tags.map((v) => (
          <Pill key={v}>{v}</Pill>
        ))}
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
