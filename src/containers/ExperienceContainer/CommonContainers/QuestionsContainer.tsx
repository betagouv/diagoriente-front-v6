import React, { useState } from 'react';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import complexité from 'assets/svg/Picto_reflechir.svg';
import Autonomie from 'assets/svg/Picto_organiser.svg';
import Environnement from 'assets/svg/Picto_communiquer.svg';
import { Theme } from 'common/requests/types';
import useMediaQuery from 'hooks/useMediaQuery';
import { useHistory } from 'react-router-dom';
import ParcoursLayout from '../layout/ParcoursLayout';

interface Props {
  theme: Theme;
}
interface QuestionType {
  title: string;
  questions: {
    id: string;
    title: string;
  }[];
}
const types = [
  {
    title: 'Autonomie & responsabilité',
    logo: Autonomie,
    questions: [
      { id: '1', title: 'Vous avez réalisé en toute autonomie l’activité confiée' },
      {
        id: '2',
        title: `Vous avez réalisé en toute autonomie l’activité
          confiée en vous adaptant à la diversité des situations rencontrées`,
      },
      {
        id: '3',
        title: `Vous avez coordonné et évalué au sein d’une équipe
          pour mettre en oeuvre la vision stratégique de l’institution ou l’entreprise`,
      },
    ],
  },
  {
    title: 'Complexité',
    logo: complexité,
    questions: [
      {
        id: '1',
        title: `Vous avez traité des informations et interactions
          sur la réalisation et l’évaluation de l’activité, incluant clients / fournis-eurs / instances de contrôle`,
      },
      {
        id: '2',
        title: `Vous avez traité des informations d’origine multiple
          concernant le projet et l’équipe. Interactions variées avec transformation et adaptation de messages`,
      },
      {
        id: '3',
        title: `Multiplicité d’informationsà hiérarchiser et gérer auprès d’interlocuteurs très variés : financeurs,
        décideurs partenaires et opérationnels.
          Analyse des interactions etdes actions entre les personnes et`,
      },
    ],
  },
  {
    title: 'Environnement de travail',
    logo: Environnement,
    questions: [
      {
        id: '1',
        title: `Vous avez traité des informations et interactions sur la réalisation et
          l’évaluation de l’activité, incluant clients / fournis-eurs / instances de contrôle`,
      },
      {
        id: '2',
        title: `Vous avez traité des informations d’origine multiple concernant le projet et l’équipe.
          Interactions variées avec transformation et adaptation de messages`,
      },
      {
        id: '3',
        title: `Multiplicité d’informationsà hiérarchiser et gérer auprès
        d’interlocuteurs très variés : financeurs, décideurs partenaires etopérationnels.
          Analyse des interactions etdes actions entre les personnes et`,
      },
    ],
  },
];

interface BoxType {
  image: any;
  title: string;
  questions: { id: string; title: string }[];
}

const RenderBox = ({ image, title, questions }: BoxType) => (
  <div className="bg-lena-blue-alt-light w-full mt-5 mb-5 flex p-5 rounded">
    <div className="w-1/5 flex flex-col justify-center items-center">
      <p className="w-11/12 text-center mb-3 font-bold text-lena-blue-dark">{title}</p>
      <img alt="info" src={image} className="w-14" />
    </div>
    <div className="flex-1">
      {questions.map((q) => (
        <div
          className={`mt-3 mb-3 p-3 rounded cursor-pointer text-lena-black
        font-thin text-center min-h-20 h-20 flex items-center justify-center`}
          style={{ backgroundColor: '#F1FCFF' }}
        >
          {q.title}
        </div>
      ))}
    </div>
  </div>
);

const QuestionsContainer = ({ theme }: Props) => {
  const history = useHistory();
  const mediaQueryMD = useMediaQuery('md');
  const [step, setStep] = useState(0);
  const [selectQuestion, setSelectQuestion] = useState('');

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
        <div className="m-5">Sélectionnez la phrase qui décrit le mieux vos compétences en boulangerie :</div>
        <div>
          {questions.map((q) => (
            <div
              className={`mt-3 mb-3 p-3 rounded cursor-pointer text-lena-black
          font-thin text-center h-20 flex items-center justify-center`}
              style={{ backgroundColor: '#F1FCFF' }}
            >
              {q.title}
            </div>
          ))}
        </div>
        {selectQuestion && (
          <button
            className={`focus:ring-0 focus:outline-none w-full md:w-72 md:rounded-md bg-lena-blue
            text-white py-3 text-center font-bold text-lg`}
          >
            {' '}
            Suivant
          </button>
        )}
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
              <RenderBox title={q.title} image={q.logo} questions={q.questions} />
            ))}
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center mt-10">
          <RendQuestionStep title={types[step].title} questions={types[step].questions} />
        </div>
      )}
    </ParcoursLayout>
  );
};

export default QuestionsContainer;
