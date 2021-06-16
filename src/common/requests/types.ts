export type UserRole = 'user' | 'admin' | 'advisor' | 'super-advisor';
export interface WC2023 {
  birthdate?: string;
  degree?: string;
  formation?: string;
  perimeter?: number;
}
export interface User {
  id: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    institution: string;
  };
  played: boolean;
  isActive: boolean;
  isReferentiel?: boolean;
  logo: string;
  location: string;
  codeGroupe: string;
  role: UserRole;
  wc2023: WC2023;
  isCampus: boolean;
  validateCampus: boolean;
  nbrGroupes: number;
  lastLogin: Date;
  nbrUserGroup: { code: string; count: number }[];
  coordinates: {
    longitude: number;
    lattitude: number;
  };
  structure?: IStructure;
  tutorialStep: number;
  createdAt: string;
}

export interface Question {
  id: string;
  title: string;
  parent: Question | null;
}

export interface Option {
  id: string;
  title: string;
  parent: { path: Option[] }[];
  question: Question;
  verified: boolean;
  user: string;
}

export interface Token {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface Context {
  id: string;
  title: string;
  description?: string;
  icon?: string;
}
export interface Interests {
  id: string;
  nom: string;
  rank: string;
}
export interface Families {
  id: string;
  nom: string;
  category: string;
  resources: string[];
}

export interface Theme {
  id: string;
  title: string;
  type: string;
  resources?: { icon: string; backgroundColor: string };
  description: string;
  verified: boolean;
  groups?: Group[];
  levels?: number[];
  reference?: Reference;
  activities: {
    id: string;
    title: string;
    description: string;
    options: {
      value: string;
    }[];
  }[];
  tooltips: {
    competenceId: string;
    tooltip: string;
  }[];
  parentId?: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: string;
  verified: boolean;
  interests: Interests[];
  options: { value: string; verified: boolean }[];
}

export interface Competence {
  id: string;
  title: string;
  rank: number;
  niveau: {
    title: string;
    sub_title: string;
  }[];
  type?: string;
}
export interface CompetenceValues {
  id: string;
  value: number;
}
export interface Selection {
  id: string;
  title: string;
  icon: string;
  background: string;
}
export interface Location {
  label: string;
}

export interface SkillType {
  id: string;
  createdAt: string;
  theme: {
    title: string;
    type: string;
    id: string;
    resources?: { icon: string; backgroundColor: string };
    parentId?: string;
    description: string;
    reference: {
      id: string;
    };
    legacy: boolean;
  };
  activities: { id: string; title: string; description: string; options: { value: string }[] }[];
  competences: { _id: Competence; value: number }[];
  startDate?: string;
  endDate?: string;
  extraActivity?: string;
  comment: {
    id: string;
    lastName: string;
    firstName: string;
    commentText: string;
    status: 'pending' | 'accepted' | 'refused';
    email: string;
    institution: string;
    location: string;
  }[];
  engagement?: {
    id: string;
    startDate?: string;
    endDate?: string;
    activity: string;
    organization: string;
    context: {
      id: string;
      title: string;
      description: string;
      icon: string;
    };
    options: {
      option: {
        id: string;
        title: string;
      }[];
    }[];
  };
}

export interface AdminParcourItem {
  id: string;
  completed: boolean;
  userId: {
    id: string;
    profile: {
      firstName: string;
      lastName: string;
    };
    email: string;
    logo: string;
    nbrLogin: {
      date: string;
    }[];
    createdAt: string;
  };
  advisorId: {
    email: string;
  };
  createdAt: string;
}

export interface UserParcour {
  id: string;
  played: boolean;
  playedEng: boolean;
  completed: boolean;
  accessibility: { id: string };
  families: { id: string; nom: string; category: string; resources: string[] }[];
  nbrVisualisation: { dateVisualisation: Date; userId: string }[];
  skills: {
    id: string;
    theme: {
      title: string;
      type: string;
      id: string;
      resources?: { icon: string; backgroundColor: string };
      parentId?: string;
    };
  }[];

