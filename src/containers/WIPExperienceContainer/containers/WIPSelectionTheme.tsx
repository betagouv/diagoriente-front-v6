import React, { FunctionComponent } from 'react';
import { ReactComponent as PictoExpPro } from 'assets/svg/exp_professional.svg';
import ParcoursLayout from '../ParcoursLayout';

const WipSelectionTheme: FunctionComponent = () => {
  return (
    <ParcoursLayout>
      <div className="flex flex-col items-center justify-start space-y-8">
        <div className="flex flex-col justify-center items-center bg-lena-lightgray rounded-full h-56 w-56 space-y-2 p-4">
          <PictoExpPro />
          <div className="text-center text-lena-blue-dark font-bold text-xl">Mes expériences professionnelles</div>
        </div>
        <div className="text-lena-blue-dark">Décrivez en quelques mots votre expérience professionnelle :</div>
        <input type="text" className="border-red-400 rounded-md w-full" placeholder="Vente de fleurs" />
      </div>
    </ParcoursLayout>
  );
};

export default WipSelectionTheme;
