import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as PictoExpPerso } from 'assets/svg/interet.svg';
import ParcoursLayout from '../layout/ParcoursLayout';

type Props = {
  onStep: () => void;
};

const Start = ({ onStep }: Props) => {
  const history = useHistory();
  return (
    <ParcoursLayout>
      <div className="container py-8 flex flex-col items-center justify-start space-y-8 md:p-14 text-center">
        <div className="flex flex-col justify-center items-center bg-lena-lightgray rounded-full h-56 w-56 space-y-2 p-4 md:hidden">
          <PictoExpPerso style={{ height: 60 }} />
          <div className="text-center text-lena-blue-dark font-bold text-xl">Mes centres d'intérêt</div>
        </div>
        <p className="text-lena-blue-dark">
          Pour votre futur métier, vous êtes peut-être intéressé.e par des choses que vous avez déjà faites ou des
          choses nouvelles, des choses très précises ou très générales...
        </p>
        <p className="text-lena-blue-dark">
          Plus de 200 centres d'intérêt sont disponibles et classés par familles pour vous faciliter la tâche.
        </p>
      </div>
      <div onClick={() => onStep.call(null)} className="fixed bottom-0 left-0 right-0 md:relative">
        <button className="focus:ring-0 focus:outline-none w-full bg-lena-blue text-white py-3 text-center font-bold text-lg md:w-72 md:rounded-lg">
          Commencer
        </button>
      </div>
    </ParcoursLayout>
  );
};

export default Start;
