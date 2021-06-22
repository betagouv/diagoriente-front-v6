import { createContext } from 'react';

export enum EParcoursStep {
  THEME,
  ACTIVITIES,
  ACTIVITIES_DONE,
  COMPETENCES,
  DONE,

  INITIAL = EParcoursStep.THEME,
}

export type LocalExperienceType = 'personal' | 'professional' | 'engagement';
export type LocalParcoursActivity = { id: string; name: string; extra: boolean };
export type LocalParcoursCompetence = { id: string; name: string; extra: boolean };

type ParcoursContextData = {
  step: EParcoursStep;
  setStep: (step: EParcoursStep) => void;
  experienceType: LocalExperienceType;
  activities: LocalParcoursActivity[];
  setActivities: (activities: LocalParcoursActivity[]) => void;
  competences: LocalParcoursCompetence[];
  setCompetences: (competences: LocalParcoursCompetence[]) => void;
};

export const NewExperienceContext = createContext<ParcoursContextData>({
  step: EParcoursStep.THEME,
  setStep: () => {},
  experienceType: 'personal',
  activities: [],
  setActivities: () => {},
  competences: [],
  setCompetences: () => {},
});
