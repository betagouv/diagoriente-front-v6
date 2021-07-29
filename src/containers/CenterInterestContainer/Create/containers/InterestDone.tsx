import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import ParcoursInterestsLayout from '../../../../layouts/ParcoursInterestsLayout/ParcoursInterestsLayout';
import Illustration from '../../../../assets/svg/illu_01.svg';

const InterestDone: FunctionComponent = () => {
  const history = useHistory();

  return (
    <ParcoursInterestsLayout>
      <div className="bg-lena-blue-darkest flex flex-col flex-1 w-full">
        <div className="w-full text-white flex flex-col flex-1 items-center justify-center space-y-8">
          <div className="container flex flex-col items-center justify-center space-y-8">
            <div className="text-center">
              <strong className="text-2xl font-bold">Merci !</strong>
            </div>
            <div className="w-full flex justify-center">
              <img src={Illustration} alt="Illustration" />
            </div>
            <div className="text-center">
              <div className="mt-5">
                <span>Grâce aux expériences et aux centres d’intérêts que vous avez renseigné,</span>
                <span>
                  nous pouvons vous proposer des <strong>pistes métiers</strong>.
                </span>
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 md:relative">
            <button
              onClick={() => history.push('/top_metiers')}
              className={`md:px-14 md:rounded-md
                  focus:ring-0 focus:outline-none w-full
                  bg-lena-blue text-white py-3 text-center font-bold text-lg`}
            >
              Voir les pistes métiers
            </button>
          </div>
        </div>
      </div>
    </ParcoursInterestsLayout>
  );
};

export default InterestDone;
