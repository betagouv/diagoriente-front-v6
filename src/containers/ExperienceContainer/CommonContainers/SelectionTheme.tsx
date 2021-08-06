/* eslint-disable max-len */
import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ThemeContext from 'common/contexts/ThemeContext';
import { Theme } from 'common/requests/types';
import { useLazyThemes, useLazyTheme, ThemeListItem } from 'common/requests/themes';
import { useDidMount } from 'common/hooks/useLifeCycle';
import { isEmpty } from 'lodash';
import { ReactComponent as PictoExpPerso } from 'assets/svg/picto-ajout-xp-perso.svg';
import { ReactComponent as PictoExpBenevolat } from 'assets/svg/picto-ajout-xp-benevolat.svg';
import { ReactComponent as ArrowDownSvg } from 'assets/svg/arrow_down.svg';
import { ReactComponent as LoveWhiteSvg } from 'assets/svg/love_white.svg';
import { ReactComponent as CrossSvg } from 'assets/svg/cross.svg';
import { capitalizeFirstLetter } from 'common/utils/capitalize';
import classNames from 'common/utils/classNames';
import useMediaQuery from 'hooks/useMediaQuery';
import ReactTooltip from 'react-tooltip';
import ParcoursExperienceLayout from 'layouts/ParcoursExperienceLayout/ParcoursExperienceLayout';
import { decodeUri } from 'common/utils/url';
import translateExperienceType from '../../../utils/translateExperienceType';
import AppLoader from '../../../components/ui/AppLoader';

type MobileChoiceDomainProps = {
  onClose: () => void;
  data: ThemeListItem[] | undefined;
};
type WebChoiceDomainProps = {
  data: ThemeListItem[] | undefined;
};

const MobileChoiceDomain = ({ onClose, data }: MobileChoiceDomainProps) => {
  const history = useHistory();
  const { setTheme } = useContext(ThemeContext);
  const [selectedDomain, setSelectedDomain] = useState<Omit<Theme, 'activities'> | null>(null);
  const [activeDomain, setActiveDomain] = useState(String);
  const [themeCall, themeState] = useLazyTheme({ fetchPolicy: 'network-only' });

  const controlSelected = (dataSelected: any) => {
    if (activeDomain === dataSelected.id && selectedDomain?.id === dataSelected.id) {
      setSelectedDomain(dataSelected);
      setActiveDomain('');
      setTheme(dataSelected);
    } else if (selectedDomain?.id !== dataSelected.id && activeDomain !== dataSelected.id) {
      setActiveDomain(dataSelected.id);
      setSelectedDomain(dataSelected);
      themeCall({ variables: { id: dataSelected.id } });
      setTheme(dataSelected);
    } else {
      setActiveDomain('');
      setSelectedDomain(null);
    }
  };
  const handleValidate = () => {
    if (selectedDomain) {
      if (selectedDomain) {
        history.push(`${activeDomain}/date`);
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
                  'w-full py-3 flex items-center px-6 focus:outline-none focus:ring-0 relative',
                  selectedDomain?.id === d.id ? 'bg-lena-turquoise-light' : '',
                )}
              >
                <LoveWhiteSvg />
                <p className={classNames('ml-6 text-base truncate', selectedDomain?.id === d.id && 'font-bold')}>
                  {capitalizeFirstLetter(d.title.replaceAll('/', ','))}
                </p>
                {selectedDomain?.id === d.id && (
                  <div className="absolute right-4 ">
                    <ArrowDownSvg className="transform rotate-180 " />
                  </div>
                )}
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

      <div className="fixed bottom-0 left-0 right-0">
        {selectedDomain && (
          <button onClick={handleValidate} className="bg-lena-blue py-3 font-bold w-full text-white">
            Valider
          </button>
        )}
      </div>
    </div>
  );
};

