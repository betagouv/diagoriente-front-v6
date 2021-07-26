import React, { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as PictoExpPro } from 'assets/svg/exp_professional.svg';
import SearchSvg from 'assets/images/svg/picto/search.svg';
import CrossSvg from 'assets/images/svg/picto/cross_turquoise.svg';
import HelpSvg from 'assets/images/svg/picto/help.svg';
import HelpLightSvg from 'assets/images/svg/picto/help_light.svg';
import classNames from 'common/utils/classNames';

import useMediaQuery from 'hooks/useMediaQuery';
import { useLazyThemes } from 'common/requests/themes';
import { Tag, Theme } from 'common/requests/types';
import { useListTags } from 'common/requests/tags';
import ParcoursLayout from '../../../layout/ParcoursLayout';

type JobTag = {
  id: string;
  domains: Theme[];
  onSelect: (job: Theme) => void;
};

const SearchJobTag: FunctionComponent<JobTag> = ({ domains, onSelect, children }) => {
  return (
    <div>
      <div
        className={`focus:ring-0 focus:outline-none w-full py-1 text-left
      flex justify-between border-b border-lena-lightgray2`}
      >
        {children}
      </div>
      {domains.map((t) => (
        <div
          onClick={() => onSelect.call(null, t)}
          className="cursor-pointer px-4 py-1 divide-y divide-lena-lightgray2"
        >
          {t?.title}
        </div>
      ))}
    </div>
  );
};

type JobDomain = {
  job: Theme;
  idActive?: string;
  onActive: (e: string | undefined) => void;
  onSelect: (job: Theme) => void;
};

const SearchJobDomain: FunctionComponent<JobDomain> = ({ job, idActive, onActive, onSelect, children }) => {
  return (
    <div>
      <div
        className={classNames(
          'flex px-8',
          job.id === idActive && 'bg-lena-lightgray bg-opacity-50 border-lena-lightgray2',
        )}
      >
        <button
          className={classNames(
            'focus-:ring-0 focus:outline-none w-full py-1 text-left flex justify-between',
            job.id === idActive && 'bg-lena-lightgray bg-opacity-50 border-lena-lightgray2',
            job.id !== idActive && 'border-white',
          )}
          onClick={() => onSelect.call(null, job)}
        >
          {children}
        </button>
        <button
          className="focus:ring-0 focus:outline-none pl-5"
          onClick={() => onActive.call(null, job.id === idActive ? undefined : job.id)}
        >
          <img className="ml-3" src={job.id === idActive ? HelpLightSvg : HelpSvg} alt="Aide" />
        </button>
      </div>
      <div className="px-9">
        {job.id === idActive && (
          <ul className="list-disc px-4 py-1 list-inside">
            {/** {activities &&
              activities.map((activity) => (
                <li key={activity.id} className="whitespace-nowrap overflow-ellipsis overflow-hidden text-sm">
                  {activity.title}
                </li>
              ))} */}
          </ul>
        )}
      </div>
    </div>
  );
};

type SearchProps = {
  open: boolean;
  onClose: () => void;
  setTheme: (theme: Theme) => void;
  theme: Theme;
};

