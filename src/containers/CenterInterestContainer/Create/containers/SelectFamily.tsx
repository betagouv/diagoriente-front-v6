import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as LineSvg } from 'assets/svg/line.svg';
import { ReactComponent as InfoSvg } from 'assets/svg/info_yellow.svg';
import { ReactComponent as CheckSvg } from 'assets/svg/check_blue.svg';
import CollectifSvg from 'assets/svg/collectif.svg';
import IndividuelSvg from 'assets/svg/individuel.svg';
import classNames from 'common/utils/classNames';
import useMediaQuery from "hooks/useMediaQuery";
import ParcoursLayout from "../layout/ParcoursLayout";

type Props = {
  onStep: () => void;
};

const SelectFamily = ({ onStep }: Props) => {
  const history = useHistory();
  const mediaQueryMD = useMediaQuery('md');

  const family = (left: string, right: string, imgLeft: any, imgRight: any, active?: boolean,) => {
    return (
      <button onClick={() => onStep.call(null)} className="focus:ring-0 focus:outline-none w-full">
        <li className={
          classNames(
            "flex justify-between items-center px-10 py-2 md:py-5 rounded-lg border-2 border-transparent relative",
            "hover:bg-opacity-60 hover:border-lena-gray-light-2 bg-opacity-30",
            active ? "bg-lena-yellow-light border-lena-yellow" : "bg-lena-gray-light-2"
          )
        }>
          <img src={imgLeft} alt="Svg" />
          <span className="text-lena-blue-dark">
              {left} / {right}
            </span>
          <img src={imgRight} alt="Svg" />
          {active && (
            <div className="absolute -right-2 -top-2">
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
        <div className={
          classNames(

          )
        }>
          <div className={
            classNames(
              !mediaQueryMD ? "hidden" : "xl:w-3/4 w-full mx-auto"
            )
          }>
            <p className="text-lena-blue-dark mb-5">
              Pour votre futur métier, vous êtes peut-être intéressé.e par des choses que vous avez déjà faites ou des
              choses nouvelles, des choses très précises ou très générales...
            </p>
            <p className="text-lena-blue-dark">
              Plus de 200 centres d'intérêt sont disponibles et classés par familles pour vous faciliter la tâche.
            </p>
            <p className="text-lena-blue-dark mt-5 font-bold">
              Pour commencer, cliquez sur une famille pour sélectionner les centres d’intérêts associés :
            </p>
          </div>
          <p className={
            classNames(
              "text-lena-blue-dark mt-5",
              mediaQueryMD && "hidden"
            )
          }>
            Cliquez sur une famille pour sélectionner les centres d’intérêts associés :
          </p>
        </div>
        <div className="w-full px-5">
          <ul className={
            classNames(
              "space-y-2",
              mediaQueryMD && "xl:w-1/2 w-full mx-auto"
            )
          }>
            {family('Collectif', 'Individuel', CollectifSvg, IndividuelSvg, true)}
            {family('Liberté', 'Cadre', CollectifSvg, IndividuelSvg)}
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
