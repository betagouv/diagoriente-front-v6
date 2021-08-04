import React, { useContext } from 'react';
import ModalComponent from 'components/design-system/Modal';

type NewActivity = {
  open: boolean;
  onClose: () => void;
  extraAct: string;
  setExtraAct: (s: string) => void;
};

const AddNewActivity = ({ onClose, extraAct, open, setExtraAct }: NewActivity) => {
  const handleSend = () => {
    if (extraAct.length > 0) {
      onClose.call(null);
    }
  };

  return (
    <div>
      {open && (
        <ModalComponent
          variant="secondary"
          open={open}
          onClose={() => onClose.call(null)}
          isMobile
          bgColor="bg-lena-turquoise-light"
        >
          <div className="md:p-14 p-6 2xl:w-1/2 mx-auto">
            <h3 className="text-lena-blue-dark mb-7">
              Si elle n’est pas dans la liste, décrivez vous-même <strong>une activité</strong> que vous pratiquez :
            </h3>
            <textarea
              placeholder="ex: J'invente des recettes"
              maxLength={140}
              value={extraAct}
              onChange={(e) => setExtraAct(e.currentTarget.value)}
              className="w-full rounded-md ring-0 border-lena-lightgray2"
              rows={2}
            />
            <span className="text-sm text-lena-pink mt-2 block">
              {140 - extraAct.length} caractère{140 - extraAct.length > 1 && 's'} restant
              {140 - extraAct.length > 1 && 's'}
            </span>
            <button
              onClick={handleSend}
              className={`mt-6 rounded-md focus:ring-0 focus:outline-none w-full
          bg-lena-blue text-white py-3 text-center font-bold text-lg`}
            >
              Valider
            </button>
            <button
              onClick={() => onClose.call(null)}
              className={`mt-2 rounded-md focus:ring-0 focus:outline-none w-full bg-lena-pink-dark
          text-white py-3 text-center font-bold text-lg`}
            >
              Annuler
            </button>
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default AddNewActivity;
