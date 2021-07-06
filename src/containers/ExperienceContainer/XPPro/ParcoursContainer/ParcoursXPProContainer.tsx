import React, { FunctionComponent, useContext, useState } from 'react';
import { useThemes } from 'common/requests/themes';
import {
  EParcoursStep,
  LocalExperienceType,
  LocalParcoursActivity,
  LocalParcoursCompetence,
  LocalParcoursTheme,
  NewExperienceContext,
} from 'contexts/NewExperienceContext';
import AddActivityDone from 'containers/ExperienceContainer/CommonContainers/AddActivityDone';
import ChoixActivites from 'containers//ExperienceContainer/CommonContainers/ChoixActivites';
import SelectionCompetence from 'containers/ExperienceContainer/CommonContainers/SelectionCompetence';
import AddExperienceDone from 'containers//ExperienceContainer/CommonContainers/AddExperienceDone';
import SelectionTheme from './containers/SelectionTheme';
import DomainSelect from './containers/DomainSelect';

const ParcoursXPProContainer: FunctionComponent = () => {
  const { step: parcoursStep } = useContext(NewExperienceContext);
  const [step, setStep] = useState<EParcoursStep>(EParcoursStep.THEME);
  const [theme, setTheme] = useState<LocalParcoursTheme>();
  const [experienceType, setExperienceType] = useState<LocalExperienceType>('professional');
  const [activities, setActivities] = useState<LocalParcoursActivity[]>([]);
  const [competences, setCompetences] = useState<LocalParcoursCompetence[]>([]);
  const secteursData = useThemes();

  const renderStep = () => {
    switch (step) {
      case EParcoursStep.THEME:
        return <SelectionTheme />;
      case EParcoursStep.THEME_DONE:
        return <DomainSelect />;
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

export default ParcoursXPProContainer;
