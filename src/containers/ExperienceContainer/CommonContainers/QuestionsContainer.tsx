import React, { useState, useEffect } from 'react';
import SelectorTest from 'components/design-system/SelectorTest';
import complexité from 'assets/svg/Picto_reflechir.svg';
import Autonomie from 'assets/svg/Picto_organiser.svg';
import { groupBy } from 'lodash';
import { Theme } from 'common/requests/types';
import { useHistory } from 'react-router-dom';
import ParcoursExperienceLayout from 'layouts/ParcoursExperienceLayout/ParcoursExperienceLayout';
import classNames from 'common/utils/classNames';

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

const QuestionsContainer = ({ theme, setLevels, levels }: Props) => {
  const history = useHistory();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState('');
  const typesQuestion = groupBy(theme.levels, 'type');

  const isExist = (value: string) => {
    const res = levels.includes(value);
    return res;
  };

  const onSelectQuestion = (value: string) => {
    const exist = isExist(value);
    if (exist) {
      const res = levels.filter((q) => q !== value);
      setSelected('');
      setLevels(res);
    } else {
      const array = [...levels];
      array[step] = value;
      setSelected(value);
      setLevels(array);
    }
  };
  const nextStep = () => {
    if (step < 1) {
      setStep(step + 1);
      setSelected('');
    } else {
      history.push(`/experience/theme/${theme.id}/questions?type=${theme.domain}`);
    }
  };
  const RendQuestionStep = ({ title, questions }: QuestionType) => {
    /* useEffect(() => {
      window.scrollTo(0, 0);
    }, []); */
    return (
      <div className="flex flex-col items-center p-4">
        <div
          className="rounded-full flex items-center justify-center font-mono relative"
          style={{ height: 148, width: 148, color: '#000', backgroundColor: '#E1E7F7' }}
        >
          <div
            className="rounded-full absolute -top-5 flex items-center justify-center "
            style={{ height: 45, width: 45, color: '#000', backgroundColor: '#223A7A' }}
          >
            <span className="text-white font-bold">{`${step + 1}/${types.length}`}</span>
          </div>
          <span className="text-lena-blue-dark font-bold text-sm text-center">{title}</span>
        </div>
        <div className="m-5 md:font-bold text-lena-blue-dark text-center">
          Sélectionnez la phrase qui décrit le mieux vos compétences en {theme?.title} :
        </div>
        <div className="pb-20 w-full">
          {questions.map((q) => (
            <div className="mt-3 mb-3 p-3 w-full">
              <SelectorTest key={q.id} onClick={() => onSelectQuestion(q.id)} checked={isExist(q.id)}>
                {q.title}
              </SelectorTest>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 md:relative">
          <button
            className={classNames(
              `focus:ring-0 focus:outline-none w-full md:w-72 md:rounded-md bg-lena-blue
            text-white py-3 text-center font-bold text-lg`,
              !selected && 'bg-gray-300',
            )}
            disabled={!selected}
            onClick={nextStep}
          >
            Suivant
          </button>
        </div>
      </div>
    );
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <ParcoursExperienceLayout>
      <div className="w-full flex justify-center mt-10">
        <RendQuestionStep title={types[step].title} questions={typesQuestion[types[step].sub]} />
      </div>
    </ParcoursExperienceLayout>
  );
};

export default QuestionsContainer;
