import React, { FunctionComponent, useContext, useState, useEffect } from 'react';
import { uniqueId } from 'lodash';
import { RouteComponentProps, useHistory, useParams, useLocation } from 'react-router-dom';
import { useLazyTheme } from 'common/requests/themes';
import { useDidMount } from 'common/hooks/useLifeCycle';
import { decodeUri } from 'common/utils/url';
import SelectorTest from 'components/design-system/SelectorTest';
import { EParcoursStep, NewExperienceContext } from 'contexts/NewExperienceContext';
import { Activity } from 'common/requests/types';
import useMediaQuery from 'hooks/useMediaQuery';
import SaveButtonComponent from 'components/design-system/SaveButton';
import classNames from 'common/utils/classNames';
import ParcoursLayout from '../layout/ParcoursLayout';

type NewActivity = {
  onSend: (e: string) => void;
  onClose: () => void;
};

interface Props extends RouteComponentProps<{ themeId: string }> {
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
}

const AddNewActivity = ({ onSend, onClose }: NewActivity) => {
  const [text, setText] = useState(String);

  const handleSend = () => {
    if (text.length > 0) {
      onSend.call(null, text);
      onClose.call(null);
    }
  };

  return (
    <div className="md:p-14 2xl:w-1/2 mx-auto">
      <h3 className="text-lena-blue-dark mb-7">
        Si elle n’est pas dans la liste, décrivez vous-même <strong>une activité</strong> que vous pratiquez :
      </h3>
      <textarea
        placeholder="ex: J'invente des recettes"
        maxLength={140}
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        className="w-full rounded-md ring-0 border-lena-lightgray2"
        rows={2}
      />
      <span className="text-sm text-lena-pink mt-2 block">
        {140 - text.length} caractère{140 - text.length > 1 && 's'} restant{140 - text.length > 1 && 's'}
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

const ChoixActivites = ({ activities, setActivities }: Props) => {
  const history = useHistory();
  const location = useLocation();
  const params: { id: string } = useParams();
  const query = decodeUri(location.search);

  const { theme } = useContext(NewExperienceContext);
  const [activitiesChecked, setActivitiesChecked] = useState<Array<any>>(activities);
  const [todoRenameActivities, setTodoRenameActivities] = useState<Activity[]>([]);
  const [showNewActivity, setShowNewActivity] = useState(false);
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

  const handleAddNewActivity = (value: string) => {
    // TODO find a new logic for this ...
    const newId = uniqueId('local-');
    const data = { id: newId, title: value, description: '', extra: true };
    setTodoRenameActivities([...todoRenameActivities, data]);
    setActivitiesChecked([...activitiesChecked, data]);
  };

  const handleValidateActivites = () => {
    if (activitiesChecked.length !== 0) {
      if (params.id && query) {
        history.push(`/experience/theme/${params?.id}/doneAct?type=${query.type}`);
      }
      setActivities(activitiesChecked);
    }
  };

  return (
    <ParcoursLayout>
      {!showNewActivity ? (
        <div className="container py-8 md:p-14 2xl:w-3/4 md:w-full md:mx-auto">
          <div className="relative min-h-full md:min-h-0">
            <div className="text-lena-blue-dark">
              Dans le cadre de la {theme?.title}, quelles sont les <strong>activités</strong> que vous pratiquez ?
            </div>
            <div className="italic mt-2">Plusieurs choix possibles</div>
          </div>
          <div className="w-full mt-8 relative mb-24">
            <div className="md:grid xl:grid-cols-2 gap-4 space-y-3 md:space-y-0">
              {todoRenameActivities.map((activity) => (
                <SelectorTest
                  key={activity.id}
                  onClick={(e) => handleCheck(activity.id, e)}
                  checked={activitiesChecked.find((v) => v.id === activity.id)}
                >
                  {activity.title}
                </SelectorTest>
              ))}
            </div>
            <div className="flex justify-center md:mt-10">
              <button onClick={() => setShowNewActivity(true)} className="text-lena-blue-dark font-bold mt-2">
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
      ) : (
        <AddNewActivity onSend={(e: string) => handleAddNewActivity(e)} onClose={() => setShowNewActivity(false)} />
      )}
    </ParcoursLayout>
  );
};

export default ChoixActivites;
