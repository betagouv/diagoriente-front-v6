import React, { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import { ReactComponent as PictoExpPro } from 'assets/svg/exp_professional.svg';
import SearchSvg from 'assets/images/svg/picto/search.svg';
import CrossSvg from 'assets/images/svg/picto/cross_turquoise.svg';
import HelpSvg from 'assets/images/svg/picto/help.svg';
import HelpLightSvg from 'assets/images/svg/picto/help_light.svg';
import clsx from 'clsx';
import ParcoursLayout from '../layout/ParcoursLayout';
import useMediaQuery from '../../../../../hooks/useMediaQuery';
import { EParcoursStep, NewExperienceContext } from '../../../../../contexts/NewExperienceContext';

const jobData: Domains = {
  domains: [
    {
      id: '1',
      name: 'Cordonnier',
      activities: ['test', 'lol', 'hello word'],
    },
    {
      id: '2',
      name: 'Soins esthétiques et corporels',
      activities: [
        'J’accueille une clientèle',
        'Je propose un service et/ou un produit adapté',
        'Je nettoie et je prépare le corps, le visage',
      ],
    },
  ],
  tags: [
    {
      id: '1',
      name: '#lol',
      jobs: [
        { id: '1', name: 'lol', activities: [] },
        { id: '2', name: 'lul', activities: [] },
      ],
    },
    {
      id: '2',
      name: '#coucou',
      jobs: [
        { id: '3', name: 'hashtagcovid', activities: [] },
        { id: '4', name: 'diagoriente', activities: [] },
      ],
    },
  ],
};

// TODO: move this to requests folder
type JobType = {
  id: string;
  name: string;
  activities: string[];
};

type JobTag = {
  id: string;
  domains: JobType[];
  onSelect: (job: JobType) => void;
};

const SearchJobTag: FunctionComponent<JobTag> = ({ id, domains, onSelect, children }) => {
  return (
    <div>
      <div className="focus:ring-0 focus:outline-none w-full py-1 text-left flex justify-between border-b border-lena-lightgray2">
        {children}
      </div>
      <div className="px-4 py-1 divide-y divide-lena-lightgray2">
        {domains &&
          domains.map((domain) => (
            <div
              key={domain.id}
              className="cursor-pointer px-4 py-1 whitespace-nowrap overflow-ellipsis overflow-hidden bg-opacity-50"
              onClick={() => onSelect.call(null, domain)}
            >
              {domain.name}
            </div>
          ))}
      </div>
    </div>
  );
};

type JobDomain = {
  job: JobType;
  activities: string[];
  idActive?: string;
  onActive: (e: string | undefined) => void;
  onSelect: (job: JobType) => void;
};

const SearchJobDomain: FunctionComponent<JobDomain> = ({ job, activities, idActive, onActive, onSelect, children }) => {
  return (
    <div>
      <button
        className={clsx(
          'focus-:ring-0 focus:outline-none w-full py-1 text-left flex justify-between',
          job.id === idActive && 'bg-lena-lightgray bg-opacity-50 border-lena-lightgray2',
          job.id !== idActive && 'border-white',
        )}
        onClick={() => onSelect.call(null, job)}
      >
        {children}
        <button
          className="focus:ring-0 focus:outline-none"
          onClick={() => onActive.call(null, job.id === idActive ? undefined : job.id)}
        >
          <img src={job.id === idActive ? HelpLightSvg : HelpSvg} alt="Aide" />
        </button>
      </button>
      {job.id === idActive && (
        <ul className="list-disc px-4 py-1 list-inside">
          {activities &&
            activities.map((activity) => (
              <li key={activity} className="whitespace-nowrap overflow-ellipsis overflow-hidden text-sm">
                {activity}
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
  domains: JobType[];
  tags: {
    id: string;
    name: string;
    jobs: JobType[];
  }[];
};

const WIPSearchTheme: FunctionComponent<SearchProps> = ({ open, onClose }) => {
  const inputRef = useRef<any>(null);
  const [domains, setDomains] = useState<Domains>(jobData);
  const [domainHelp, setDomainHelp] = useState<string | undefined>(undefined);
  const { theme, setTheme, setStep } = useContext(NewExperienceContext);

  useEffect(() => {
    if (open) {
      inputRef.current.focus();
    }
  }, [open]);

  // TODO: pass job object
  const handleSelectJob = (job: JobType) => {
    setTheme(job);
    setStep(EParcoursStep.THEME_DONE);
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
          <input ref={inputRef} className="w-full bg-transparent focus:ring-0 focus:outline-none py-2" />
        </div>
      </div>
      <div className="divide-y divide-lena-lightgray2" style={{ boxShadow: '0 -5px 5px -5px rgba(0,0,0,.2)' }}>
        <div>
          <div className="py-1 px-8 bg-lena-lightgray bg-opacity-50">
            <strong>Métiers</strong>
          </div>
          <div className="divide-y divide-lena-lightgray2 px-8">
            {domains &&
              domains.domains.map((domain) => (
                <SearchJobDomain
                  onActive={(e: string | undefined) => setDomainHelp(e)}
                  idActive={domainHelp}
                  key={domain.id}
                  job={domain}
                  activities={domain.activities}
                  onSelect={handleSelectJob}
                >
                  {domain.name}
                </SearchJobDomain>
              ))}
          </div>
        </div>
        <div>
          <div className="py-1 px-7 bg-lena-lightgray bg-opacity-50">
            <strong>Tags</strong>
          </div>
          <div className="divide-y divide-lena-lightgray2 px-8">
            {domains &&
              domains.tags.map((domain) => (
                <SearchJobTag key={domain.id} id={domain.id} domains={domain.jobs} onSelect={handleSelectJob}>
                  {domain.name}
                </SearchJobTag>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DomainList: FunctionComponent = () => {
  const [domains, setDomains] = useState<Domains>(jobData);
  const [domainHelp, setDomainHelp] = useState<string | undefined>(undefined);
  const { setTheme, setStep } = useContext(NewExperienceContext);

  // TODO: pass job object
  const handleSelectJob = (job: JobType) => {
    setTheme(job);
    setStep(EParcoursStep.THEME_DONE);
  };

  return (
    <div
      style={{ boxShadow: '5px 5px 10px 0px rgba(0,0,0,.1)', maxHeight: 'calc(100vh - 42vh)' }}
      className="border border-lena-lightgray rounded-md overflow-y-auto divide-y divide-lena-lightgray2"
    >
      <div>
        <div className="py-1 px-8 bg-lena-lightgray bg-opacity-50">
          <strong>Métiers</strong>
        </div>
        <div className="divide-y divide-lena-lightgray2 px-8">
          {domains &&
            domains.domains.map((domain) => (
              <SearchJobDomain
                onActive={(e: string | undefined) => setDomainHelp(e)}
                idActive={domainHelp}
                key={domain.id}
                job={domain}
                activities={domain.activities}
                onSelect={handleSelectJob}
              >
                {domain.name}
              </SearchJobDomain>
            ))}
        </div>
      </div>
      <div>
        <div className="py-1 px-8 bg-lena-lightgray bg-opacity-50">
          <strong>Tags</strong>
        </div>
        <div className="divide-y divide-lena-lightgray2 px-8">
          {domains &&
            domains.tags.map((domain) => (
              <SearchJobTag key={domain.id} id={domain.id} domains={domain.jobs} onSelect={handleSelectJob}>
                {domain.name}
              </SearchJobTag>
            ))}
        </div>
      </div>
    </div>
  );
};

const SelectionTheme: FunctionComponent = () => {
  const [showSearch, setShowSearch] = useState(false);
  const mediaQueryMD = useMediaQuery('md');
  return !showSearch ? (
    <ParcoursLayout>
      <div className="container py-8 flex flex-col items-center justify-start space-y-8 md:p-14">
        <div className="md:flex md:flex-col md:items-start flex flex-col items-center space-y-8 md:space-y-5">
          <div className="flex flex-col justify-center items-center bg-lena-lightgray rounded-full h-56 w-56 space-y-2 p-4 md:hidden">
            <PictoExpPro />
            <div className="text-center text-lena-blue-dark font-bold text-xl">Mes expériences professionnelles</div>
          </div>
          <div className="text-lena-blue-dark">Décrivez en quelques mots votre expérience professionnelle :</div>
          <div className="w-3/4">
            <input
              onClick={() => !mediaQueryMD && setShowSearch(true)}
              type="text"
              className="border-red-400 rounded-md w-full"
              placeholder="Vente de fleurs"
            />
          </div>
          <div className="w-full">{mediaQueryMD && <DomainList />}</div>
        </div>
      </div>
    </ParcoursLayout>
  ) : (
    <WIPSearchTheme open={showSearch} onClose={() => setShowSearch(false)} />
  );
};

export default SelectionTheme;