const WebDomainDisplay = ({ data }: WebChoiceDomainProps) => {
  const history = useHistory();
  const { setTheme } = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState<Omit<Theme, 'activities'> | null>(null);
  const controlSelected = (dataSelected: any) => {
    setSelectedTheme(dataSelected);
    setTheme(dataSelected);
  };
  const handleNext = () => {
    if (selectedTheme) {
      history.push(`${selectedTheme?.id}/date`);
    }
  };
  return (
    <>
      <div className="w-11/12 flex-1">
        {!data && <AppLoader />}
        {data && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-2 justify-start">
            {data?.map((f) => (
              <button
                key={f.id}
                onClick={() => controlSelected(f)}
                className={classNames(
                  'rounded-xl cursor-pointer border-4 focus:ring-0 focus:outline-none',
                  'flex flex-col items-start justify-around',
                  selectedTheme?.id === f.id
                    ? 'bg-lena-blue-light border-lena-blue-inter'
                    : 'hover:bg-lena-turquoise-light border-transparent',
                )}
                data-tip="Info"
                data-for={f.id}
              >
                <div className="flex flex-col items-center flex-1 w-full justify-start space-y-2 py-1">
                  <LoveWhiteSvg />
                  <span className="block">{capitalizeFirstLetter(f.title)}</span>
                </div>
                <ReactTooltip id={f.id} place="right" type="light" effect="solid">
                  <ul className="list-disc text-left">
                    {f.activities.map((a: any) => (
                      <li>{a.title}</li>
                    ))}
                  </ul>
                </ReactTooltip>
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        className={classNames(
          `focus:ring-0 focus:outline-none w-full bg-lena-blue
          text-white py-3 text-center font-bold text-lg md:w-72 md:rounded-lg`,
          isEmpty(selectedTheme) && 'bg-gray-300',
        )}
        onClick={handleNext}
        disabled={isEmpty(selectedTheme)}
      >
        Valider
      </button>
    </>
  );
};

const SelectionTheme = () => {
  const [showMobileChoice, setShowMobileChoice] = useState(false);

  const mediaQueryMD = useMediaQuery('md');
  const location = useLocation();
  const params = decodeUri(location.search);
  const [loadThemes, stateLoadTheme] = useLazyThemes({ fetchPolicy: 'network-only', variables: { sort: 'title' } });

  useDidMount(() => {
    if (params.type) {
      loadThemes({ variables: { domain: params.type as 'personal' | 'professional' | 'voluntary' } });
    }
  });

  return !showMobileChoice ? (
    <ParcoursExperienceLayout>
      <div className="container py-8 flex flex-col flex-1 items-center justify-start space-y-8 md:px-14 bg-lena-blue-dark md:bg-transparent">
        <div className="flex flex-col items-center flex-1 space-y-8 md:space-y-5 w-full">
          {mediaQueryMD ? (
            <div className="flex flex-col w-full items-center justify-start flex-1 space-y-8">
              <h2 className="text-lena-blue-dark text-center font-bold text-xl leading-10">
                Sélectionnez le domaine de l’expérience {translateExperienceType(params.type).singular} que vous
                souhaitez ajouter :
              </h2>
              <WebDomainDisplay data={stateLoadTheme.data?.themes.data} />
            </div>
          ) : (
            <div className="relative flex-1 h-full">
              <div
                className={classNames(
                  'absolute -right-16 -top-0 h-32 w-32',
                  params.type === 'voluntary' ? 'bg-parcours-voluntary' : 'bg-parcours-perso',
                )}
                style={{ borderRadius: 50 }}
              />
              <div
                className={classNames(
                  'absolute -left-16 bottom-44 h-32 w-32',
                  params.type === 'voluntary' ? 'bg-parcours-voluntary' : 'bg-parcours-perso',
                )}
                style={{ borderRadius: 50 }}
              />
              <div
                className="absolute right-16 bottom-24"
                style={{ borderRadius: 50, transform: 'scaleX(-0.5) scaleY(0.5)' }}
              >
                {params.type === 'voluntary' ? <PictoExpBenevolat /> : <PictoExpPerso />}
              </div>
              <div className="flex flex-col items-center justify-center space-y-8 pt-8 z-20">
                <div className="flex flex-col items-center justify-center space-y-8">
                  {params.type === 'voluntary' ? <PictoExpBenevolat /> : <PictoExpPerso />}
                  <div className="text-center text-white font-bold text-4xl">
                    Ajout d'expérience {params.type === 'voluntary' ? 'en bénévolat et volontariat' : 'personnelle'}
                  </div>
                </div>
                <div className="flex flex-col justify-start items-center w-full px-5 z-20">
                  <div className="text-white mb-5">Sélectionnez un domaine :</div>
                  <button
                    onClick={() => setShowMobileChoice(true)}
                    className={`border-2 w-full py-4 rounded-md focus:ring-0
                  focus:outline-none flex items-center bg-white justify-between px-8`}
                    style={{ borderColor: '#e1e7f7' }}
                  >
                    <span className="text-lena-blue-dark">Aucun domaine choisi</span>
                    <ArrowDownSvg />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ParcoursExperienceLayout>
  ) : (
    <MobileChoiceDomain onClose={() => setShowMobileChoice(false)} data={stateLoadTheme.data?.themes.data} />
  );
};

export default SelectionTheme;
