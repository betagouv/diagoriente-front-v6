import React, { FunctionComponent, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as PictoExpPro } from 'assets/svg/exp_professional.svg';
import { Activity, Theme } from 'common/requests/types';
import { useLazyTheme } from 'common/requests/themes';
import { useDidMount } from 'common/hooks/useLifeCycle';
import ParcoursExperienceLayout from 'layouts/ParcoursExperienceLayout/ParcoursExperienceLayout';

interface Props {
  theme: Theme | undefined;
}

const DomainSelect = ({ theme }: Props) => {
  const [themeCall, themeState] = useLazyTheme({ fetchPolicy: 'network-only' });
  const history = useHistory();

  useDidMount(() => {
    if (theme) {
      themeCall({ variables: { id: theme.id } });
    }
  });

  const handleNextStep = () => {
    if (theme) {
      history.push(`/experience/${theme?.id}/date`);
    }
  };

  return (
    <ParcoursExperienceLayout>
      <div className="container py-8 md:p-14">
        <div className="flex flex-col space-y-4 items-center justify-start w-full">
          <div className="text-lena-blue-dark mt-20">Vous avez sélectionné le domaine :</div>
          <div className="bg-lena-blue-lightest font-bold md:w-auto md:px-24 w-full text-center py-3 rounded-md">
            <span className="text-lena-blue-dark font-bold">{theme?.title}</span>
          </div>
          {themeState.data && themeState.data?.theme.activities.length > 0 && (
            <ul className="list-disc list-inside">
              {themeState.data?.theme.activities.map((v) => (
                <li key={v.id}>{v.title}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="fixed bottom-0 left-0 right-0 md:relative md:mt-14 md:text-center">
          <button
            onClick={handleNextStep}
            className={`focus:ring-0 focus:outline-none w-full md:w-72 md:rounded-md bg-lena-blue
            text-white py-3 text-center font-bold text-lg`}
          >
            Valider
          </button>
        </div>
      </div>
    </ParcoursExperienceLayout>
  );
};

export default DomainSelect;
