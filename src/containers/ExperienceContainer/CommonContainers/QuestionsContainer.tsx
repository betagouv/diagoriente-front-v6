import React, { useState, useEffect } from 'react';
import SelectorTest from 'components/design-system/SelectorTest';

import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import complexité from 'assets/svg/Picto_reflechir.svg';
import Autonomie from 'assets/svg/Picto_organiser.svg';
import { groupBy } from 'lodash';
import Environnement from 'assets/svg/Picto_communiquer.svg';
import { Theme } from 'common/requests/types';
import useMediaQuery from 'hooks/useMediaQuery';
import { useHistory } from 'react-router-dom';
import ParcoursLayout from '../../../layouts/ParcoursExperienceLayout/ParcoursLayout';

interface Props {
  theme: Theme;
  levels: string[];
  setLevels: (levels: string[]) => void;
}
interface QuestionType {
  title: string;
  questions: { title: string; rank: string; reference: string; id: string }[];
}
const types = [
  {
    title: 'Autonomie & responsabilité',
    logo: Autonomie,
    sub: 'responsibility',
  },
  {
    title: 'Complexité',
    logo: complexité,
    sub: 'complexity',
  },
  /* {
    title: 'Environnement de travail',
    logo: Environnement,
    sub: 'Environnement',
  }, */
];

interface BoxType {
  image: any;
  title: string;
  questions: { title: string; rank: string; reference: string; id: string }[];
}

const QuestionsContainer = ({ theme, setLevels, levels }: Props) => {
  const history = useHistory();
  const mediaQueryMD = useMediaQuery('md');
  const [step, setStep] = useState(0);
  const typesQuestion = groupBy(theme.levels, 'type');

  const isExist = (value: string) => {
    const res = levels.includes(value);
    return res;
  };

  const onSelectQuestion = (value: string) => {
    const exist = isExist(value);
    if (exist) {
      const res = levels.filter((q) => q !== value);
      setLevels(res);
    } else {
      const array = [...levels];
      array[step] = value;
      setLevels(array);
    }
  };
  const nextStep = () => {
    if (step < 1) {
      setStep(step + 1);
    } else {
      history.push(`/experience/theme/${theme.id}/questions?type=${theme.domain}`);
    }
  };

  const RendQuestionStep = ({ title, questions }: QuestionType) => {
    return (
      <div className="flex flex-col items-center p-8">
        <div
          className="rounded-full flex items-center justify-center font-mono relative"
          style={{ height: 148, width: 148, color: '#000', backgroundColor: '#E1E7F7' }}
        >
          <div
            className="rounded-full absolute -top-5 flex items-center justify-center"
            style={{ height: 45, width: 45, color: '#000', backgroundColor: '#223A7A' }}
          >
            <span className="text-white">{`${step + 1}/${types.length}`}</span>
          </div>
          <span className="text-lena-blue-dark font-bold text-sm text-center">{title}</span>
        </div>
        <div className="m-5">Sélectionnez la phrase qui décrit le mieux vos compétences en {theme?.title} :</div>
        <div>
          {questions.map((q) => (
            <div className={`mt-3 mb-3 p-3 `}>
              <SelectorTest key={q.id} onClick={() => onSelectQuestion(q.id)} checked={isExist(q.id)}>
                {q.title}
              </SelectorTest>
            </div>
          ))}
        </div>
        {levels.length !== 0 && (
          <div className="fixed bottom-0 left-0 right-0 md:relative">
            <button
              className={`focus:ring-0 focus:outline-none w-full md:w-72 md:rounded-md bg-lena-blue
            text-white py-3 text-center font-bold text-lg`}
              onClick={nextStep}
            >
              {' '}
              Suivant
            </button>
          </div>
        )}
      </div>
    );
  };

  const RenderBox = ({ image, title, questions }: BoxType) => {
    return (
      <div className="bg-lena-blue-alt-light w-full mt-5 mb-5 flex p-5 rounded">
        <div className="w-1/5 flex flex-col justify-center items-center">
          <p className="w-11/12 text-center mb-3 font-bold text-lena-blue-dark">{title}</p>
          <img alt="info" src={image} className="w-14" />
        </div>
        <div className="flex-1">
          {questions?.map((q) => (
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
              <RenderBox title={q.title} image={q.logo} questions={typesQuestion[q.sub]} />
            ))}
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center mt-10">
          <RendQuestionStep title={types[step].title} questions={typesQuestion[types[step].sub]} />
        </div>
      )}
    </ParcoursLayout>
  );
};

export default QuestionsContainer;
