import Pill from 'components/design-system/Pill';
import useMediaQuery from 'hooks/useMediaQuery';
import React, { FunctionComponent, useState } from 'react';
import { ReactComponent as PictoFormation } from 'assets/svg/picto_formation.svg';
import { ReactComponent as GripIcon } from 'assets/svg/grip.svg';

const ImmersionMarkerPopup: FunctionComponent = () => {
  const isDesktop = useMediaQuery('md');
  const [openMobile, setOpenMobile] = useState(false);

  const address = '292 RUE DU SAVOIR\n59800 LILLE\n07 XX XX XX XX';
  const tags = ['stage', 'immersion en entreprise'];

  return (
    <div className="shadow-md bg-white md:rounded-lg px-4 py-4 pb-8 md:p-4 flex flex-col space-y-4">
      <div className="flex flex-row items-start justify-between space-x-2">
        {!isDesktop && (
          <button className="mt-2" onClick={() => setOpenMobile(!openMobile)}>
            <GripIcon />
          </button>
        )}
        <div className="w-full flex flex-row justify-end items-end flex-wrap space-x-2 space-y-2 max-w-md">
          {tags.map((v) => (
            <Pill key={v}>{v}</Pill>
          ))}
        </div>
      </div>
      <div>
        <div className="text-lg text-lena-blue-dark font-bold">K2M GENIE CLIMATIQUE</div>
        <div>Travaux d'installation d'eau et de gaz en tous locaux</div>
      </div>
      {(isDesktop || openMobile) && (
        <>
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
        </>
      )}
    </div>
  );
};

export default ImmersionMarkerPopup;
