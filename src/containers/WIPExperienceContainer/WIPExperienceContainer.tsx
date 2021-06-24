import React, { FunctionComponent, useContext, useState } from 'react';
import { useThemes } from 'common/requests/themes';
import WipSelectionTheme from './containers/WIPSelectionTheme';
import {
  EParcoursStep,
  LocalExperienceType,
  LocalParcoursActivity,
  LocalParcoursCompetence,
  LocalParcoursTheme,
  NewExperienceContext,
} from '../../contexts/NewExperienceContext';
import WipAddActivityDone from './containers/WIPAddActivityDone';
import WipChoixActivites from './containers/WIPChoixActivites';
import WipSelectionCompetence from './containers/WIPSelectionCompetence';
import WipAddExperienceDone from './containers/WIPAddExperienceDone';
import WipDomainSelect from './containers/WIPDomainSelect';

const WipExperienceContainer: FunctionComponent = () => {
  const { step: parcoursStep } = useContext(NewExperienceContext);
  const [step, setStep] = useState<EParcoursStep>(EParcoursStep.THEME);
  const [theme, setTheme] = useState<LocalParcoursTheme>();
  const [experienceType, setExperienceType] = useState<LocalExperienceType>('personal');
  const [activities, setActivities] = useState<LocalParcoursActivity[]>([]);
  const [competences, setCompetences] = useState<LocalParcoursCompetence[]>([]);
  const secteursData = useThemes();

  const renderStep = () => {
    switch (step) {
      case EParcoursStep.THEME:
        return <WipSelectionTheme />;
      case EParcoursStep.THEME_DONE:
        return <WipDomainSelect />;
      case EParcoursStep.ACTIVITIES:
        return <WipChoixActivites />;
      case EParcoursStep.ACTIVITIES_DONE:
        return <WipAddActivityDone />;
      case EParcoursStep.COMPETENCES:
        return <WipSelectionCompetence />;
      case EParcoursStep.DONE:
        return <WipAddExperienceDone />;
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

export default WipExperienceContainer;
