import React, { useEffect, useState } from 'react';
import SelectorTest from 'components/design-system/SelectorTest';
// import { useAddSkill } from 'common/requests/skills';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import Organiser from 'assets/svg/organiser.svg';
import Communication from 'assets/svg/communiquer.svg';
import Refleshir from 'assets/svg/reflechir.svg';
import { groupBy } from 'lodash';
import { Theme } from 'common/requests/types';
import { capitalizeFirstLetter } from 'common/utils/capitalize';
import useMediaQuery from 'hooks/useMediaQuery';
import { useHistory } from 'react-router-dom';
import ParcoursExperienceLayout from 'layouts/ParcoursExperienceLayout/ParcoursExperienceLayout';
import classNames from 'common/utils/classNames';

interface Props {
  theme: Theme | undefined;
  setCompetencesValues: (competence: string[]) => void;
  competencesValues: string[];
  onAddSkill: () => void;
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
      <span className="text-lena-blue-dark md:text-center md:font-bold md:text-xl md:leading-10">
        Quelles sont les <strong>compétencesd’organisation</strong> que vous mettez en oeuvre ?
      </span>
    ),
  },
  {
    title: 'Communiquer',
    logo: Communication,
    sub: 'communication',
    text: (
      <span className="text-lena-blue-dark md:text-center md:font-bold md:text-xl md:leading-10">
        Quelles sont les <strong>compétences de communication</strong> que vous mettez en oeuvre ?
      </span>
    ),
  },
  {
    title: 'Réflechir',
    logo: Refleshir,
    sub: 'reflective',
    text: (
      <span className="text-lena-blue-dark md:text-center md:font-bold md:text-xl md:leading-10">
        Quelles sont les <strong>compétences de réflexion</strong> que vous mettez en oeuvre ?
      </span>
    ),
  },
];

interface BoxType {
  image: any;
  title: string;
  competences: { title: string; type: string; id: string }[];
}

const QuestionsContainer = ({ theme, setCompetencesValues, competencesValues, onAddSkill }: Props) => {
  const history = useHistory();
  const mediaQueryMD = useMediaQuery('md');
  const [step, setStep] = useState(0);
  const typesCompetences = groupBy(theme?.reference?.competences, 'type');
  const [error, setError] = useState('');
  const [selected, setSelected] = useState('');

  const isExist = (value: string) => {
    return competencesValues.includes(value);
  };

  const onSelectCompetence = (value: string) => {
    const exist = isExist(value);
    if (exist) {
      const res = competencesValues.filter((q) => q !== value);
      setCompetencesValues(res);
      setSelected('');
    } else {
      const array = [...competencesValues];
      array.push(value);
      setSelected(value);
      setCompetencesValues(array);
    }
  };
  const nextStep = () => {
    if (step < 2) {
      setStep(step + 1);
      setSelected('');
    } else {
      onAddSkill();
    }
  };

  const RendQuestionStep = ({ title, competences }: QuestionType) => {
    return (
      <div className="flex flex-col items-center p-4 md:p-8">
        <div
          className="rounded-full flex flex-col items-center justify-center font-mono relative"
          style={{ height: 148, width: 148, color: '#000', backgroundColor: '#F1FCFF' }}
        >
          {/* <div
            className="rounded-full absolute -top-5 flex items-center justify-center"
            style={{ height: 45, width: 45, color: '#000', backgroundColor: '#223A7A' }}
          >
            <span className="text-white">{`${step + 1}/${types.length}`}</span>
          </div> */}
          <img src={types[step].logo} alt="pole" />
          <span className="font-bold text-sm text-center mt-4">{title}</span>
        </div>
        <div className="m-5">{types[step].text} </div>
        <div className="italic mt-2 text-left md:text-center text-sm">Plusieurs choix possibles</div>
        <div className="pb-10">
          {competences.map((q) => (
            <div className={`mt-3 mb-3 p-3 `}>
              <SelectorTest key={q.id} onClick={() => onSelectCompetence(q.id)} checked={isExist(q.id)} withCheckBox>
                {capitalizeFirstLetter(q.title)}
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

  return (
    <ParcoursExperienceLayout>
      {mediaQueryMD && (
        <button
          onClick={() => history.goBack()}
          className="flex items-center mt-5 ml-5 focus:ring-0 focus:outline-none"
        >
          <ArrowLeftSvg />
          <span className="text-sm mt-1 ml-3 text-lena-blue-dark">Retour</span>
        </button>
      )}
      <div className="w-full flex justify-center mt-2 md:mt-4">
        <RendQuestionStep title={types[step].title} competences={typesCompetences[types[step].sub]} />
      </div>
    </ParcoursExperienceLayout>
  );
};

export default QuestionsContainer;
