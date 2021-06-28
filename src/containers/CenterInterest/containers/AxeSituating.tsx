import React from 'react';
import ParcoursLayout from '../layout/ParcoursLayout';

type Props = {
  onStep: () => void;
};

const AxeSituation = ({ onStep }: Props) => {
  return (
    <ParcoursLayout withRange={false} backgroundColor="yellow">
      <div className="flex flex-col justify-center flex-grow w-full">
        <h2 className="text-center mb-16">Sur cet axe, comment vous situez-vous ?</h2>
        <div className="w-full px-10">
          <div className="flex justify-between">
            <span className="text-center text-lena-blue-dark font-bold">
              Travail <br />
              collectif
            </span>
            <span className="text-center text-lena-blue-dark font-bold">
              Travail <br />
              individuel
            </span>
          </div>
          <div className="bg-lena-blue-alt-light h-5 rounded-full mt-3">
            <div className="h-full flex justify-around relative">
              <div className="bg-lena-blue-dark bg-opacity-20 w-5 h-full" />
              <div className="bg-lena-blue-dark bg-opacity-20 w-5 h-full" />
              <div className="bg-lena-blue-dark bg-opacity-20 w-5 h-full" />
              <div className="bg-lena-blue-dark bg-opacity-20 w-5 h-full" />
              <div className="bg-lena-blue-dark bg-opacity-20 w-5 h-full" />
              <div className="absolute" style={{ height: 35, top: -8 }}>
                <div className="bg-lena-yellow-dark h-full w-5 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0">
          <button
            onClick={() => onStep.call(null)}
            className="focus:ring-0 focus:outline-none w-full bg-lena-blue text-white py-3 text-center font-bold text-lg"
          >
            Valider
          </button>
        </div>
      </div>
    </ParcoursLayout>
  );
};

export default AxeSituation;
