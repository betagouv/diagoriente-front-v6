import React, { useContext, useEffect, useState } from 'react';
import {
  EParcoursStep,
  LocalExperienceType,
  LocalParcoursActivity,
  LocalParcoursCompetence,
  LocalParcoursTheme,
  NewExperienceContext,
} from 'contexts/NewExperienceContext';
import SelectionTheme from './containers/SelectionTheme';
import ChoixActivites from './containers/ChoixActivites';
import AddActivityDone from './containers/AddActivityDone';
import SelectionCompetence from './containers/SelectionCompetence';
import AddExperienceDone from './containers/AddExperienceDone';

const ParcoursXPPersoContainer = () => {
  const { step: parcoursStep } = useContext(NewExperienceContext);
  const [step, setStep] = useState<EParcoursStep>(EParcoursStep.THEME);
  const [theme, setTheme] = useState<LocalParcoursTheme>();
  const [experienceType, setExperienceType] = useState<LocalExperienceType>('personal');
  const [activities, setActivities] = useState<LocalParcoursActivity[]>([]);
  const [competences, setCompetences] = useState<LocalParcoursCompetence[]>([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [step]);

  const renderStep = () => {
    switch (step) {
      case EParcoursStep.THEME:
        return <SelectionTheme />;
      case EParcoursStep.ACTIVITIES:
        return <ChoixActivites />;
      case EParcoursStep.ACTIVITIES_DONE:
        return <AddActivityDone />;
      case EParcoursStep.COMPETENCES:
        return <SelectionCompetence />;
      case EParcoursStep.DONE:
        return <AddExperienceDone />;
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
