import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import ParcoursExperienceLayout from 'layouts/ParcoursExperienceLayout/ParcoursExperienceLayout';
import { Theme } from 'common/requests/types';
import QuestionList from 'components/Forms/configurateur/QuestionList';

interface Props {
  setOptionActivities: (optionsActivities: { id: string; title: string }[][]) => void;
  optionActivities: { id: string; title: string }[][];
  activity: string;
  setActivity: (activity: string) => void;
  theme: Theme;
  // eslint-disable-next-line react/require-default-props
  isCreate?: boolean;
}

const Benevolat = ({ setOptionActivities, optionActivities, activity, theme, setActivity, isCreate }: Props) => {
  const [valid, setValid] = useState([] as boolean[]);

  const addActivityRow = () => {
    setOptionActivities([...optionActivities, []]);
  };

  const activityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 140) setActivity(e.target.value);
  };

  const handleValidate = (isValid: boolean, index: number) => {
    const nextValid = [...valid];
    nextValid[index] = isValid;
    setValid(nextValid);
  };

  const clearValid = (index: number) => {
    setValid(valid.filter((v, i) => i !== index));
  };
  return (
    <ParcoursExperienceLayout>
      <div>
        <p className="text-lena-blue-dark border-b-2 p-5">
          Dans cette expérience, quelles sont les activités que vous pratiquez ?
        </p>
        <p className="p-5 text-lena-blue-dark">Décrivez une activité :</p>
        <div>
          {optionActivities.map((q, index) => (
            <QuestionList
              index={index}
              optionActivities={optionActivities}
              setOptionActivities={setOptionActivities}
              handleValidate={handleValidate}
              clearValid={clearValid}
            />
          ))}
        </div>
      </div>
    </ParcoursExperienceLayout>
  );
};

export default Benevolat;
