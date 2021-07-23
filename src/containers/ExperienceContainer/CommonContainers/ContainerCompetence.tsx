import React, { useState, useEffect } from 'react';
import SelectorTest from 'components/design-system/SelectorTest';

import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import complexité from 'assets/svg/Picto_reflechir.svg';
import Autonomie from 'assets/svg/Picto_organiser.svg';
import Organiser from 'assets/svg/organiser.svg';
import Communication from 'assets/svg/communiquer.svg';
import Refleshir from 'assets/svg/reflechir.svg';
import { groupBy } from 'lodash';
import Environnement from 'assets/svg/Picto_communiquer.svg';
import { Theme } from 'common/requests/types';
import useMediaQuery from 'hooks/useMediaQuery';
import { useHistory } from 'react-router-dom';
import ParcoursLayout from '../layout/ParcoursLayout';

interface Props {
  theme: Theme;
  setCompetencesValues: (competence: string[]) => void;
  competencesValues: string[];
}
interface QuestionType {
  title: string;
  competences: { title: string; type: string; id: string }[];
}
const types = [
  {
    title: 'S’organiser',
    logo: Organiser,
    sub: 'organizational',
    text: (
      <p>
        Quelles sont les <strong>compétences d’organisation</strong> que vous mettez en oeuvre ?
      </p>
    ),
  },
  {
    title: 'Communiquer',
    logo: Communication,
    sub: 'communication',
    text: (
      <p>
        Quelles sont les <strong>compétences de communication</strong> que vous mettez en oeuvre ?
      </p>
    ),
  },
  {
    title: 'Réflechir',
    logo: Refleshir,
    sub: 'reflective',
    text: (
      <p>
        Quelles sont les <p>compétences de réflexion</p> que vous mettez en oeuvre ?
      </p>
    ),
  },
];

interface BoxType {
  image: any;
  title: string;
  competences: { title: string; type: string; id: string }[];
}

const QuestionsContainer = ({ theme, setCompetencesValues, competencesValues }: Props) => {
  const history = useHistory();
  const mediaQueryMD = useMediaQuery('md');
  const [step, setStep] = useState(0);
  const typesCompetences = groupBy(theme.reference?.competences, 'type');

  const isExist = (value: string) => {
    const res = competencesValues.includes(value);
    return res;
  };

  const onSelectCompetence = (value: string) => {
    const exist = isExist(value);
    if (exist) {
      const res = competencesValues.filter((q) => q !== value);
      setCompetencesValues(res);
    } else {
      const array = [...competencesValues];
      array.push(value);
      setCompetencesValues(array);
    }
  };
  const nextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      history.push(`/experience/theme/${theme.id}/sommaire?type=${theme.domain}`);
    }
  };

  const RendQuestionStep = ({ title, competences }: QuestionType) => {
    return (
      <div className="flex flex-col items-center p-8">
        <div
          className="rounded-full flex flex-col items-center justify-center font-mono relative"
          style={{ height: 148, width: 148, color: '#000', backgroundColor: '#E1E7F7' }}
        >
          <div
            className="rounded-full absolute -top-5 flex items-center justify-center"
            style={{ height: 45, width: 45, color: '#000', backgroundColor: '#223A7A' }}
          >
            <span className="text-white">{`${step + 1}/${types.length}`}</span>
          </div>
          <img src={types[step].logo} alt="pole" />
          <span className="text-lena-blue-dark font-bold text-sm text-center mt-4">{title}</span>
        </div>
        <div className="m-5">{types[step].text} </div>
        <div>
          {competences.map((q) => (
            <div className={`mt-3 mb-3 p-3 `}>
              <SelectorTest key={q.id} onClick={() => onSelectCompetence(q.id)} checked={isExist(q.id)}>
                {q.title}
              </SelectorTest>
            </div>
          ))}
        </div>
        {competences.length !== 0 && (
          <button
            className={`focus:ring-0 focus:outline-none w-full md:w-72 md:rounded-md bg-lena-blue
            text-white py-3 text-center font-bold text-lg`}
            onClick={nextStep}
          >
            {' '}
            Suivant
          </button>
        )}
      </div>
    );
  };

  const RenderBox = ({ image, title, competences }: BoxType) => {
    return (
      <div className="bg-lena-blue-alt-light w-full mt-5 mb-5 flex p-5 rounded">
        <div className="w-1/5 flex flex-col justify-center items-center">
          <p className="w-11/12 text-center mb-3 font-bold text-lena-blue-dark">{title}</p>
          <img alt="info" src={image} className="w-14" />
        </div>
        <div className="flex-1">
          {competences?.map((q) => (
            <div
              className={`mt-3 mb-3 p-3 rounded cursor-pointer text-lena-black
          font-thin text-center min-h-28p flex items-center justify-center`}
              style={{ backgroundColor: '#F1FCFF' }}
            >
              <span>{q.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <ParcoursLayout>
      {mediaQueryMD ? (
        <>
          <button
            className="flex items-center mt-5 ml-5 focus:ring-0 focus:outline-none"
            onClick={() => history.goBack()}
          >
            <ArrowLeftSvg />
            <span className="text-sm mt-1 ml-3 text-lena-blue-dark">Retour</span>
          </button>
          <div className="flex flex-col items-center justify-start space-y-8 container py-8 md:p-14 relative">
            <p className="text-lena-blue-dark">
              Pour chaque encadré, sélectionnez la phrase qui décrit le mieux vos compétences en {theme?.title} :{' '}
            </p>
            {types.map((q) => (
              <RenderBox title={q.title} image={q.logo} competences={typesCompetences[q.sub]} />
            ))}
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center mt-10">
          <RendQuestionStep title={types[step].title} competences={typesCompetences[types[step].sub]} />
        </div>
      )}
    </ParcoursLayout>
  );
};

export default QuestionsContainer;
