import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as PictoExpPerso } from 'assets/svg/interet.svg';
import ParcoursInterestsLayout from '../../../../layouts/ParcoursInterestsLayout/ParcoursInterestsLayout';
import Button from '../../../../components/design-system/Button';

type Props = {
  onStep: () => void;
};

const Start = ({ onStep }: Props) => {
  return (
    <ParcoursInterestsLayout>
      <div className="container py-8 flex flex-col items-center justify-start space-y-8 md:p-14 text-center">
        <div
          className={`flex flex-col justify-center items-center
        bg-lena-lightgray rounded-full h-56 w-56 space-y-2 p-4 md:hidden`}
        >
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
        <Button variant="secondary" size="md" onClick={() => onStep?.()} mobileStacked>
          Commencer
        </Button>
      </div>
    </ParcoursInterestsLayout>
  );
};

export default Start;
