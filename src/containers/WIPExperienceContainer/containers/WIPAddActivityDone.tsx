import React, { FunctionComponent } from 'react';
import Illustration from 'assets/svg/illu_01.svg';

const WipAddActivityDone: FunctionComponent = () => (
  <div className="bg-lena-blue-darkest min-h-screen flex flex-col flex-1">
    <div className="text-white flex flex-col flex-1 items-center justify-center">
      <div className="container flex flex-col items-center justify-center space-y-8">
        <div className="text-2xl font-bold">Merci !</div>
        <div className="w-full flex justify-center">
          <img src={Illustration} style={{ width: '60%', height: 'auto' }} alt="Illustration" />
        </div>
        <div className="text-center">
          Maintenant <strong>sélectionnez les compétences</strong> que vous mettez en oeuvre dans le cadre de ces
          activités.
        </div>
        <div className="fixed bottom-0 left-0 right-0">
          <button className="focus:ring-0 focus:outline-none w-full bg-lena-blue text-white py-3 text-center font-bold text-lg">
            Sélectionner les compétences
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default WipAddActivityDone;
