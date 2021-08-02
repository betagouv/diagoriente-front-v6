import React, { FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Theme } from 'common/requests/types';
import Illustration from 'assets/svg/illu_01.svg';
import InfoPicto from 'assets/svg/picto_info.svg';
import useMediaQuery from 'hooks/useMediaQuery';
import ParcoursExperienceLayout from 'layouts/ParcoursExperienceLayout/ParcoursExperienceLayout';
import ModalInfo from './Modals/InfoQuestionnaire';

interface Props {
  theme: Theme;
}

const AddActivityDone = ({ theme }: Props) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const mediaQueryMD = useMediaQuery('md');
  const MobileContainer = () => (
    <div className="container flex flex-col justify-center space-y-8">
      <div className="text-center">
        <div className="text-center">
          {mediaQueryMD ? (
            <>
              <p className="text-2xl font-bold">Très bien, maintenant dites-nous en plus sur</p>
              <p className="text-2xl font-bold">ces 3 familles de caractéristiques liées</p>
            </>
          ) : (
            <p className="text-2xl font-bold">Merci ! étape 1 sur 3</p>
          )}
        </div>
        {mediaQueryMD ? (
          <p className="mt-6">Lorem ipsum dolor sit amet</p>
        ) : (
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a consequat libero, eu auctor libero.
            Etiam nec iaculis nunc. Maecenas sed rhoncus eros, vel mattis libero.{' '}
          </p>
        )}

        <div className="flex justify-evenly mt-12">
          <div
            className="rounded-full bg-white flex items-center justify-center font-mono p-4"
            style={{
              height: mediaQueryMD ? 162 : 110,
              width: mediaQueryMD ? 162 : 110,
              color: '#000',
              background: '#C4D2F8',
            }}
          >
            <span className="text-xs md:text-base font-bold">Environnement de travail</span>
          </div>
          <div
            className="rounded-full bg-white flex items-center justify-center font-mono mt-14 md:mt-0 p-4"
            style={{
              height: mediaQueryMD ? 162 : 110,
              width: mediaQueryMD ? 162 : 110,
              color: '#000',
              background: '#C4D2F8',
            }}
          >
            <span className="text-xs md:text-base font-bold">Complexité</span>
          </div>
          <div
            className="rounded-full bg-white flex items-center justify-center font-mono p-4"
            style={{
              height: mediaQueryMD ? 162 : 110,
              width: mediaQueryMD ? 162 : 110,
              color: '#000',
              background: '#C4D2F8',
            }}
          >
            <span className="text-xs md:text-base font-bold">Autonomie et responsabilité</span>
          </div>
        </div>
      </div>

      {mediaQueryMD ? (
        <div className="flex justify-center ">
          <button
            onClick={() => history.push(`/experience/theme/${theme.id}/question?type=${theme.domain}`)}
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
            onClick={() => history.push(`/experience/theme/${theme.id}/question?type=${theme.domain}`)}
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
    <ParcoursExperienceLayout>
      <div className="bg-lena-blue-dark flex flex-col flex-1 w-full h-screen">
        <div className="w-full text-white flex flex-col flex-1 items-center justify-center">
          <MobileContainer />
        </div>
      </div>
      <ModalInfo open={open} onClose={() => setOpen(false)} />{' '}
    </ParcoursExperienceLayout>
  );
};

export default AddActivityDone;
