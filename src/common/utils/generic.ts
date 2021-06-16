export const echelonValue = [1, 2, 3, 4];
export const echelon = ['Débutant.e', "Plutôt à l'aise", "A l'aise", 'Expert.e'];
export const THEME_TYPES_OPTIONS = [
  { value: 'personal', label: 'Personnel' },
  { value: 'professional', label: 'Professionnel' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'secteur', label: 'Secteur' },
  { value: 'sport', label: 'Sport' },
];

export const ACTIVITY_TYPES_OPTIONS = [
  { value: 'personal', label: 'Personnel' },
  { value: 'professional', label: 'Professionnel' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'sport', label: 'Sport' },
];

export const SKILL_CONTAINER_PADDING = '30px 70px 80px 70px';

export function formatType(type: string) {
  const typeObject = THEME_TYPES_OPTIONS.find((typeOption) => type === typeOption.value);
  return typeObject ? typeObject.label : '.....';
}
