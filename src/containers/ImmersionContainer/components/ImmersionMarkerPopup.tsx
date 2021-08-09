import Pill from 'components/design-system/Pill';
import useMediaQuery from 'hooks/useMediaQuery';
import React, { FunctionComponent, useState } from 'react';
import { ReactComponent as ExpandLess } from 'assets/svg/expand_less.svg';
import { ReactComponent as ExpandMore } from 'assets/svg/expand_more.svg';
import { ReactComponent as HeadIcon } from '../../../assets/svg/user_profile.svg';
import { ReactComponent as PinpointIcon } from '../../../assets/svg/pinpoint.svg';
import { ReactComponent as InfoIcon } from '../../../assets/svg/info2.svg';
import { ReactComponent as ContactIcon } from '../../../assets/svg/contact.svg';

const ImmersionMarkerPopup: FunctionComponent<{ result: any }> = ({ result }) => {
  const isDesktop = useMediaQuery('md');
  const [openMobile, setOpenMobile] = useState(false);

  const tags = [
    result.type === 'formation' && result.apiData.ideaType === 'lba' && 'Entreprise',
    result.type === 'formation' && result.apiData.ideaType === 'formation' && 'Formation',
  ].filter(Boolean) as string[];

  return (
    <div className="shadow-md bg-white md:rounded-lg px-4 py-4 pb-8 md:p-4 flex flex-col space-y-4 md:max-w-md">
      {(!isDesktop || tags.length > 0) && (
        <div className="flex flex-row-reverse items-start justify-between space-x-2">
          {!isDesktop && (
            <button className="mt-2" onClick={() => setOpenMobile(!openMobile)}>
              {openMobile ? <ExpandMore /> : <ExpandLess />}
            </button>
          )}
          {tags.length > 0 && (
            <div className="w-full flex flex-row justify-start items-end flex-wrap space-x-2 space-y-2 max-w-md">
              {tags.map((v) => (
                <Pill key={v}>{v}</Pill>
              ))}
            </div>
          )}
        </div>
      )}
      <div>
        <div className="text-lg text-lena-blue-dark font-bold">{result.title}</div>
        {result.apiData.naf_text && <div>{result.apiData.naf_text}</div>}
      </div>
      {(isDesktop || openMobile) && (
        <>
          <div>
            <div className="whitespace-pre-line">{result.location.address.replaceAll(', ', '\n')}</div>
            <div>{result.location.city}</div>
          </div>
          {result.type === 'immersion' && (
            <div
              className={`flex flex-row items-center justify-between space-x-2
      text-sm border-b border-t border-lena-lightgray2 py-2`}
            >
              {result.apiData.headcount_text && (
                <div className="flex items-center justify-start space-x-2">
                  <HeadIcon height={16} width={16} />
                  <div>{result.apiData.headcount_text}</div>
                </div>
              )}
              {result.apiData.distance && (
                <div className="flex items-center justify-start space-x-2">
                  <PinpointIcon height={16} width={16} />
                  <div>{result.apiData.distance} km du centre ville</div>
                </div>
              )}
            </div>
          )}
          <div className="flex items-center justify-start text-lena-blue-dark space-x-2">
            <div className="flex items-center space-x-2 bg-lena-pink-light py-2 px-4 cursor-pointer rounded">
              <InfoIcon height={20} width={20} />
              <span>Conseils</span>
            </div>
            <div className="flex items-center space-x-2 bg-lena-pink-light py-2 px-4 cursor-pointer rounded">
              <ContactIcon height={20} width={20} />
              <span>Contacter</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImmersionMarkerPopup;
