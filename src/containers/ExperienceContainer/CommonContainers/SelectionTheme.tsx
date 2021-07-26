/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Theme } from 'common/requests/types';
import { useLazyTheme } from 'common/requests/themes';

import { ReactComponent as PictoExpPerso } from 'assets/svg/exp_perso_lg.svg';
import { ReactComponent as ArrowDownSvg } from 'assets/svg/arrow_down.svg';
import { ReactComponent as LoveSvg } from 'assets/svg/comp_eng.svg';
import { ReactComponent as LoveWhiteSvg } from 'assets/svg/love_white.svg';
import { ReactComponent as CrossSvg } from 'assets/svg/cross.svg';
import classNames from 'common/utils/classNames';
import useMediaQuery from 'hooks/useMediaQuery';
import ReactTooltip from 'react-tooltip';
import ParcoursLayout from '../layout/ParcoursLayout';

type MobileChoiceDomainProps = {
  onClose: () => void;
  data: Theme[] | undefined;
  setTheme: (theme: Theme) => void;
  theme: Theme;
};
type WebChoiceDomainProps = {
  data: Theme[] | undefined;
  setTheme: (theme: Theme) => void;
  theme: Theme;
};
type SelectionProps = {
  data: Theme[] | undefined;
  setTheme: (theme: Theme) => void;
  theme: Theme;
};

