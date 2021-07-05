import { createContext } from 'react';
import { Activity, Theme } from 'common/requests/types';

export enum EParcoursStep {
  THEME,
  THEME_DONE,
  ACTIVITIES,
  ACTIVITIES_DONE,
  COMPETENCES,
  DONE,
}

// TODO: Maybe migrate this to Redux or use Apollo cache,
//  so we don't store database data in states
export type LocalExperienceType = 'personal' | 'professional' | 'engagement';
export type LocalParcoursTheme = Theme;
export type LocalParcoursActivity = Activity;
export type LocalParcoursCompetence = { id: string; name: string };

type ParcoursContextData = {
  step: EParcoursStep;
  setStep: (step: EParcoursStep) => void;
  experienceType: LocalExperienceType;
  activities: LocalParcoursActivity[];
  setActivities: (activities: LocalParcoursActivity[]) => void;
  competences: LocalParcoursCompetence[];
  setCompetences: (competences: LocalParcoursCompetence[]) => void;
  theme: LocalParcoursTheme | undefined;
  setTheme: (theme: LocalParcoursTheme) => void;
};

export const NewExperienceContext = createContext<ParcoursContextData>({
  step: EParcoursStep.THEME,
  setStep: () => {},
  experienceType: 'personal',
  activities: [],
  setActivities: () => {},
  competences: [],
  setCompetences: () => {},
  theme: undefined,
  setTheme: () => {},
});