const WIPSearchTheme: FunctionComponent<SearchProps> = ({ open, onClose, setTheme, theme }) => {
  const history = useHistory();
  const inputRef = useRef<any>(null);
  const [domainHelp, setDomainHelp] = useState<string | undefined>(undefined);

  const [text, setText] = useState(String);

  const [getThemesCall, getThemesState] = useLazyThemes();
  const [getTagsCall, getTagsState] = useListTags();

  const handleThemes = (title: string) => {
    setText(title);
    getThemesCall({ variables: { domain: 'professional', title } });
    getTagsCall({ variables: { title } });
  };

  useEffect(() => {
    if (open) {
      inputRef.current.focus();
    }
  }, [open]);

  // TODO: pass job object
  const handleSelectJob = (job: Theme) => {
    setTheme(job);
    if (job) {
      history.push(`${job?.id}/domaine?type=${job.domain}`);
    }
  };

  return (
    <div>
      <div className="bg-lena-lightgray py-4 text-center px-7">
        <div className="flex justify-end mb-3">
          <button
            onClick={() => onClose.call(null)}
            className="focus:ring-0 focus:outline-none bg-white p-2 rounded-full shadow-lg"
          >
            <img src={CrossSvg} alt="Cross Svg" />
          </button>
        </div>
        <div className="w-full border border-lena-gray-light px-2 flex bg-white rounded-md">
          <img src={SearchSvg} alt="Search Icon" className="mr-2" />
          <input
            value={text}
            onChange={(e) => handleThemes(e.currentTarget.value)}
            ref={inputRef}
            className="w-full bg-transparent focus:ring-0 focus:outline-none py-2"
          />
        </div>
      </div>
      <div className="divide-y divide-lena-lightgray2" style={{ boxShadow: '0 -5px 5px -5px rgba(0,0,0,.2)' }}>
        <div>
          <div className="py-1 px-8 bg-lena-lightgray bg-opacity-50">
            <strong>Métiers</strong>
          </div>
          <div className="divide-y divide-lena-lightgray2">
            {getThemesState &&
              getThemesState.data?.themes.data.map((domain) => (
                <SearchJobDomain
                  onActive={(e: string | undefined) => setDomainHelp(e)}
                  idActive={domainHelp}
                  key={domain.id}
                  job={domain}
                  onSelect={handleSelectJob}
                >
                  {domain.title}
                </SearchJobDomain>
              ))}
          </div>
        </div>
        <div>
          <div className="py-1 px-7 bg-lena-lightgray bg-opacity-50">
            <strong>Tags</strong>
          </div>
          <div className="divide-y divide-lena-lightgray2 px-8">
            {getTagsState &&
              getTagsState.data?.tags.data.map((domain) => (
                <SearchJobTag key={domain.id} id={domain.id} domains={domain.themes} onSelect={handleSelectJob}>
                  {domain.title}
                </SearchJobTag>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

type DomainListProps = {
  data: Theme[] | undefined;
  tags: Tag[] | undefined;
  setTheme: (theme: Theme) => void;
  theme: Theme;
};

const DomainList: FunctionComponent<DomainListProps> = ({ data, tags, setTheme, theme }) => {
  const history = useHistory();
  const [domainHelp, setDomainHelp] = useState<string | undefined>(undefined);

  // TODO: pass job object
  const handleSelectJob = (job: Theme) => {
    setTheme(job);
    if (job) {
      history.push(`${job?.id}/domaine?type=${job.domain}`);
    }
  };

  return (
    <div
      style={{
        boxShadow: '5px 5px 10px 0px rgba(0,0,0,.1)',
        maxHeight: 'calc(100vh - 42vh)',
      }}
      className="border border-lena-lightgray rounded-md overflow-y-auto divide-y divide-lena-lightgray2"
    >
      <div>
        <div className="py-1 px-8 bg-lena-lightgray bg-opacity-50">
          <strong>Métiers</strong>
        </div>
        <div className="divide-y divide-lena-lightgray2">
          {data &&
            data.map((domain) => (
              <SearchJobDomain
                onActive={(e: string | undefined) => setDomainHelp(e)}
                idActive={domainHelp}
                key={domain.id}
                job={domain}
                onSelect={handleSelectJob}
              >
                {domain.title}
              </SearchJobDomain>
            ))}
        </div>
      </div>

      <div>
        <div className="py-1 px-8 bg-lena-lightgray bg-opacity-50">
          <strong>Tags</strong>
        </div>
        <div className="divide-y divide-lena-lightgray2 px-8">
          {tags &&
            tags.map((domain) => {
              return (
                <SearchJobTag key={domain.id} id={domain.id} domains={domain.themes} onSelect={handleSelectJob}>
                  {domain.title}
                </SearchJobTag>
              );
            })}
        </div>
      </div>
    </div>
  );
};
type SelectionProps = {
  setTheme: (theme: Theme) => void;
  theme: Theme;
};
const SelectionTheme = ({ setTheme, theme }: SelectionProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const mediaQueryMD = useMediaQuery('md');
  const mediaQueryLG = useMediaQuery('lg');
  const mediaQueryXL = useMediaQuery('xl');
  const mediaQuery2XL = useMediaQuery('2xl');
  const [text, setText] = useState(String);

  const [getThemes, { loading, data }] = useLazyThemes();
  const [getTags, { loading: loadingTags, data: dataTags }] = useListTags();

  const handleThemes = (title: string) => {
    setText(title);
  };

  useEffect(() => {
    getThemes({ variables: { domain: 'professional', title: text } });
    getTags({ variables: { title: text } });
  }, [text]);

  return !showSearch ? (
    <ParcoursLayout>
      <div className="container py-8 flex flex-col items-center justify-start space-y-8 md:p-14">
        <div
          style={{ width: mediaQuery2XL ? '50%' : mediaQueryXL ? '70%' : mediaQueryLG ? '85%' : '100%' }}
          className="md:flex md:flex-col md:items-start flex flex-col items-center space-y-8 md:space-y-5"
        >
          <div
            className={`flex flex-col justify-center items-center bg-lena-lightgray
          rounded-full h-56 w-56 space-y-2 p-4 md:hidden`}
          >
            <PictoExpPro />
            <div className="text-center text-lena-blue-dark font-bold text-xl">Mes expériences professionnelles</div>
          </div>
          <div className="text-lena-blue-dark">Décrivez en quelques mots votre expérience professionnelle :</div>
          <div className="w-3/4">
            <input
              onClick={() => !mediaQueryMD && setShowSearch(true)}
              type="text"
              value={text}
              onChange={(e) => handleThemes(e.currentTarget.value)}
              className="border-red-400 rounded-md w-full"
              placeholder="Vente de fleurs"
            />
          </div>
          <div className="w-full">
            {mediaQueryMD && text.length > 2 && (
              <DomainList setTheme={setTheme} theme={theme} tags={dataTags?.tags.data} data={data?.themes.data} />
            )}
          </div>
        </div>
      </div>
    </ParcoursLayout>
  ) : (
    <WIPSearchTheme open={showSearch} setTheme={setTheme} theme={theme} onClose={() => setShowSearch(false)} />
  );
};

export default SelectionTheme;
