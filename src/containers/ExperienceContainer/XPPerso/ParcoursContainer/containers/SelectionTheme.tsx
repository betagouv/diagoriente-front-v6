import React, { useContext, useState } from 'react';
import { ReactComponent as PictoExpPerso } from 'assets/svg/exp_perso_lg.svg';
import { ReactComponent as ArrowDownSvg } from 'assets/svg/arrow_down.svg';
import { ReactComponent as LoveSvg } from 'assets/svg/comp_eng.svg';
import { ReactComponent as LoveWhiteSvg } from 'assets/svg/love_white.svg';
import { ReactComponent as CrossSvg } from 'assets/svg/cross.svg';
import clsx from 'clsx';
import useMediaQuery from 'hooks/useMediaQuery';
import ReactTooltip from 'react-tooltip';
import { EParcoursStep, NewExperienceContext } from 'contexts/NewExperienceContext';
import ParcoursLayout from '../layout/ParcoursLayout';

type FakeDataType = {
  id: string;
  title: string;
  activities: {
    id: string;
    title: string;
  }[];
};

type MobileChoiceDomainProps = {
  onClose: () => void;
};

function randomToken() {
  const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < 30; i++) {
    const randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

const fake: Array<FakeDataType> = [
  {
    id: randomToken(),
    title: 'Amis',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Animaux',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Amis',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Animaux',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Amis',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Animaux',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Amis',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Animaux',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Amis',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Animaux',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Amis',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Animaux',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Amis',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Animaux',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Amis',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Animaux',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Amis',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Animaux',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Amis',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Animaux',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Amis',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Animaux',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Amis',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Animaux',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Amis',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Animaux',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Amis',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Animaux',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Amis',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
  {
    id: randomToken(),
    title: 'Animaux',
    activities: [
      {
        id: randomToken(),
        title: 'bb',
      },
    ],
  },
];

const MobileChoiceDomain = ({ onClose }: MobileChoiceDomainProps) => {
  const fakeData: Array<FakeDataType> = fake;

  const [selectedDomain, setSelectedDomain] = useState<FakeDataType>();
  const [activeDomain, setActiveDomain] = useState(String);
  const { setTheme, setStep } = useContext(NewExperienceContext);

  const controlSelected = (data: any) => {
    if (activeDomain === data.id && selectedDomain?.id === data.id) {
      setSelectedDomain(data);
      setActiveDomain('');
    } else if (selectedDomain?.id !== data.id && activeDomain !== data.id) {
      setActiveDomain(data.id);
      setSelectedDomain(data);
    } else {
      setActiveDomain('');
      setSelectedDomain(undefined);
    }
  };

  const handleValidate = () => {
    if (selectedDomain) {
      setTheme({
        id: selectedDomain.id,
        name: selectedDomain.title,
        activities: ['no connected'],
      });
      setStep(EParcoursStep.ACTIVITIES);
    }
  };

  return (
    <div className="pb-20">
      <ul>
        <li>
          {fakeData &&
            fakeData.map((d) => (
              <div className="border-b border-lena-lightgray2">
                <button
                  onClick={() => controlSelected(d)}
                  key={d.id}
                  className={clsx(
                    'w-full py-3 flex items-center px-10 focus:outline-none focus:ring-0',
                    selectedDomain?.id === d.id ? 'bg-lena-turquoise-light' : '',
                  )}
                >
                  <LoveSvg />
                  <span className={clsx('ml-8', selectedDomain?.id === d.id && 'font-bold')}>{d.title}</span>
                </button>
                {activeDomain === d.id && selectedDomain?.id === d.id && (
                  <div className="px-14 py-4">
                    <ul className="list-disc">
                      <li>lol</li>
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

const WebDomainDisplay = () => {
  const fakeData: Array<FakeDataType> = fake;

  const { setTheme, setStep } = useContext(NewExperienceContext);
  const [selected, setSelected] = useState<FakeDataType>();

  const controlSelected = (data: any) => {
    setSelected(data);
  };

  const handleNext = () => {
    if (selected) {
      setTheme({
        id: selected.id,
        name: selected.title,
        activities: ['no connected'],
      });
      setStep(EParcoursStep.ACTIVITIES);
    }
  };

  return (
    <>
      <div className="mx-auto w-3/5">
        <div className="grid grid-cols-4 gap-5 mt-10">
          {fakeData &&
            fakeData.map((f) => (
              <button
                onClick={() => controlSelected(f)}
                className={clsx(
                  'rounded-xl p-5 cursor-pointer border-4  focus:ring-0 focus:outline-none',
                  selected && selected?.id === f.id
                    ? 'bg-lena-blue-light border-lena-blue-inter'
                    : 'hover:bg-lena-turquoise-light border-transparent',
                )}
                data-tip="Info"
                data-for={f.id}
              >
                <div className="flex flex-col items-center">
                  {selected && selected.id === f.id ? <LoveWhiteSvg /> : <LoveSvg />}
                  <span className="block mt-5">{f.title}</span>
                </div>
                <ReactTooltip id={f.id} place="right" type="light" effect="solid">
                  <ul className="list-disc text-left">
                    <li>Choisir sa formation</li>
                    <li>Suivre un cours en ligne</li>
                    <li>Faire des recherches sur un ...</li>
                    <li>Passer un examen</li>
                    <li>Réviser ses cours</li>
                  </ul>
                </ReactTooltip>
              </button>
            ))}
        </div>
      </div>
      {selected && (
        <button
          className="focus:ring-0 focus:outline-none w-full bg-lena-blue text-white py-3 text-center font-bold text-lg md:w-72 md:rounded-lg mt-10"
          onClick={handleNext}
        >
          Valider
        </button>
      )}
    </>
  );
};

const SelectionTheme = () => {
  const [showMobileChoice, setShowMobileChoice] = useState(false);
  const mediaQueryMD = useMediaQuery('md');

  return !showMobileChoice ? (
    <ParcoursLayout>
      <div className="container py-8 flex flex-col items-center justify-start space-y-8 md:p-14">
        <div className="md:flex md:flex-col md:items-start flex flex-col items-center space-y-8 md:space-y-5 w-full">
          {mediaQueryMD ? (
            <div className="flex flex-col w-full items-center">
              <h2 className="text-lena-blue-dark">
                Sélectionnez le domaine de l’expérience personnelle que vous souhaitez ajouter :
              </h2>
              <WebDomainDisplay />
            </div>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center bg-lena-lightgray rounded-full h-56 w-56 space-y-2 p-4 md:hidden">
                <PictoExpPerso style={{ height: 60 }} />
                <div className="text-center text-lena-blue-dark font-bold text-xl">Mes expériences personnelles</div>
              </div>
              <div className="flex flex-col justify-start w-full px-5">
                <div className="text-lena-blue-dark mb-5">Selectionnez un domaine :</div>
                <button
                  onClick={() => setShowMobileChoice(true)}
                  className="border-2 w-full py-4 rounded-md focus:ring-0 focus:outline-none flex items-center justify-between px-8"
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
    <MobileChoiceDomain onClose={() => setShowMobileChoice(false)} />
  );
};

export default SelectionTheme;
