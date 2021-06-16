import gql from 'graphql-tag';

import { MutationHookOptions, LazyQueryHookOptions } from '@apollo/react-hooks';
import { useLocalMutation, useLocalLazyQuery } from 'common/hooks/apollo';

import { Stat } from './types';

export const CreateStat = gql`
  mutation AddStat($userId: ID!, $nbrCard: [cardItemInput]!, $nbrSearch: [searchItemInput]!) {
    createStat(userId: $userId, nbrCard: $nbrCard, nbrSearch: $nbrSearch) {
      id
      nbrCard {
        jobId
      }
      nbrSearch {
        type
        jobId
      }
    }
  }
`;
interface AddStatParams {
  userId: string;
  nbrCard: { date: Date; jobId: string }[];
  nbrSearch: { date: Date; jobId: string; type: string }[];
}
export const useAddStat = (options?: MutationHookOptions<{ createStat: Stat }, AddStatParams>) =>
  useLocalMutation(CreateStat, options);

export const UpdateStat = gql`
  mutation UpdateStats($userId: ID!, $type: String, $jobId: ID!) {
    updateStat(userId: $userId, type: $type, jobId: $jobId) {
      id
      nbrCard {
        jobId
        date
      }
      nbrSearch {
        type
        jobId
        date
      }
    }
  }
`;
interface UpdateStatParams {
  type?: string;
  jobId: string;
  userId: string;
}
export const useUpdateStat = (options?: MutationHookOptions<{ updateStat: Stat }, UpdateStatParams>) =>
  useLocalMutation(UpdateStat, options);

export const getListJobsStatQuery = gql`
  {
    getListJobsStat {
      user {
        profile {
          firstName
          lastName
        }
        id
        logo
      }
      info {
        text
        date
        type
      }
    }
  }
`;
interface GetListJobsStatParams {
  advisorId: string;
}
interface GetListJobsStatResponse {
  getListJobsStat: {
    user: {
      id: string;
      profile: {
        firstName: string;
        lastName: string;
      };
      logo: string;
    };
    info: {
      text: string;
      date: Date;
      type: string;
    };
  }[];
}
export const useGetListJobsStat = (
  options: LazyQueryHookOptions<GetListJobsStatResponse, GetListJobsStatParams> = {},
) => useLocalLazyQuery<GetListJobsStatResponse, GetListJobsStatParams>(getListJobsStatQuery, options);

export const StatsParcours = gql`
  query statsParcours {
    statsParcours {
      experience
      interest {
        counts
        interests {
          nom
          category
        }
      }
      jobs {
        counts
        jobs {
          title
        }
      }
    }
  }
`;
interface ParcourStatResponse {
  statsParcours: {
    experience: number;
    interest: {
      counts: number;
      interests: {
        nom: string;
        category: string;
      }[];
    };
    jobs: {
      counts: number;
      jobs: {
        title: string;
      }[];
    };
  };
}
export const useParcoursStat = (options: LazyQueryHookOptions<ParcourStatResponse> = {}) =>
  useLocalLazyQuery<ParcourStatResponse>(StatsParcours, options);
