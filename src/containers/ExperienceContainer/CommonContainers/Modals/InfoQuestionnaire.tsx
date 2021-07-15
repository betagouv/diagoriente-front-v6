import React, { useContext } from 'react';
import ModalComponent from 'components/design-system/Modal';
import { EParcoursStep, NewExperienceContext } from 'contexts/NewExperienceContext';

interface ModalArgs {
  open: boolean;
  onClose: () => void;
}

const InfoQuestionnaire = ({ open, onClose }: ModalArgs) => {
  const { setTheme, setStep, theme } = useContext(NewExperienceContext);

  return (
    <div>
      {open && (
        <ModalComponent variant="secondary" open={open} onClose={onClose} isMobile bgColor="bg-lena-turquoise-light">
          <div className="flex justify-center mb-6 mt-3">
            <div className="text-lg font-bold text-lena-blue-dark">Pourquoi nous vous demandons cela ? </div>
          </div>
          <div className="container flex flex-col items-center justify-center space-y-8">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra sapien quis nulla mollis, a
              tempus turpis facilisis. Ut ornare venenatis erat, ut interdum libero dapibus. Quisque fermentum, justo a
              vulputate pharetra, justo eros rhoncus magna, sit amet dignissim risus ligula quis lectus. Praesent
              facilisis quam vitae nulla semper, eget vulputate erat volutpat. Suspendisse viverra porttitor ornare. Bla
              bla bla réferentiel CEC 8 niveaux : nivea 1 = brevet niveau 2 = bac niveau 3 = etc
            </div>
            <div className="fixed bottom-0 left-0 right-0 md:relative">
              <button
                onClick={() => setStep(EParcoursStep.COMPETENCES)}
                className={`md:px-14 md:rounded-md
                focus:ring-0 focus:outline-none w-full
                bg-lena-blue text-white py-3 text-center font-bold text-lg`}
              >
                Compris
              </button>
            </div>
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default InfoQuestionnaire;
