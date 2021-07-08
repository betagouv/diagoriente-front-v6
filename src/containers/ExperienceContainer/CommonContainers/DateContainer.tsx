import React, { useContext, useEffect, useState } from 'react';
import { useAddSkill } from 'common/requests/skills';
import { useHistory } from 'react-router-dom';
import { NewExperienceContext, EParcoursStep } from 'contexts/NewExperienceContext';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import DatePicker from 'components/design-system/DatePicker';
import ParcoursLayout from '../layout/ParcoursLayout';

const DateContainer = () => {
  const history = useHistory();
  const { theme, competencesValues, activities, setCompetencesValues, setStep, setCompetences } =
    useContext(NewExperienceContext);
  const [addSkillCall, addSkillState] = useAddSkill();
  const [month, setMonth] = useState('Janvier');
  const [year, setYear] = useState('');

  const onAddSkill = () => {
    if (theme?.id && activities.length && competencesValues.length) {
      const dataToSend = {
        theme: theme?.id,
        activities: activities.map((act) => act.id),
        competences: competencesValues.map((cmp) => ({ competence: cmp.id, value: cmp.value })),
      };
      addSkillCall({ variables: dataToSend });
    }
  };
  useEffect(() => {
    if (addSkillState.data) {
      setStep(EParcoursStep.DATE);
    }
  }, []);
  return (
    <ParcoursLayout>
      <button onClick={() => history.push('/')} className="flex items-center mb-5 focus:ring-0 focus:outline-none">
        <ArrowLeftSvg />
        <span className="text-sm mt-1 ml-3 text-lena-blue-dark">Retour</span>
      </button>
      <div className="flex flex-col items-center justify-start space-y-8 container py-8 md:p-14 relative">
        <div>
          <div className="text-lena-blue-dark">
            Pour finir, à quelles dates s’est déroulée cette expérience de <strong> boulangerie </strong> ? (facultatif){' '}
          </div>
        </div>
      </div>
      <div className="space-y-8 container py-8 md:p-14 ">
        <DatePicker title="Date début" month={month} year={year} setMonth={setMonth} setYear={setYear} />
      </div>
    </ParcoursLayout>
  );
};

export default DateContainer;
