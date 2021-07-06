import React, { FunctionComponent, useContext } from 'react';
import Illustration from 'assets/svg/illu_01.svg';
import { EParcoursStep, NewExperienceContext } from 'contexts/NewExperienceContext';
import ParcoursLayout from '../layout/ParcoursLayout';

const AddActivityDone: FunctionComponent = () => {
  const { setStep } = useContext(NewExperienceContext);

  return (
    <ParcoursLayout>
      <div className="bg-lena-blue-darkest flex flex-col flex-1">
        <div className="text-white flex flex-col flex-1 items-center justify-center">
          <div className="container flex flex-col items-center justify-center space-y-8">
            <div className="text-2xl font-bold">Merci !</div>
            <div className="w-full flex justify-center">
              <img src={Illustration} alt="Illustration" />
            </div>
            <div className="text-center">
              Maintenant <strong>sélectionnez les compétences</strong> que vous mettez en oeuvre dans le cadre de ces
              activités.
            </div>
            <div className="fixed bottom-0 left-0 right-0 md:relative">
              <button
                onClick={() => setStep(EParcoursStep.COMPETENCES)}
                className="md:px-14 md:rounded-md focus:ring-0 focus:outline-none w-full bg-lena-blue text-white py-3 text-center font-bold text-lg"
              >
                Sélectionner les compétences
              </button>
              <button
                onClick={() => setStep(EParcoursStep.ACTIVITIES)}
                className="mt-2 md:px-14 md:rounded-md focus:ring-0 focus:outline-none w-full bg-lena-pink-dark text-white py-3 text-center font-bold text-lg"
              >
                Retour
              </button>
            </div>
          </div>
        </div>
      </div>
    </ParcoursLayout>
  );
};

export default AddActivityDone;
