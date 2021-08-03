import Pill from 'components/design-system/Pill';
import React, { FunctionComponent } from 'react';
import { ReactComponent as PictoFormation } from '../../../assets/svg/picto_formation.svg';

const ImmersionMarkerPopup: FunctionComponent = () => {
  const address = '292 RUE DU SAVOIR\n59800 LILLE\n07 XX XX XX XX';
  const tags = ['stage', 'immersion en entreprise', 'formation', 'apprentissage', 'emploi', "mission d'engagement"];

  return (
    <div className="shadow-md bg-white md:rounded-lg p-4 flex flex-col space-y-4">
      <div className="flex flex-row justify-end items-end flex-wrap space-x-2 space-y-2 max-w-md">
        {tags.map((v) => (
          <Pill key={v}>{v}</Pill>
        ))}
      </div>
      <div>
        <div className="text-lg text-lena-blue-dark font-bold">K2M GENIE CLIMATIQUE</div>
        <div>Travaux d'installation d'eau et de gaz en tous locaux</div>
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

export default ImmersionMarkerPopup;