const MobileChoiceDomain = ({ onClose, setTheme, theme, data }: MobileChoiceDomainProps) => {
  const history = useHistory();
  const [selectedDomain, setSelectedDomain] = useState<Theme>();
  const [activeDomain, setActiveDomain] = useState(String);
  const [themeCall, themeState] = useLazyTheme({ fetchPolicy: 'network-only' });

  const controlSelected = (dataSelected: any) => {
    if (activeDomain === dataSelected.id && selectedDomain?.id === dataSelected.id) {
      setSelectedDomain(dataSelected);
      setActiveDomain('');
    } else if (selectedDomain?.id !== dataSelected.id && activeDomain !== dataSelected.id) {
      setActiveDomain(dataSelected.id);
      setSelectedDomain(dataSelected);
      themeCall({ variables: { id: dataSelected.id } });
    } else {
      setActiveDomain('');
      setSelectedDomain(undefined);
    }
  };
  const handleValidate = () => {
    if (selectedDomain) {
      setTheme(selectedDomain);
      if (theme) {
        history.push(`${activeDomain}/activite?type=${selectedDomain.domain}`);
      }
    }
  };

  return (
    <div className="pb-20">
      <ul>
        <li>
          {data?.map((d) => (
            <div className="border-b border-lena-lightgray2">
              <button
                onClick={() => controlSelected(d)}
                key={d.id}
                className={classNames(
                  'w-full py-3 flex items-center px-10 focus:outline-none focus:ring-0',
                  selectedDomain?.id === d.id ? 'bg-lena-turquoise-light' : '',
                )}
              >
                <LoveSvg />
                <span className={classNames('ml-8', selectedDomain?.id === d.id && 'font-bold')}>{d.title}</span>
              </button>
              {activeDomain === d.id && selectedDomain?.id === d.id && themeState.data?.theme.activities.length !== 0 && (
                <div className="px-14 py-4">
                  <ul className="list-disc">
                    {themeState.data?.theme.activities.map((a) => (
                      <li>{a.title}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </li>
      </ul>
      <div className="fixed top-3 right-5">
        <button
          onClick={() => onClose.call(null)}
          className="bg-lena-blue p-2 rounded-full focus:ring-0 focus:outline-none"
          style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15))' }}
        >
          <CrossSvg fill="#fff" />
        </button>
      </div>
      {selectedDomain && (
        <div className="fixed bottom-0 left-0 right-0">
          <button onClick={handleValidate} className="bg-lena-blue py-3 font-bold w-full text-white">
            Valider
          </button>
        </div>
      )}
    </div>
  );
};

const WebDomainDisplay = ({ data, theme, setTheme }: WebChoiceDomainProps) => {
  const history = useHistory();
  const [themeCall, themeState] = useLazyTheme({ fetchPolicy: 'network-only' });

  const controlSelected = (dataSelected: any) => {
    setTheme(dataSelected);
  };
  const handleNext = () => {
    setTheme(theme);
    if (theme) {
      history.push(`${theme?.id}/activite?type=${theme.domain}`);
    }
  };

  return (
    <>
      <div className="mx-auto w-3/5">
        <div className="grid grid-cols-4 gap-5 mt-10">
          {data?.map((f) => (
            <button
              onClick={() => controlSelected(f)}
              className={classNames(
                'rounded-xl p-5 cursor-pointer border-4  focus:ring-0 focus:outline-none',
                theme && theme?.id === f.id
                  ? 'bg-lena-blue-light border-lena-blue-inter'
                  : 'hover:bg-lena-turquoise-light border-transparent',
              )}
              data-tip="Info"
              data-for={f.id}
              /* onMouseEnter={() => themeCall({ variables: { id: f.id } })} */
            >
              <div className="flex flex-col items-center">
                {theme && theme.id === f.id ? <LoveWhiteSvg /> : <LoveSvg />}
                <span className="block mt-5">{f.title}</span>
              </div>
              {/* <ReactTooltip id={f.id} place="right" type="light" effect="solid">
                <ul className="list-disc text-left">
                  {themeState.data?.theme.activities.map((a) => (
                    <li>{a.title}</li>
                  ))}
                </ul>
              </ReactTooltip> */}
            </button>
          ))}
        </div>
      </div>
      {theme && (
        <button
          className={`focus:ring-0 focus:outline-none w-full bg-lena-blue
          text-white py-3 text-center font-bold text-lg md:w-72 md:rounded-lg mt-10`}
          onClick={handleNext}
        >
          Valider
        </button>
      )}
    </>
  );
};

const SelectionTheme = ({ data, theme, setTheme }: SelectionProps) => {
  const [showMobileChoice, setShowMobileChoice] = useState(false);
  const mediaQueryMD = useMediaQuery('md');

  return !showMobileChoice ? (
    <ParcoursLayout>
      <div className="container py-8 flex flex-col items-center justify-start space-y-8 md:p-14">
        <div className="md:flex md:flex-col md:items-start flex flex-col items-center space-y-8 md:space-y-5 w-full">
          {mediaQueryMD ? (
            <div className="flex flex-col w-full items-center">
              <h2 className="text-lena-blue-dark text-center font-bold text-xl leading-10">
                Sélectionnez le domaine de l’expérience personnelle que vous souhaitez ajouter :
              </h2>
              <WebDomainDisplay data={data} theme={theme} setTheme={setTheme} />
            </div>
          ) : (
            <>
              <div
                className={`flex flex-col justify-center items-center
              bg-lena-lightgray rounded-full h-56 w-56 space-y-2 p-4 md:hidden`}
              >
                <PictoExpPerso style={{ height: 60 }} />
                <div className="text-center text-lena-blue-dark font-bold text-xl">Mes expériences personnelles</div>
              </div>
              <div className="flex flex-col justify-start w-full px-5">
                <div className="text-lena-blue-dark mb-5">Selectionnez un domaine :</div>
                <button
                  onClick={() => setShowMobileChoice(true)}
                  className={`border-2 w-full py-4 rounded-md focus:ring-0
                  focus:outline-none flex items-center justify-between px-8`}
                  style={{ borderColor: '#e1e7f7' }}
                >
                  <span className="text-lena-blue-dark">Aucun domaine choisi</span>
                  <ArrowDownSvg />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </ParcoursLayout>
  ) : (
    <MobileChoiceDomain onClose={() => setShowMobileChoice(false)} data={data} theme={theme} setTheme={setTheme} />
  );
};

export default SelectionTheme;
