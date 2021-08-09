import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Theme } from 'common/requests/types';
import ParcoursExperienceLayout from 'layouts/ParcoursExperienceLayout/ParcoursExperienceLayout';
import Organiser from 'assets/svg/organiser.svg';
import Communication from 'assets/svg/communiquer.svg';
import Refleshir from 'assets/svg/reflechir.svg';
import useMediaQuery from 'hooks/useMediaQuery';

interface Props {
  theme: Theme | undefined;
}

const QuestionDone = ({ theme }: Props) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const mediaQueryMD = useMediaQuery('md');

  const MobileContainer = () => (
    <div className="container flex flex-col justify-center space-y-8">
      <div className="text-center">
        <div className="text-center">
          <strong className="text-2xl font-bold">
            {mediaQueryMD ? (
              <div>
                <p>Très bien, enfin dites-nous en plus sur ces</p>
                <p> 3 familles de compétences liées</p>
              </div>
            ) : (
              <div>
                <p>Merci !</p>
                <p>t’as complété 2 sur 3</p>
              </div>
            )}
          </strong>
        </div>
        <div className="text-center mt-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a consequat libero, eu auctor libero.
          Etiam nec iaculis nunc. Maecenas sed rhoncus eros, vel mattis libero.
        </div>
        <div className="flex justify-evenly mt-12">
          <div
            className="rounded-full bg-white flex flex-col items-center justify-center font-mono p-4"
            style={{
              height: mediaQueryMD ? 162 : 110,
              width: mediaQueryMD ? 162 : 110,
              color: '#000',
              background: '#C4D2F8',
            }}
          >
            <img alt="organisation" src={Organiser} />
            <span className="text-xs md:text-base font-bold mt-3">S’organiser</span>
          </div>
          <div
            className="rounded-full bg-white flex flex-col  items-center justify-center font-mono mt-14 md:mt-0 p-4"
            style={{
              height: mediaQueryMD ? 162 : 110,
              width: mediaQueryMD ? 162 : 110,
              color: '#000',
              background: '#C4D2F8',
            }}
          >
            <img alt="organisation" src={Communication} />
            <span className="text-xs md:text-base font-bold mt-3">Communiquer</span>
          </div>
          <div
            className="rounded-full bg-white flex flex-col  items-center justify-center font-mono p-4"
            style={{
              height: mediaQueryMD ? 162 : 110,
              width: mediaQueryMD ? 162 : 110,
              color: '#000',
              background: '#C4D2F8',
            }}
          >
            <img alt="organisation" src={Refleshir} />
            <span className="text-xs md:text-base font-bold mt-3">Réfléchir</span>
          </div>
        </div>
      </div>

      {mediaQueryMD ? (
        <div className="flex justify-center ">
          <button
            onClick={() => history.push(`/experience/${theme?.id}/competences`)}
            className={`md:px-14 md:rounded-md
              focus:ring-0 focus:outline-none w-full
              bg-lena-blue text-white py-3 text-center font-bold text-lg  w-1/4 mt-10`}
          >
            Suivant
          </button>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 md:relative">
          <button
            onClick={() => history.push(`/experience/${theme?.id}/competences`)}
            className={`md:px-14 md:rounded-md
                  focus:ring-0 focus:outline-none w-full
                  bg-lena-blue text-white py-3 text-center font-bold text-lg`}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
  return (
    <ParcoursExperienceLayout showMobileHeader={false}>
      <div className="bg-lena-blue-dark flex flex-col flex-1 w-full h-screen">
        <div className="w-full text-white flex flex-col flex-1 items-center justify-center">
          <MobileContainer />
        </div>
      </div>
    </ParcoursExperienceLayout>
  );
};

export default QuestionDone;
