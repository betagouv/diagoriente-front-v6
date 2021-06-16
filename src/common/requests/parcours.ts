import gql from 'graphql-tag';

import { LazyQueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery, useLocalMutation, useLocalQuery } from 'common/hooks/apollo';

import {
  UserParcour, AdminParcourItem, SelectedUserParcour, User,
} from './types';

export const getUserParcourQuery = gql`
  query GetUserParcours($idUser: String) {
    userParcour(idUser: $idUser) {
      id
      played
      playedEng
      completed
      accessibility {
        id
      }
      families {
        id
        nom
        category
        resources
      }
      skills {
        id
        theme {
          title
          id
          type
          resources {
            icon
            backgroundColor
          }
          parentId
        }
      }

      globalCompetences {
        id
        count
        value
        title
        type
        niveau {
          title
          sub_title
        }
      }
    }
  }
`;

export const parcourResult = getUserParcourQuery.loc?.source.body
  .split('{')
  .slice(2)
  .join('{')
  .split('}')
  .slice(0, -2)
  .join('}');

export interface UserParcourData {
  userParcour: UserParcour;
}

export const useGetUserParcour = (options: LazyQueryHookOptions<UserParcourData> = {}) =>
  useLocalLazyQuery(getUserParcourQuery, options);

export const updateParcours = gql`
  mutation UpdateParcour(
    $families: [ID]
    $skillsAlgo: [ID]
    $played: Boolean
    $completed: Boolean
    $playedEng: Boolean
    $accessibility: ID
  ) {
    updateParcour(
      families: $families
      skillsAlgo: $skillsAlgo
      played: $played
      completed: $completed
      playedEng: $playedEng
      accessibility: $accessibility
    ) {
      ${parcourResult}
    }
  }
`;
export interface UpdateParcourArgument {
  families?: string[];
  skillsAlgo?: string[];
  played?: boolean;
  completed?: boolean;
  playedEng?: boolean;
  accessibility?: string;
}
export const useUpdateParcour = (
  options: MutationHookOptions<{ updateParcour: UserParcour }, UpdateParcourArgument> = {},
) => useLocalMutation(updateParcours, options);

export const GetListParcours = gql`
  query parcours($advisorId: String) {
    parcours(advisorId: $advisorId) {
      data {
        id
        played
        playedEng
        completed
        accessibility {
          id
        }
        families {
          id
          nom
          category
          resources
        }
        skills {
          id
          theme {
            title
            id
            type
            resources {
              icon
              backgroundColor
            }
            parentId
          }
        }

        globalCompetences {
          id
          count
          value
          title
          type
          niveau {
            title
            sub_title
          }
        }
        createdAt
      }
    }
  }
`;
export interface GetParcousArguments {
  advisorId?: string;
}
export interface GetParcousResponse {
  page: number;
  perPAGE: number;
  data: UserParcour[];
}
export const useGetParcour = (options: LazyQueryHookOptions<GetParcousResponse, GetParcousArguments> = {}) =>
  useLocalLazyQuery<GetParcousResponse, GetParcousArguments>(GetListParcours, options);

export const listParcours = gql`
  query Parcours($page: Int, $perPage: Int, $search: String, $completed: Boolean, $code: ID) {
    parcours(page: $page, perPage: $perPage, search: $search, completed: $completed, code: $code) {
      page
      count
      perPage
      totalPages
      data {
        id
        completed
        createdAt
        userId {
          id
          profile {
            firstName
            lastName
          }
          email
          logo
          nbrLogin {
            date
          }
          createdAt
        }
        advisorId {
          email
        }
        createdAt
      }
    }
  }
`;

export interface ListParcousArguments {
  page?: number;
  perPage?: number;
  search?: string;
  completed?: boolean;
  code?: string;
}
export interface ListParcousResponse {
  parcours: {
    page: number;
    perPage: number;
    count: number;
    totalPages: number;
    data: AdminParcourItem[];
  };
}
export interface ListParcousRes {
  data: AdminParcourItem[];
}

export const useListParcour = (options: LazyQueryHookOptions<ListParcousResponse, ListParcousArguments> = {}) =>
  useLocalQuery<ListParcousResponse, ListParcousArguments>(listParcours, options);
export const useListLazyParcour = (options: LazyQueryHookOptions<ListParcousResponse, ListParcousArguments> = {}) =>
  useLocalLazyQuery<ListParcousResponse, ListParcousArguments>(listParcours, options);

export const getSelectedUserParcour = gql`
  query GetUserParcours($idUser: String) {
    userParcour(idUser: $idUser) {
      id
      families {
        id
        nom
        category
        resources
      }
      skills {
        id
        createdAt
        theme {
          title
          id
          type
          resources {
            icon
            backgroundColor
          }
          parentId
          reference {
            id
          }
          legacy
        }
        competences {
          _id {
            title
            rank
            id
            niveau {
              title
              sub_title
            }
          }
          value
        }
        activities {
          title
          description
          id
        }
        engagement {
          options {
            option {
              id
              title
            }
          }
        }
        comment {
          id
          lastName
          firstName
          commentText
          status
          email
          location
        }
      }
      userId {
        id
        profile {
          firstName
          lastName
        }
        email
        logo
        createdAt
      }
      advisorId {
        profile {
          firstName
          lastName
        }
      }

      globalCompetences {
        id
        count
        value
        title
        type
        niveau {
          title
          sub_title
        }
      }
    }
  }
`;

export interface SelectedUserParcourData {
  userParcour: SelectedUserParcour;
}

export const useGetSelectedUserParcour = (options: LazyQueryHookOptions<SelectedUserParcourData> = {}) =>
  useLocalLazyQuery(getSelectedUserParcour, options);

export interface SelectedUserData {
  userData: ListParcousResponse;
}

export const useGetUserData = (options: LazyQueryHookOptions<SelectedUserData> = {}) =>
  useLocalLazyQuery(listParcours, options);

export const AdvisorRecentUserSkills = gql`
  {
    advisorRecentUserSkills {
      info {
        theme {
          title
          type
        }
        createdAt
      }
      user {
        profile {
          firstName
          lastName
        }
        id
        logo
      }
    }
  }
`;

export interface AdvisorRecentUserSkillsData {
  advisorRecentUserSkills: {
    info: { theme: { title: string; type: string }; createdAt: string };
    user: User;
  }[];
}

export const useAdvisorRecentUserSkills = (options = {}) => useLocalLazyQuery(AdvisorRecentUserSkills, options);
