import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { ReactComponent as PictoExpPro } from 'assets/svg/exp_professional.svg';
import SearchSvg from 'assets/images/svg/picto/search.svg';
import CrossSvg from 'assets/images/svg/picto/cross_turquoise.svg';
import HelpSvg from 'assets/images/svg/picto/help.svg';
import HelpLightSvg from 'assets/images/svg/picto/help_light.svg';
import clsx from 'clsx';
import ParcoursLayout from '../ParcoursLayout';
import useMediaQuery from '../../../hooks/useMediaQuery';

type JobTag = {
  id: number | undefined;
  tags: string[];
};

const SearchJobTag: FunctionComponent<JobTag> = ({ id, tags, children }) => {
  return (
    <div>
      <button className={clsx('focus-:ring-0 focus:outline-none w-full px-7 py-1 text-left flex justify-between')}>
        {children}
      </button>
      <ul className="px-7 py-1 list-inside">
        {tags &&
          tags.map((tag, index) => (
            <li
              key={id}
              className={clsx(
                'px-5 py-1 whitespace-nowrap overflow-ellipsis overflow-hidden border-t bg-opacity-50 border-lena-lightgray2',
                tags.length - 1 === index && 'border-b',
              )}
            >
              {tag}
            </li>
          ))}
      </ul>
    </div>
  );
};

type JobDomain = {
  id: number | undefined;
  jobs: string[];
  idActive: number | undefined;
  onActive: (e: number | undefined) => void;
};

