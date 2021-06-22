import React, { FunctionComponent } from 'react';
import ParcoursLayout from '../ParcoursLayout';
import { ReactComponent as PictoExpPro } from '../../../assets/svg/exp_professional.svg';

const WipDomainSelect: FunctionComponent = () => {
  return (
    <ParcoursLayout>
      <div className="md:p-14">
        <div className="flex flex-col items-center justify-start w-full">
          <div className="flex flex-col justify-center items-center h-56 w-56 space-y-2 p-4">
            <PictoExpPro />
          </div>
          <div className="mb-5 text-lena-blue-dark">Vous avez sélectionné le domaine :</div>
          <div className="bg-lena-blue-lightest font-bold md:w-auto px-24 w-full text-center py-3 rounded-md">
            Soins esthétique et corporels
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 md:relative md:mt-14 md:text-center">
          <button className="focus:ring-0 focus:outline-none w-full md:w-72 md:rounded-md bg-lena-blue  text-white py-3 text-center font-bold text-lg">
            Valider
          </button>
        </div>
      </div>
    </ParcoursLayout>
  );
};

export default WipDomainSelect;
