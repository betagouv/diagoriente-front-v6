import React, { useEffect, useState } from 'react';
import { useAddSkill } from 'common/requests/skills';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import DatePicker from 'components/design-system/DatePicker';
import { Theme, Activity } from 'common/requests/types';

import ParcoursLayout from '../layout/ParcoursLayout';

interface Props {
  theme: Theme;
  activities: Activity[];
  levels: string[];
  competencesValues: string[];
}

const DateContainer = ({ theme, activities, levels, competencesValues }: Props) => {
  const [addSkillCall, addSkillState] = useAddSkill();
  const history = useHistory();
  const [monthStart, setMonthStart] = useState('Janvier');
  const [yearStart, setYearStart] = useState('');
  const [monthEnd, setMonthEnd] = useState('Janvier');
  const [yearEnd, setYearEnd] = useState('');
  const [currentTime, setCurrentTime] = useState(false);
  const [error, setError] = useState('');
  const onAddSkill = () => {
    if (theme?.id && activities.length && competencesValues.length && levels.length) {
      const dataToSend: {
        theme: string;
        activities: string[];
        competences: string[];
        levels: string[];
        startDate?: string;
        endDate?: string;
      } = {
        theme: theme?.id,
        activities: activities.map((act) => act.id),
        competences: competencesValues,
        levels,
      };
      if (monthStart && yearStart) {
        const sD = moment(`01-${monthStart}-${yearStart}`).toISOString();
        dataToSend.startDate = sD;
      }
      if (monthEnd && yearEnd) {
        const sE = moment(`01-${monthEnd}-${yearEnd}`).toISOString();
        dataToSend.endDate = sE;
      }
      addSkillCall({ variables: dataToSend });
    } else {
      setError('veuillez compléter tous les étapes');
    }
  };
  useEffect(() => {
    if (addSkillState.data) {
      history.push(`/experience/theme/${theme.id}/sommaire?type=${theme.domain}`);
    }
  }, [addSkillState.data]);
  return (
    <ParcoursLayout>
      <button onClick={() => history.goBack()} className="flex items-center mt-5 ml-5 focus:ring-0 focus:outline-none">
        <ArrowLeftSvg />
        <span className="text-sm mt-1 ml-3 text-lena-blue-dark">Retour</span>
      </button>
      <div className="flex flex-col items-center justify-start space-y-8 container py-8 md:p-14 relative">
        <div>
          <div className="text-lena-blue-dark">
            Pour finir, à quelles dates s’est déroulée cette expérience de
            <strong> {theme.title} </strong> ? (facultatif){' '}
          </div>
        </div>
        <DatePicker
          title="Date de début"
          month={monthStart}
          year={yearStart}
          setMonth={setMonthStart}
          setYear={setYearStart}
        />
        <DatePicker
          title="Date de fin"
          subTitle="(facultatif)"
          month={monthEnd}
          year={yearEnd}
          setMonth={setMonthEnd}
          setYear={setYearEnd}
          hasCheckBox
        />
      </div>
      <div className="flex flex-col items-center justify-start space-y-8 container py-8 md:p-14 relative">
        <button
          onClick={onAddSkill}
          className={`focus:ring-0 focus:outline-none w-full
          bg-lena-blue text-white py-3 text-center
          font-bold text-lg md:w-72 md:rounded-lg`}
        >
          Valider
        </button>
      </div>
    </ParcoursLayout>
  );
};

export default DateContainer;
