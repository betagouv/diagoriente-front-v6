import React, { FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Theme } from 'common/requests/types';
import Illustration from 'assets/svg/illu_01.svg';
import InfoPicto from 'assets/svg/picto_info.svg';

import Organiser from 'assets/svg/organiser.svg';
import Communication from 'assets/svg/communiquer.svg';
import Refleshir from 'assets/svg/reflechir.svg';

import useMediaQuery from 'hooks/useMediaQuery';
import ParcoursLayout from '../layout/ParcoursLayout';
import ModalInfo from './Modals/InfoQuestionnaire';

interface Props {
  theme: Theme;
}

const QuestionDone = ({ theme }: Props) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const mediaQueryMD = useMediaQuery('md');

  const Desckcontainer = () => (
    <div className="container flex flex-col items-center justify-center space-y-8">
      <div className="w-full flex justify-center">
        <img src={Illustration} alt="Illustration" />
      </div>
      <div className="text-center">
        <div className="text-center">
          <strong className="text-2xl font-bold">Merci !</strong>
        </div>
        <div className="text-center mt-5">
          Maintenant nous allons vous poser quelques questions afin de{' '}
          <strong>déterminer et évaluer les compétences</strong> que vous mettez en oeuvre dans le cadre de ces
          activités.
        </div>
        <div className="flex justify-center mt-7" onClick={() => setOpen(true)}>
          <img alt="info" className="cursor-pointer" src={InfoPicto} />
          <span className="ml-3 cursor-pointer">Pourquoi ?</span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 md:relative">
        <button
          onClick={() => history.push(`/experience/theme/${theme.id}/question?type=${theme.domain}`)}
          className={`md:px-14 md:rounded-md
                  focus:ring-0 focus:outline-none w-full
                  bg-lena-blue text-white py-3 text-center font-bold text-lg`}
        >
          C'est compris
        </button>
        <button
          onClick={() => history.goBack()}
          className={`mt-2 md:px-14 md:rounded-md focus:ring-0
                  focus:outline-none w-full bg-lena-pink-dark
                  text-white py-3 text-center font-bold text-lg`}
        >
          Retour
        </button>
      </div>
    </div>
  );
  const MobileContainer = () => (
    <div className="container flex flex-col justify-center space-y-8">
      <div className="text-center">
        <div className="text-center">
          <strong className="text-2xl font-bold">Merci !</strong>
        </div>
        <div className="text-center mt-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a consequat libero, eu auctor libero.
          Etiam nec iaculis nunc. Maecenas sed rhoncus eros, vel mattis libero.
        </div>
        <div className="flex justify-evenly mt-12">
          <div
            className="rounded-full bg-white flex flex-col items-center justify-center font-mono p-4"
            style={{ height: 110, width: 110, color: '#000', background: '#C4D2F8' }}
          >
            <img alt="organisation" src={Organiser} />
            <span className="text-xs font-bold mt-3">S’organiser</span>
          </div>
          <div
            className="rounded-full bg-white flex flex-col  items-center justify-center font-mono mt-14 p-4"
            style={{ height: 110, width: 110, color: '#000', background: '#C4D2F8' }}
          >
            <img alt="organisation" src={Communication} />
            <span className="text-xs font-bold mt-3">Communiquer</span>
          </div>
          <div
            className="rounded-full bg-white flex flex-col  items-center justify-center font-mono p-4"
            style={{ height: 110, width: 110, color: '#000', background: '#C4D2F8' }}
          >
            <img alt="organisation" src={Refleshir} />
            <span className="text-xs font-bold mt-3">Réfléchir</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 md:relative">
        <button
          onClick={() => history.push(`/experience/theme/${theme.id}/competences?type=${theme.domain}`)}
          className={`md:px-14 md:rounded-md
                  focus:ring-0 focus:outline-none w-full
                  bg-lena-blue text-white py-3 text-center font-bold text-lg`}
        >
          C'est compris
        </button>
      </div>
    </div>
  );
  return (
    <>
      <div className="bg-lena-blue-darkest flex flex-col flex-1 w-full h-screen">
        <div className="w-full text-white flex flex-col flex-1 items-center justify-center">
          {mediaQueryMD ? <Desckcontainer /> : <MobileContainer />}
        </div>
      </div>
      <ModalInfo open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default QuestionDone;
