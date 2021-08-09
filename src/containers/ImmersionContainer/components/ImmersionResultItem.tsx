import React, { FunctionComponent } from 'react';
import { ReactComponent as PictoFormation } from 'assets/svg/picto_formation.svg';
import Pill from '../../../components/design-system/Pill';

const ImmersionResultItem: FunctionComponent<{ result: any }> = ({ result }) => {
  const tags = [result.pmsmp && 'immersion en entreprise'].filter(Boolean);

  return (
    <div
      className={`w-full bg-lena-lightgray px-4 py-4 rounded-lg
    focus:ring-0 focus:outline-none text-left space-y-4`}
    >
      {tags.length > 0 && (
        <div className="w-full flex flex-row justify-end items-end flex-wrap space-x-2 space-y-2 max-w-md">
          {tags.map((v) => (
            <Pill key={v}>{v}</Pill>
          ))}
        </div>
      )}
      <div>
        <div className="text-lena-blue-dark font-bold">{result.title}</div>
        {result.apiData.naf_text && <div>{result.apiData.naf_text}</div>}
      </div>
      <div>
        <div className="whitespace-pre-line">{result.location.address.replaceAll(', ', '\n')}</div>
        <div>{result.location.city}</div>
      </div>
      <div className="flex flex-row items-center justify-between space-x-2 text-sm">
        {result.apiData.headcount_text && (
          <div className="flex items-center justify-start space-x-2">
            <PictoFormation />
            <div>{result.apiData.headcount_text}</div>
          </div>
        )}
        {result.apiData.distance && (
          <div className="flex items-center justify-start space-x-2">
            <PictoFormation />
            <div>{result.apiData.distance} km du centre ville</div>
          </div>
        )}
      </div>
      <div className="flex items-end text-sm font-bold text-lena-turquoise-dark py-1">Conseils de contact</div>
    </div>
  );
};

export default ImmersionResultItem;
