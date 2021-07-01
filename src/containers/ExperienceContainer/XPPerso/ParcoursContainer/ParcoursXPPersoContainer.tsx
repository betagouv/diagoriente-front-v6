import React, { useContext, useState } from 'react';
import {
  EParcoursStep,
  LocalExperienceType,
  LocalParcoursActivity,
  LocalParcoursCompetence,
  LocalParcoursTheme,
  NewExperienceContext,
} from 'contexts/NewExperienceContext';
import SelectionTheme from './containers/SelectionTheme';

const ParcoursXPPersoContainer = () => {
  const { step: parcoursStep } = useContext(NewExperienceContext);
  const [step, setStep] = useState<EParcoursStep>(EParcoursStep.THEME);
  const [theme, setTheme] = useState<LocalParcoursTheme>();
  const [experienceType, setExperienceType] = useState<LocalExperienceType>('personal');
  const [activities, setActivities] = useState<LocalParcoursActivity[]>([]);
  const [competences, setCompetences] = useState<LocalParcoursCompetence[]>([]);

  const renderStep = () => {
    switch (step) {
      case EParcoursStep.THEME:
        return <SelectionTheme />;
      default:
        return <div>Une erreur est survenue.</div>;
    }
  };
  return (
    <NewExperienceContext.Provider
      value={{ theme, setTheme, step, setStep, experienceType, activities, setActivities, competences, setCompetences }}
    >
      {renderStep()}
    </NewExperienceContext.Provider>
  );
};

export default ParcoursXPPersoContainer;
