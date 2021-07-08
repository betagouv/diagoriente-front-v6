import React, { useContext, useEffect, useState } from 'react';
import { useAddSkill } from 'common/requests/skills';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { NewExperienceContext, EParcoursStep } from 'contexts/NewExperienceContext';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import DatePicker from 'components/design-system/DatePicker';
import ParcoursLayout from '../layout/ParcoursLayout';

const DateContainer = () => {
  const { theme, competencesValues, activities, setCompetencesValues, setStep, setCompetences } =
    useContext(NewExperienceContext);
  const [addSkillCall, addSkillState] = useAddSkill();
  const [monthStart, setMonthStart] = useState('Janvier');
  const [yearStart, setYearStart] = useState('');
  const [monthEnd, setMonthEnd] = useState('Janvier');
  const [yearEnd, setYearEnd] = useState('');
  const [currentTime, setCurrentTime] = useState(false);

  const onAddSkill = () => {
    if (theme?.id && activities.length && competencesValues.length) {
      const dataToSend: {
        theme: string;
        activities: string[];
        competences: {
          competence: string;
          value: number;
        }[];
        startDate?: string;
        endDate?: string;
      } = {
        theme: theme?.id,
        activities: activities.map((act) => act.id),
        competences: competencesValues.map((cmp) => ({ competence: cmp.id, value: cmp.value })),
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
      console.log('error');
    }
  };
  useEffect(() => {
    if (addSkillState.data) {
      setStep(EParcoursStep.DONE);
    }
  }, [addSkillState.data]);
  return (
    <ParcoursLayout>
      <button
        onClick={() => setStep(EParcoursStep.COMPETENCES)}
        className="flex items-center mt-5 ml-5 focus:ring-0 focus:outline-none"
      >
        <ArrowLeftSvg />
        <span className="text-sm mt-1 ml-3 text-lena-blue-dark">Retour</span>
      </button>
      <div className="flex flex-col items-center justify-start space-y-8 container py-8 md:p-14 relative">
        <div>
          <div className="text-lena-blue-dark">
            Pour finir, à quelles dates s’est déroulée cette expérience de
            <strong> boulangerie </strong> ? (facultatif){' '}
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
