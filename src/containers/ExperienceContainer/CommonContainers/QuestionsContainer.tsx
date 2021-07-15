import React from 'react';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import complexité from 'assets/svg/Picto_reflechir.svg';
import Autonomie from 'assets/svg/Picto_organiser.svg';
import Environnement from 'assets/svg/Picto_communiquer.svg';

import ParcoursLayout from '../layout/ParcoursLayout';

const types = [
  {
    title: 'Autonomie& responsabilité',
    logo: Autonomie,
    questions: [
      { id: '1', title: 'Vous avez réalisé en toute autonomie l’activité confiée' },
      {
        id: '2',
        title:
          'Vous avez réalisé en toute autonomie l’activité confiée en vous adaptant à la diversité des situations rencontrées',
      },
      {
        id: '3',
        title:
          'Vous avez coordonné et évalué au sein d’une équipe pour mettre en oeuvre la vision stratégique de l’institution ou l’entreprise',
      },
    ],
  },
  {
    title: 'Complexité',
    logo: complexité,
    questions: [
      {
        id: '1',
        title:
          'Vous avez traité des informations et interactions sur la réalisation et l’évaluation de l’activité, incluant clients / fournis-eurs / instances de contrôle',
      },
      {
        id: '2',
        title:
          'Vous avez traité des informations d’origine multiple concernant le projet et l’équipe. Interactions variées avec transformation et adaptation de messages',
      },
      {
        id: '3',
        title:
          'Multiplicité d’informationsà hiérarchiser et gérer auprès d’interlocuteurs très variés : financeurs, décideurs partenaires etopérationnels. Analyse des interactions etdes actions entre les personnes et',
      },
    ],
  },
  {
    title: 'Environnement de travail',
    logo: Environnement,
    questions: [
      {
        id: '1',
        title:
          'Vous avez traité des informations et interactions sur la réalisation et l’évaluation de l’activité, incluant clients / fournis-eurs / instances de contrôle',
      },
      {
        id: '2',
        title:
          'Vous avez traité des informations d’origine multiple concernant le projet et l’équipe. Interactions variées avec transformation et adaptation de messages',
      },
      {
        id: '3',
        title:
          'Multiplicité d’informationsà hiérarchiser et gérer auprès d’interlocuteurs très variés : financeurs, décideurs partenaires etopérationnels. Analyse des interactions etdes actions entre les personnes et',
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
  <div className="bg-lena-blue-alt-light w-full mt-5 mb-5">
    <div>
      <span>{title}</span>
      <img alt="info" src={image} />
    </div>
    <div>
      {questions.map((q) => (
        <div />
      ))}
    </div>
  </div>
);

const QuestionsContainer = () => {
  return (
    <ParcoursLayout>
      <button className="flex items-center mt-5 ml-5 focus:ring-0 focus:outline-none">
        <ArrowLeftSvg />
        <span className="text-sm mt-1 ml-3 text-lena-blue-dark">Retour</span>
      </button>
      <div className="flex flex-col items-center justify-start space-y-8 container py-8 md:p-14 relative">
        <div>Pour chaque encadré, sélectionnez la phrase qui décrit le mieux vos compétences en boulangerie : </div>
        {types.map((q) => (
          <RenderBox title={q.title} image={q.logo} questions={q.questions} />
        ))}
      </div>
    </ParcoursLayout>
  );
};

export default QuestionsContainer;
