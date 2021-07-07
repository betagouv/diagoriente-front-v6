import { createContext } from 'react';
import { Activity, Theme, Competence } from 'common/requests/types';

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
export type LocalParcoursCompetence = Competence;
export type LocalParcoursCompetenceValues = { id: string; value: number };

type ParcoursContextData = {
  step: EParcoursStep;
  setStep: (step: EParcoursStep) => void;
  experienceType: LocalExperienceType;
  activities: LocalParcoursActivity[];
  setActivities: (activities: LocalParcoursActivity[]) => void;
  competences: LocalParcoursCompetence[];
  setCompetences: (competences: LocalParcoursCompetence[]) => void;
  competencesValues: LocalParcoursCompetenceValues[];
  setCompetencesValues: (competencesValues: LocalParcoursCompetenceValues[]) => void;
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
  competencesValues: [],
  setCompetencesValues: () => {},
  theme: undefined,
  setTheme: () => {},
});
