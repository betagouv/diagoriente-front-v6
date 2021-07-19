import React, { FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Theme } from 'common/requests/types';
import Illustration from 'assets/svg/illu_01.svg';
import InfoPicto from 'assets/svg/picto_info.svg';
import useMediaQuery from 'hooks/useMediaQuery';
import ParcoursLayout from '../layout/ParcoursLayout';
import ModalInfo from './Modals/InfoQuestionnaire';

interface Props {
  theme: Theme;
}

const AddActivityDone = ({ theme }: Props) => {
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
        <div className="flex justify-evenly">
          <div
            className="rounded-full bg-white flex items-center justify-center font-mono"
            style={{ height: 109, width: 109, color: '#000' }}
          >
            Environnement de travail
          </div>
          <div
            className="rounded-full bg-white flex items-center justify-center font-mono"
            style={{ height: 109, width: 109, color: '#000' }}
          >
            Complexité
          </div>
          <div
            className="rounded-full bg-white flex items-center justify-center font-mono"
            style={{ height: 109, width: 109, color: '#000' }}
          >
            Autonomie et responsabilité
          </div>
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
      </div>
    </div>
  );
  return (
    <ParcoursLayout>
      <div className="bg-lena-blue-darkest flex flex-col flex-1 w-full">
        <div className="w-full text-white flex flex-col flex-1 items-center justify-center">
          {mediaQueryMD ? <Desckcontainer /> : <MobileContainer />}
        </div>
      </div>
      <ModalInfo open={open} onClose={() => setOpen(false)} />
    </ParcoursLayout>
  );
};

export default AddActivityDone;
