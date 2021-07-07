import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as LineSvg } from 'assets/svg/line.svg';
import { ReactComponent as InfoSvg } from 'assets/svg/info_yellow.svg';
import { ReactComponent as CheckSvg } from 'assets/svg/check_blue.svg';
import classNames from 'common/utils/classNames';
import ParcoursLayout from '../layout/ParcoursLayout';

type Props = {
  onStep: () => void;
};

const SelectFamily = ({ onStep }: Props) => {
  const history = useHistory();

  const family = (left: string, right: string, active?: boolean) => {
    return (
      <button onClick={() => onStep.call(null)} className="focus:ring-0 focus:outline-none w-full">
        <li
          className={classNames(
            'flex items-center space-x-3 hover:bg-lena-yellow justify-center py-3 rounded-full mb-4 relative',
            active ? 'border-2 border-lena-yellow-dark bg-lena-yellow' : 'bg-lena-yellow-light',
          )}
        >
          <span className="text-lena-blue-dark font-bold">{left}</span>
          <LineSvg />
          <span className="text-lena-blue-dark font-bold">{right}</span>
          {active && (
            <div className="absolute -right-2">
              <CheckSvg />
            </div>
          )}
        </li>
      </button>
    );
  };

  return (
    <ParcoursLayout>
      <div className="container pt-14 flex flex-col items-center justify-start space-y-8 md:p-14">
        <h2 className="text-lena-blue-dark">
          Cliquez sur une famille pour sélectionner les centres d’intérêts associés :
        </h2>
        <div className="w-full px-5">
          <ul>
            {family('Collectif', 'Individuel', true)}
            {family('Liberté', 'Cadre')}
          </ul>
          <div className="flex justify-center">
            <button className="focus:outline-none focus:ring-0 flex flex justify-center items-center mt-7 space-x-2">
              <InfoSvg />
              <span className="text-lena-blue-dark">Comment ça marche ?</span>
            </button>
          </div>
        </div>
      </div>
    </ParcoursLayout>
  );
};

export default SelectFamily;