  globalCompetences: {
    id: string;
    title: string;
    value: number;
    count: number;
    type: string;
    niveau: { title: string; sub_title: string };
  }[];
}

export interface Reference {
  id: string;
  title: string;
  static?: boolean;
  competences: {
    id: string;
    title: string;
    type: string;
    niveau: {
      title: string;
      sub_title: string;
    }[];
  }[];
}

export interface SelectedUserParcour {
  id: string;
  families: { id: string; nom: string; category: string; resources: string[] }[];
  skills: Pick<SkillType, 'id' | 'theme' | 'activities' | 'createdAt' | 'engagement' | 'comment' | 'competences'>[];
  globalCompetences: {
    id: string;
    title: string;
    value: number;
    count: number;
    type: string;
    niveau: { title: string; sub_title: string };
  }[];
  userId: {
    id: string;
    profile: {
      firstName: string;
      lastName: string;
    };
    email: string;
    logo: string;
    createdAt: string;
  };
  advisorId: {
    profile: {
      firstName: string;
      lastName: string;
    };
  };
}

export interface Skill {
  id: string;
  parcourId: string;
  type: string;

  theme: {
    id: string;
    title: string;
    type: string;
    verified: string;
    resources?: { icon: string; color: string; backgroundColor: string };
    tooltips: { competenceId: string; tooltip: string }[];
  };
  activities: {
    id: string;
    title: string;
    type: string;
    description: string;
    interests: string[];
    verified: boolean;
  }[];
  competences: { _id: Competence; value: number }[];
  comment: { id: string; firstName: string; lastName: string; email: string; text: string; status: string }[];
}

export interface PublicSkill {
  id: string;
  theme: {
    id: string;
    title: string;
  };
  activities: {
    id: string;
    title: string;
  }[];
  competences: { _id: Competence; value: number }[];
  comment: { id: string; firstName: string; lastName: string; email: string; text: string; status: string };
  user: { id: string; firstName: string; lastName: string; isCampus: boolean };
}

export interface Jobs {
  id: string;
  title: string;
  description: string;
  search: string;
  link: string;
  salaire: string;
  accessibility: string;
  rome_codes: string;
  secteur: string[];
  niveau: string[];
  interests: { _id: { nom: string; id: string }; __typename: string }[];
  competences: { _id: { id: string; title: string }; weight: number }[];
  formations: string[];
  environments: string[];
  questionJobs: { id: string; label: string }[];
  favorite?: {
    id: string;
    interested: boolean;
  };
}
export interface Favoris {
  id: string;
  user: string;
  parcour: string;
  job: string;
  interested: boolean;
}
export interface Company {
  address: string;
  alternance: string;
  boosted: boolean;
  city: string;
  contact_mode: string;
  distance: number;
  headcount_text: string;
  lat: number;
  lon: number;
  matched_rome_code: string;
  matched_rome_label: string;
  matched_rome_slug: string;
  naf: string;
  naf_text: string;
  name: string;
  pmsmp: string;
  siret: string;
  social_network: string;
  stars: number;
  url: string;
  website: string;
}
export interface Institution {
  id: string;
  label: string;
  nom: string;
  longitude: number;
  latitude: number;
}
export interface Addresse {
  type: string;
  query: string[];
  attribution: string;
  features: {
    text: string;
    place_name: string;
    center: number[];
    geometry: {
      coordinates: number[];
      type: string;
    };
  }[];
}
export interface Formation {
  title: string;
  longTitle: string;
  contact: { email: string };
  ideaType: string;
  place: {
    fullAddress: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  diplomaLevel: string;
  company: {
    name: string;
    headquarter: {
      place: {
        address: string;
        city: string;
      };
    };
  };
}

export interface StructureWC2023 {
  id: string;
  club_code: string;
  name: string;
  city: string;
  licensed_text: string;
  licensed_count: number;
  geolocation: {
    lat: number;
    lng: number;
  };
  expectations: [
    {
      id: Competence;
      name: string;
    },
  ];
}
export interface Stat {
  userId: string;
  nbrCard: { date: Date; jobId: string }[];
  nbrSearch: { date: Date; jobId: string; type: string }[];
}
export interface IGroup {
  id: string;
  users: string[];

  _id: string;
  title: string;
  code: string;
  advisorId: string;
}
export interface DataResponse {
  user: User;
  info: {
    text: string;
    date: string;
  };
}

export interface Group {
  id: string;
  title: string;
  code: string;
  users: { id: string }[];
  invitations: { id: string }[];
  createdAt: string;
}
export interface IStructure {
  id: string;
  name: string;
}