const SearchJobDomain: FunctionComponent<JobDomain> = ({ id, jobs, idActive, onActive, children }) => {
  return (
    <div>
      <button
        className={clsx(
          'focus-:ring-0 focus:outline-none w-full px-7 py-1 text-left border-t flex justify-between',
          id === idActive && 'bg-lena-lightgray bg-opacity-50 border-lena-lightgray2',
          id !== idActive && 'border-white',
        )}
      >
        {children}
        <button
          className="focus:ring-0 focus:outline-none"
          onClick={() => onActive.call(null, id === idActive ? undefined : id)}
        >
          <img src={id === idActive ? HelpLightSvg : HelpSvg} alt="Help Svg" />
        </button>
      </button>
      {id === idActive && (
        <ul className="list-disc px-12 py-1 list-inside">
          {jobs &&
            jobs.map((job) => (
              <li key={id} className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                {job}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

type SearchProps = {
  open: boolean;
  onClose: () => void;
};

type Domains = {
  domains: {
    id: number;
    name: string;
    jobs: string[];
  }[];
  tags: {
    id: number;
    name: string;
    tags: string[];
  }[];
};

const WIPSearchTheme: FunctionComponent<SearchProps> = ({ open, onClose }) => {
  const inputRef = useRef<any>(null);
  const [domains, setDomains] = useState<Domains>();
  const [domainHelp, setDomainHelp] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (open) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    setDomains({
      domains: [
        {
          id: 1,
          name: 'Cordonnier',
          jobs: ['test', 'lol', 'hello word'],
        },
        {
          id: 2,
          name: 'Soins esthétiques et corporels',
          jobs: [
            'J’accueille une clientèle',
            'Je propose un service et/ou un produit adapté',
            'Je nettoie et je prépare le corps, le visage',
          ],
        },
      ],
      tags: [
        {
          id: 1,
          name: '#lol',
          tags: ['lol', 'mdr'],
        },
        {
          id: 2,
          name: '#coucou',
          tags: ['dia', 'go'],
        },
      ],
    });
  }, [domains]);

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
          <input ref={inputRef} className="w-full bg-transparent focus:ring-0 focus:outline-none py-2" />
        </div>
      </div>
      <div style={{ boxShadow: '0 -5px 5px -5px rgba(0,0,0,.2)' }}>
        <div className="py-1 px-7 bg-lena-lightgray bg-opacity-50">
          <strong>Métiers</strong>
        </div>
        {typeof domains !== 'undefined' &&
          domains.domains.map((domain) => (
            <SearchJobDomain
              onActive={(e: number | undefined) => setDomainHelp(e)}
              idActive={domainHelp}
              key={domain.id}
              id={domain.id}
              jobs={domain.jobs}
            >
              {domain.name}
            </SearchJobDomain>
          ))}
        <div className="py-1 px-7 bg-lena-lightgray bg-opacity-50">
          <strong>Tags</strong>
        </div>
        {typeof domains !== 'undefined' &&
          domains.tags.map((domain) => (
            <SearchJobTag key={domain.id} id={domain.id} tags={domain.tags}>
              {domain.name}
            </SearchJobTag>
          ))}
      </div>
    </div>
  );
};

const DomainList: FunctionComponent = () => {
  const [domains, setDomains] = useState<Domains>();
  const [domainHelp, setDomainHelp] = useState<number | undefined>(undefined);

  useEffect(() => {
    setDomains({
      domains: [
        {
          id: 1,
          name: 'Cordonnier',
          jobs: ['test', 'lol', 'hello word'],
        },
        {
          id: 2,
          name: 'Soins esthétiques et corporels',
          jobs: [
            'J’accueille une clientèle',
            'Je propose un service et/ou un produit adapté',
            'Je nettoie et je prépare le corps, le visage',
          ],
        },
      ],
      tags: [
        {
          id: 1,
          name: '#lol',
          tags: ['lol', 'mdr'],
        },
        {
          id: 2,
          name: '#coucou',
          tags: ['dia', 'go','dia', 'go','dia', 'go','dia', 'go','dia', 'go','dia', 'go','dia', 'go','dia', 'go','dia', 'go','dia', 'go',],
        },
      ],
    });
  }, [domains]);

  return (
    <div style={{ boxShadow: '5px 5px 10px 0px rgba(0,0,0,.1)', maxHeight: "calc(100vh - 42vh)" }} className="border border-lena-lightgray rounded-md overflow-y-auto">
      <div className="py-1 px-7 bg-lena-lightgray bg-opacity-50">
        <strong>Métiers</strong>
      </div>
      {typeof domains !== 'undefined' &&
        domains.domains.map((domain) => (
          <SearchJobDomain
            onActive={(e: number | undefined) => setDomainHelp(e)}
            idActive={domainHelp}
            key={domain.id}
            id={domain.id}
            jobs={domain.jobs}
          >
            {domain.name}
          </SearchJobDomain>
        ))}
      <div className="py-1 px-7 bg-lena-lightgray bg-opacity-50">
        <strong>Tags</strong>
      </div>
      {typeof domains !== 'undefined' &&
        domains.tags.map((domain) => (
          <SearchJobTag key={domain.id} id={domain.id} tags={domain.tags}>
            {domain.name}
          </SearchJobTag>
        ))}
    </div>
  );
};

const WipSelectionTheme: FunctionComponent = () => {
  const [showSearch, setShowSearch] = useState(false);
  const mediaQueryMD = useMediaQuery('md');
  return !showSearch ? (
    <ParcoursLayout>
      <div className="flex flex-col items-center justify-start space-y-8 md:p-14">
        <div className="md:flex md:flex-col md:items-start flex flex-col items-center space-y-8 md:space-y-5">
          <div className="flex flex-col justify-center items-center bg-lena-lightgray rounded-full h-56 w-56 space-y-2 p-4 md:hidden">
            <PictoExpPro />
            <div className="text-center text-lena-blue-dark font-bold text-xl">Mes expériences professionnelles</div>
          </div>
          <div className="text-lena-blue-dark">Décrivez en quelques mots votre expérience professionnelle :</div>
          <div className="w-3/4">
            <input
              onClick={() => mediaQueryMD === false && setShowSearch(true)}
              type="text"
              className="border-red-400 rounded-md w-full"
              placeholder="Vente de fleurs"
            />
          </div>
          <div className="w-full">
            {mediaQueryMD &&
              <DomainList />
            }
          </div>
        </div>
      </div>
    </ParcoursLayout>
  ) : (
    <WIPSearchTheme open={showSearch} onClose={() => setShowSearch(false)} />
  );
};

export default WipSelectionTheme;
