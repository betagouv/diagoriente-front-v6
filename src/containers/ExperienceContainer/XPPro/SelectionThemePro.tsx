import React, { FunctionComponent, useEffect, useRef, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as PictoExpPro } from 'assets/svg/exp_professional.svg';
import SearchSvg from 'assets/images/svg/picto/search.svg';
import CrossSvg from 'assets/images/svg/picto/cross_turquoise.svg';
import LoupeSvg from 'assets/svg/loupe.svg';
import HelpSvg from 'assets/images/svg/picto/help.svg';
import HelpLightSvg from 'assets/images/svg/picto/help_light.svg';
import classNames from 'common/utils/classNames';

import useMediaQuery from 'hooks/useMediaQuery';
import { ThemeListItem, useLazyThemes } from 'common/requests/themes';
import { Tag, TagList, Theme } from 'common/requests/types';
import { useListTags } from 'common/requests/tags';
import ParcoursExperienceLayout from 'layouts/ParcoursExperienceLayout/ParcoursExperienceLayout';

const renderTitle = (text: string, fText: string) => {
  const fullText = text.toLowerCase();
  const textToFind = fText.toLowerCase();
  const lengthS = textToFind.length;
  const index = fullText.indexOf(textToFind);

  let result = null;
  if (index === 0) {
    const firstPartStrong = fullText.slice(0, lengthS);
    const secondPart = fullText.slice(lengthS);
    result = (
      <p>
        <strong className="capitalize">{firstPartStrong}</strong>
        {secondPart}
      </p>
    );
  } else {
    const firstPart = fullText.slice(0, index);
    const firstPartStrong = fullText.slice(index, index + lengthS);
    const secondPart = fullText.slice(index + lengthS);
    result = (
      <p>
        {firstPart}
        <strong>{firstPartStrong}</strong>
        {secondPart}
      </p>
    );
  }
  return result;
};

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
      flex border-b border-lena-lightgray2 `}
      >
        #{children}
      </div>
      {domains.map((t) => (
        <div
          key={t.id}
          onClick={() => onSelect.call(null, t)}
          className="cursor-pointer px-5 py-2 divide-y divide-lena-lightgray2 border-b border-lena-lightgray2"
        >
          {t?.title}
        </div>
      ))}
    </div>
  );
};

type JobDomain = {
  job: ThemeListItem;
  idActive?: string;
  onActive: (e?: string) => void;
  onSelect: (job: ThemeListItem) => void;
  text: string;
};

const SearchJobDomain: FunctionComponent<JobDomain> = ({ job, idActive, onActive, onSelect, children, text }) => {
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
      </div>
      <div className="px-9">
        <ul className="list-disc px-4 py-1 list-inside">
          {job.activities.slice(0, 3).map((activity) => (
            <li key={activity.id} className="whitespace-nowrap overflow-ellipsis overflow-hidden text-sm leading-6">
              {activity.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

type SearchProps = {
  open: boolean;
  onClose: () => void;
  setTheme: (theme: ThemeListItem) => void;
  theme: ThemeListItem;
  themes: ThemeListItem[];
  tags: Tag[];
  handleThemes: (text: string) => void;
  text: string;
};

const SearchThemePro: FunctionComponent<SearchProps> = ({
  open,
  onClose,
  setTheme,
  text,
  handleThemes,
  themes,
  tags,
}) => {
  const history = useHistory();
  const inputRef = useRef<any>(null);
  const [domainHelp, setDomainHelp] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (open) {
      inputRef.current.focus();
    }
  }, [open]);

  // TODO: pass job object
  const handleSelectJob = (job: ThemeListItem) => {
    // setTheme(job);
    if (job) {
      history.push(`${job?.id}/domaine`);
    }
  };

  return (
    <div>
      <div className="bg-lena-blue-dark py-4 text-center px-8">
        <div className="flex justify-center py-2 text-white">
          Décrivez en quelques mots votre expérience :
          {/* <button
            onClick={() => onClose.call(null)}
            className="focus:ring-0 focus:outline-none bg-white p-2 rounded-full shadow-lg"
          >
            <img src={CrossSvg} alt="Cross Svg" />
          </button> */}
        </div>
        <div className="w-full border border-lena-gray-light px-2 flex bg-white rounded-md">
          <img src={SearchSvg} alt="Search Icon" className="mr-2" />
          <input
            value={text}
            onChange={(e) => handleThemes(e.currentTarget.value)}
            ref={inputRef}
            placeholder="Ex : vente de fleurs"
            className="w-full bg-transparent focus:ring-0 focus:outline-none py-2"
          />
        </div>
      </div>
      <div className="divide-y divide-lena-lightgray2" style={{ boxShadow: '0 -5px 5px -5px rgba(0,0,0,.2)' }}>
        <div>
          <div className="py-1 px-8 bg-lena-turquoise-light">
            <strong>Métiers</strong>
          </div>
          <div className="divide-y divide-lena-lightgray2">
            {themes.map((domain) => (
              <SearchJobDomain
                onActive={(e: string | undefined) => setDomainHelp(e)}
                idActive={domainHelp}
                key={domain.id}
                job={domain}
                onSelect={handleSelectJob}
                text={text}
              >
                {renderTitle(domain.title, text)}
              </SearchJobDomain>
            ))}
          </div>
        </div>
        <div>
          <div className="py-1 px-8 bg-lena-turquoise-light bg-opacity-50 ">
            <strong>Tags</strong>
          </div>
          <div className="divide-y divide-lena-lightgray2 px-8">
            {tags.map((domain) => (
              <SearchJobTag key={domain.id} id={domain.id} domains={domain.themes} onSelect={handleSelectJob}>
                {renderTitle(domain.title, text)}
              </SearchJobTag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

type DomainListProps = {
  data: ThemeListItem[];
  tags: Tag[];
  text: string;
};

const DomainList: FunctionComponent<DomainListProps> = ({ data, tags, text }) => {
  const history = useHistory();
  const [domainHelp, setDomainHelp] = useState<string | undefined>(undefined);
  // TODO: pass job object
  const handleSelectJob = (job: ThemeListItem) => {
    if (job) {
      history.push(`${job?.id}/domaine`);
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
        <div className="py-1 px-8 bg-lena-turquoise-light">
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
                text={text}
              >
                {renderTitle(domain.title, text)}
              </SearchJobDomain>
            ))}
        </div>
      </div>

      <div>
        <div className="py-1 px-8 bg-lena-turquoise-light">
          <strong>Tags</strong>
        </div>
        <div className="divide-y divide-lena-lightgray2 px-8">
          {tags &&
            tags.map((domain) => {
              return (
                <SearchJobTag key={domain.id} id={domain.id} domains={domain.themes} onSelect={handleSelectJob}>
                  {renderTitle(domain.title, text)}
                </SearchJobTag>
              );
            })}
        </div>
      </div>
    </div>
  );
};
type SelectionProps = {
  setTheme: (theme: ThemeListItem) => void;
  theme: ThemeListItem;
};
const SelectionThemePro = ({ setTheme, theme }: SelectionProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const mediaQueryMD = useMediaQuery('md');
  const mediaQueryLG = useMediaQuery('lg');
  const mediaQueryXL = useMediaQuery('xl');
  const mediaQuery2XL = useMediaQuery('2xl');
  const [text, setText] = useState('');

  const [getThemesCall, getThemesState] = useLazyThemes();
  const [getTagsCall, getTagsState] = useListTags();

  const themes = useMemo(() => {
    if (getThemesState.data) return getThemesState.data.themes.data;
    return [];
  }, [getThemesState.data]);

  const tags = useMemo(() => {
    if (getTagsState.data) return getTagsState.data.tags.data;
    return [];
  }, [getTagsState.data]);

  const handleThemes = (title: string) => {
    setText(title);
    getThemesCall({ variables: { domain: 'professional', title, perPage: 5 } });
    getTagsCall({ variables: { title, perPage: 5 } });
  };

  return !showSearch ? (
    <ParcoursExperienceLayout>
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
          <div className="text-lena-blue-dark md:text-xl md:font-bold">
            Décrivez en quelques mots votre expérience professionnelle :
          </div>
          <div className="flex items-center w-3/4 border border-gray-200 rounded px-2">
            <img src={LoupeSvg} alt="loupe" className="w-5" />
            <input
              onClick={() => !mediaQueryMD && setShowSearch(true)}
              type="text"
              value={text}
              onChange={(e) => handleThemes(e.currentTarget.value)}
              className="w-full border-0 focus:outline-none focus:ring-0"
              placeholder="Vente de fleurs"
            />
          </div>
          <div className="w-full">
            {mediaQueryMD && text.length !== 0 && <DomainList tags={tags} data={themes} text={text} />}
          </div>
        </div>
      </div>
    </ParcoursExperienceLayout>
  ) : (
    <SearchThemePro
      themes={themes}
      tags={tags}
      text={text}
      handleThemes={handleThemes}
      open={showSearch}
      setTheme={setTheme}
      theme={theme}
      onClose={() => setShowSearch(false)}
    />
  );
};

export default SelectionThemePro;
