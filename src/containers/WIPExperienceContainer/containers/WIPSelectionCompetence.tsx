import React, { FunctionComponent, useState } from 'react';
import ParcoursLayout from '../ParcoursLayout';
import { ReactComponent as PictoExpPro } from '../../../assets/svg/exp_professional.svg';
import SelectorTest from '../../../components/design-system/SelectorTest';

const WipSelectionCompetence: FunctionComponent = () => {
  const [testSelector, setTestSelector] = useState(false);

  return (
    <ParcoursLayout>
      <div className="flex flex-col items-center justify-start space-y-8">
        <div className="flex flex-col justify-center items-center bg-lena-lightgray rounded-full h-56 w-56 space-y-2 p-4">
          <PictoExpPro />
          <div className="text-center text-lena-blue-dark font-bold text-xl">Mes expériences professionnelles</div>
        </div>
        <div>
          <div className="text-lena-blue-dark">
            Quelles sont les <strong>compétences de [!!WIP!!]</strong> que vous mettez en oeuvre ?
          </div>
          <div className="italic">Plusieurs choix possibles</div>
        </div>
        <div className="w-full flex flex-col space-y-2">
          <SelectorTest checked={testSelector} onClick={(value) => setTestSelector(value)}>
            bbbaaa aaaaaaaaaa aaaaaaa aaaaa aaaaaa aaaaaaaaaaaa aaaa
          </SelectorTest>
          <SelectorTest checked={false}>bbbaaa aaaaaaaaaa aaaaaaa aaaaa aaaaaa aaaaaaaaaaaa aaaa</SelectorTest>
          <SelectorTest checked={false}>acccaa</SelectorTest>
          <SelectorTest checked={false}>adddaa</SelectorTest>
        </div>
      </div>
    </ParcoursLayout>
  );
};

export default WipSelectionCompetence;
