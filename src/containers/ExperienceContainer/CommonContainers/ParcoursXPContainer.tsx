import React, { useContext, useEffect, useState } from 'react';
import {
  EParcoursStep,
  LocalExperienceType,
  LocalParcoursActivity,
  LocalParcoursCompetence,
  LocalParcoursCompetenceValues,
  LocalParcoursTheme,
  NewExperienceContext,
} from 'contexts/NewExperienceContext';
import { useLocation } from 'react-router-dom';
import { useLazyThemes } from 'common/requests/themes';
import { ThemeDomain } from 'common/requests/types';
import { decodeUri } from 'common/utils/url';

import SelectionTheme from './SelectionTheme';
import SelectionThemePro from '../XPPro/ParcoursContainer/containers/SelectionTheme';
import DomainSelect from '../XPPro/ParcoursContainer/containers/DomainSelect';

import ChoixActivites from './ChoixActivites';
import AddActivityDone from './AddActivityDone';
import SelectionCompetence from './SelectionCompetence';
import DateContainer from './DateContainer';

import AddExperienceDone from './AddExperienceDone';

const ParcoursXPContainer = () => {
  const location = useLocation();
  const params = decodeUri(location.search);
  const { step: parcoursStep } = useContext(NewExperienceContext);
  const [step, setStep] = useState<EParcoursStep>(EParcoursStep.THEME);
  const [theme, setTheme] = useState<LocalParcoursTheme>();
  const [experienceType, setExperienceType] = useState<LocalExperienceType>('personal');
  const [activities, setActivities] = useState<LocalParcoursActivity[]>([]);
  const [competences, setCompetences] = useState<LocalParcoursCompetence[]>([]);
  const [competencesValues, setCompetencesValues] = useState<LocalParcoursCompetenceValues[]>([]);
  const [loadThemes, { data }] = useLazyThemes({ fetchPolicy: 'network-only' });

  const renderType = () => {
    let type = '';
    if (params.type) {
      switch (params.type) {
        case 'professional':
          type = 'professional';
          break;
        case 'personal':
          type = 'personal';
          break;
        case 'voluntary':
          type = 'voluntary';
          break;
        default:
          type = 'personal';
          break;
      }
    }
    return type;
  };

  useEffect(() => {
    if (params.type && params.type !== 'professional') {
      loadThemes({ variables: { domain: renderType() as ThemeDomain } });
    }
  }, [params.type]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [step]);

  const renderStep = () => {
    switch (step) {
      case EParcoursStep.THEME:
        return params.type === 'professional' ? <SelectionThemePro /> : <SelectionTheme data={data?.themes.data} />;
      case EParcoursStep.THEME_DONE:
        return <DomainSelect />;
      case EParcoursStep.ACTIVITIES:
        return <ChoixActivites />;
      case EParcoursStep.ACTIVITIES_DONE:
        return <AddActivityDone />;
      case EParcoursStep.COMPETENCES:
        return <SelectionCompetence />;
      case EParcoursStep.DATE:
        return <DateContainer />;
      case EParcoursStep.DONE:
        return <AddExperienceDone />;
      default:
        return <div>Une erreur est survenue.</div>;
    }
  };

  return (
    <NewExperienceContext.Provider
      value={{
        theme,
        setTheme,
        step,
        setStep,
        experienceType,
        activities,
        setActivities,
        competences,
        setCompetences,
        competencesValues,
        setCompetencesValues,
      }}
    >
      {renderStep()}
    </NewExperienceContext.Provider>
  );
};

export default ParcoursXPContainer;
