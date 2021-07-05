import React from 'react';
import SelectorTest from 'components/design-system/SelectorTest';
import ParcoursLayout from '../layout/ParcoursLayout';

const Notion = () => {
  return (
    <ParcoursLayout withRange={true}>
      <div className="flex flex-col items-start w-full pt-5 px-8">
        <h3 className="text-lena-blue-dark">Sélectionnez les notions qui vous correspondent :</h3>
        <span className="text-sm italic inline-block mt-1">Plusieurs choix possibles</span>
        <div className="w-full mt-8">
          <SelectorTest color="yellow" checked={false}>
            test
          </SelectorTest>
          <div className="mt-2">
            <SelectorTest color="yellow" checked={true}>
              test
            </SelectorTest>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <button className="focus:ring-0 focus:outline-none w-full bg-lena-blue text-white py-3 text-center font-bold text-lg">
          Valider
        </button>
      </div>
    </ParcoursLayout>
  );
};

export default Notion;
