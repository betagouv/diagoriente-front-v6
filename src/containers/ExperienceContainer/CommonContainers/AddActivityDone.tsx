import React, { FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Illustration from 'assets/svg/illu_01.svg';
import { EParcoursStep, NewExperienceContext } from 'contexts/NewExperienceContext';
import InfoPicto from 'assets/svg/picto_info.svg';
import ParcoursLayout from '../layout/ParcoursLayout';
import ModalInfo from './Modals/InfoQuestionnaire';

const AddActivityDone: FunctionComponent = () => {
  const history = useHistory();
  const { setStep, theme } = useContext(NewExperienceContext);
  const [open, setOpen] = useState(false);

  return (
    <ParcoursLayout>
      <div className="bg-lena-blue-darkest flex flex-col flex-1">
        <div className="text-white flex flex-col flex-1 items-center justify-center">
          <div className="container flex flex-col items-center justify-center space-y-8">
            {theme?.domain !== 'professional' && <div className="text-2xl font-bold">Merci !</div>}
            <div className="w-full flex justify-center">
              <img src={Illustration} alt="Illustration" />
            </div>
            {theme?.domain !== 'professional' ? (
              <div className="text-center">
                Maintenant <strong>sélectionnez les compétences</strong> que vous mettez en oeuvre dans le cadre de ces
                activités.
              </div>
            ) : (
              <div className="text-center">
                <>
                  <div className="text-center">
                    <strong className="text-2xl font-bold">Merci !</strong>
                  </div>
                  <div className="text-center mt-5">
                    Maintenant nous allons vous poser quelques questions afin de{' '}
                    <strong>déterminer et évaluer les compétences</strong> que vous mettez en oeuvre dans le cadre de
                    ces activités.
                  </div>
                  <div className="flex justify-center mt-7" onClick={() => setOpen(true)}>
                    <img alt="info" className="cursor-pointer" src={InfoPicto} />
                    <span className="ml-3 cursor-pointer">Pourquoi ?</span>
                  </div>
                </>
              </div>
            )}
            {theme?.domain !== 'professional' ? (
              <div className="fixed bottom-0 left-0 right-0 md:relative">
                <button
                  onClick={() => setStep(EParcoursStep.COMPETENCES)}
                  className={`md:px-14 md:rounded-md
                focus:ring-0 focus:outline-none w-full
                bg-lena-blue text-white py-3 text-center font-bold text-lg`}
                >
                  Sélectionner les compétences
                </button>
                <button
                  onClick={() => setStep(EParcoursStep.ACTIVITIES)}
                  className={`mt-2 md:px-14 md:rounded-md focus:ring-0
                focus:outline-none w-full bg-lena-pink-dark
                text-white py-3 text-center font-bold text-lg`}
                >
                  Retour
                </button>
              </div>
            ) : (
              <div className="fixed bottom-0 left-0 right-0 md:relative">
                <button
                  onClick={() => history.push(`/experience/theme/question?type=${theme.domain}`)}
                  className={`md:px-14 md:rounded-md
                focus:ring-0 focus:outline-none w-full
                bg-lena-blue text-white py-3 text-center font-bold text-lg`}
                >
                  C'est compris
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalInfo open={open} onClose={() => setOpen(false)} />
    </ParcoursLayout>
  );
};

export default AddActivityDone;
