import React, { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import { useLazyTheme } from 'common/requests/themes';
import { useDidMount } from 'common/hooks/useLifeCycle';
import { decodeUri } from 'common/utils/url';
import SelectorTest from 'components/design-system/SelectorTest';
import { Activity, Theme } from 'common/requests/types';
import useMediaQuery from 'hooks/useMediaQuery';
import SaveButtonComponent from 'components/design-system/SaveButton';
import classNames from 'common/utils/classNames';
import ParcoursExperienceLayout from 'layouts/ParcoursExperienceLayout/ParcoursExperienceLayout';
import AppLoader from 'components/ui/AppLoader';
import AddNewActivityModal from './Modals/AddNewActivity';

type NewActivity = {
  onClose: () => void;
  extraAct: string;
  setExtraAct: (s: string) => void;
};

interface Props {
  theme: Theme | undefined;
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
  extraAct: string;
  setExtraAct: (s: string) => void;
}

const AddNewActivity = ({ onClose, extraAct, setExtraAct }: NewActivity) => {
  const handleSend = () => {
    if (extraAct.length > 0) {
      onClose.call(null);
    }
  };

  return (
    <div className="md:p-14 p-6 2xl:w-1/2 mx-auto">
      <h3 className="text-lena-blue-dark mb-7">
        Si elle n’est pas dans la liste, décrivez vous-même <strong>une activité</strong> que vous pratiquez :
      </h3>
      <textarea
        placeholder="ex: J'invente des recettes"
        maxLength={140}
        value={extraAct}
        onChange={(e) => setExtraAct(e.currentTarget.value)}
        className="w-full rounded-md ring-0 border-lena-lightgray2"
        rows={2}
      />
      <span className="text-sm text-lena-pink mt-2 block">
        {140 - extraAct.length} caractère{140 - extraAct.length > 1 && 's'} restant{140 - extraAct.length > 1 && 's'}
      </span>
      <button
        onClick={handleSend}
        className={`mt-6 rounded-md focus:ring-0 focus:outline-none w-full
        bg-lena-blue text-white py-3 text-center font-bold text-lg`}
      >
        Valider
      </button>
      <button
        onClick={() => onClose.call(null)}
        className={`mt-2 rounded-md focus:ring-0 focus:outline-none w-full bg-lena-pink-dark
        text-white py-3 text-center font-bold text-lg`}
      >
        Annuler
      </button>
    </div>
  );
};

const ChoixActivites = ({ activities, theme, extraAct, setExtraAct, setActivities }: Props) => {
  const history = useHistory();
  const location = useLocation();
  const params: { id: string } = useParams();
  const query = decodeUri(location.search);

  const [activitiesChecked, setActivitiesChecked] = useState<Array<any>>(activities);
  const [todoRenameActivities, setTodoRenameActivities] = useState<Activity[]>([]);
  const [showNewActivity, setShowNewActivity] = useState(false);
  const [showNewActivityMobile, setShowNewActivityMobile] = useState(false);

  const [themeCall, themeState] = useLazyTheme({ fetchPolicy: 'network-only' });

  const mediaQueryMD = useMediaQuery('md');
  useDidMount(() => {
    if (params.id) {
      themeCall({ variables: { id: params.id } });
    }
  });

  useEffect(() => {
    if (themeState.data?.theme) {
      setTodoRenameActivities(themeState.data?.theme.activities);
    }
  }, [themeState.data]);

  useEffect(() => {
    if (activities.length) {
      setTodoRenameActivities(activities);
    }
  }, [activities]);

  const handleCheck = (value: string, checked: boolean) => {
    if (checked) {
      setActivitiesChecked([...activitiesChecked, todoRenameActivities.find((v) => v.id === value)]);
    } else {
      const updatedArray = activitiesChecked.filter((e) => e.id !== value);
      setActivitiesChecked(updatedArray);
    }
  };

  const handleValidateActivites = () => {
    if (activitiesChecked.length !== 0) {
      if (params.id && query) {
        history.push(`/experience/${params?.id}/doneAct`);
      }
      setActivities(activitiesChecked);
    }
  };
  return (
    <ParcoursExperienceLayout>
      {!showNewActivityMobile ? (
        <>
          {mediaQueryMD && (
            <button
              onClick={() => history.goBack()}
              className="flex items-center mt-5 ml-5 focus:ring-0 focus:outline-none"
            >
              <ArrowLeftSvg />
              <span className="text-sm mt-1 ml-3 text-lena-blue-dark">Retour</span>
            </button>
          )}
          <div className="container py-8 md:p-14 2xl:w-3/4 md:w-full md:mx-auto">
            <div className="relative min-h-full md:min-h-0 mb-8">
              <div
                className={`text-lena-blue-dark text-left md:text-center
              md:font-bold text-base md:text-xl md:leading-8`}
              >
                Dans le cadre de la {theme?.title},
              </div>
              <div
                className={`text-lena-blue-dark text-left md:text-center
              md:font-bold text-base md:text-xl md:leading-8`}
              >
                quelles sont les <strong>activités</strong> que vous pratiquez ?
              </div>
              <div className="italic mt-2 text-left md:text-center text-sm">Plusieurs choix possibles</div>
            </div>
            <div className="w-full mt-8 relative mb-24">
              <div className="md:grid xl:grid-cols-2 gap-4 space-y-3 md:space-y-0">
                {themeState.loading && <AppLoader />}
                {todoRenameActivities.map((activity) => (
                  <SelectorTest
                    key={activity.id}
                    onClick={(e) => handleCheck(activity.id, e)}
                    checked={activitiesChecked.find((v) => v.id === activity.id)}
                    withCheckBox
                  >
                    {activity.title}
                  </SelectorTest>
                ))}
              </div>
              <div className="flex justify-center md:mt-10">
                <button
                  onClick={() => (mediaQueryMD ? setShowNewActivity(true) : setShowNewActivityMobile(true))}
                  className="text-lena-blue-dark font-bold mt-2"
                >
                  Ajouter une activité non listée
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              {!mediaQueryMD && activitiesChecked.length === 0 ? (
                <SaveButtonComponent isMobile={true} />
              ) : (
                <div className="fixed bottom-0 left-0 right-0 md:relative">
                  <button
                    disabled={activitiesChecked.length === 0}
                    onClick={handleValidateActivites}
                    className={classNames(
                      `focus:ring-0 focus:outline-none w-full
                    text-white py-3 text-center font-bold
                    text-lg md:w-72 md:rounded-lg`,
                      activitiesChecked.length > 0 ? 'bg-lena-blue' : 'bg-gray-300',
                    )}
                  >
                    Valider
                  </button>
                </div>
              )}
            </div>
          </div>
          <AddNewActivityModal
            open={showNewActivity}
            onClose={() => setShowNewActivity(false)}
            extraAct={extraAct}
            setExtraAct={setExtraAct}
          />
        </>
      ) : (
        <AddNewActivity onClose={() => setShowNewActivityMobile(false)} setExtraAct={setExtraAct} extraAct={extraAct} />
      )}
    </ParcoursExperienceLayout>
  );
};

export default ChoixActivites;
