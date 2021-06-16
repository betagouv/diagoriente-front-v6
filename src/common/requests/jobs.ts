import gql from 'graphql-tag';

import { LazyQueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery, useLocalMutation } from 'common/hooks/apollo';
import { Jobs } from 'common/requests/types';

export const jobsQuery = gql`
  query myJobs(
    $environments: [String]
    $niveau: [String]
    $secteur: [String]
    $accessibility: [String]
    $search: String
  ) {
    myJobs(
      environments: $environments
      niveau: $niveau
      secteur: $secteur
      accessibility: $accessibility
      search: $search
    ) {
      id
      title
      description
      search
      link
      salaire
      accessibility
      rome_codes
      secteur {
        id
        title
      }
      favorite {
        id
        interested
      }
    }
  }
`;
export const jobsTopQuery = gql`
  query myJobs(
    $environments: [String]
    $niveau: [String]
    $secteur: [String]
    $accessibility: [String]
    $search: String
    $parcourId: String
  ) {
    myJobs(
      environments: $environments
      niveau: $niveau
      secteur: $secteur
      accessibility: $accessibility
      search: $search
      parcourId: $parcourId
    ) {
      id
      title
      description
      search
      link
      salaire
      accessibility
      rome_codes
      secteur {
        id
        title
      }
      favorite {
        id
        interested
      }
    }
  }
`;
export interface JobsResponse {
  myJobs: Jobs[];
}
export const useJobs = (options: LazyQueryHookOptions<JobsResponse> = {}) =>
  useLocalLazyQuery<JobsResponse>(jobsQuery, options);

export const jobQuery = gql`
  query Job($id: ID!) {
    job(id: $id) {
      id
      title
      description
      accessibility
      competences {
        _id {
          id
          title
        }
        weight
      }
      interests {
        _id {
          nom
          id
        }
      }
      favorite {
        id
        interested
      }
      secteur {
        id
        title
      }
      questionJobs {
        id
        label
      }
      salaire
      rome_codes
      niveau {
        id
      }
      formations {
        id
      }
    }
  }
`;

export interface JobResponse {
  job: {
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
    interests: { _id: { nom: string; id: string; resources: any }; __typename: string }[];
    competences: { _id: { id: string; title: string }; weight: number }[];
    formations: string[];
    environments: string[];
    favorite: any;
    questionJobs: any;
  };
}
export const useJob = (options: LazyQueryHookOptions<JobResponse> = {}) =>
  useLocalLazyQuery<JobResponse>(jobQuery, options);

export const ReponseJob = gql`
  mutation createResponseJob($response: Boolean!, $questionJobId: ID!, $jobId: ID!) {
    createResponseJob(response: $response, questionJobId: $questionJobId, jobId: $jobId) {
      id
      response
      parcourId
      jobId
      questionJobId
      questionJobLabel
      description
    }
  }
`;
export interface ResponseJobArgument {
  id: string;
  response: string;
  parcourId: string;
  jobId: string;
  questionJobId: string;
  questionJobLabel: string;
  description: string;
}
export const useResponseJob = (options: MutationHookOptions<ResponseJobArgument> = {}) =>
  useLocalMutation<ResponseJobArgument>(ReponseJob, options);

export const getResponseJob = gql`
  query ResponseJobs($jobId: ID) {
    responseJobs(job: $jobId) {
      data {
        id
        response
        questionJobId
      }
    }
  }
`;
interface ReponseType {
  id: string;
  response: boolean;
  questionJobId: string;
}
export interface ResponseJobType {
  responseJobs: {
    data: ReponseType[];
  };
}
export const useGetResponseJob = (options: LazyQueryHookOptions<ResponseJobType> = {}) =>
  useLocalLazyQuery<ResponseJobType>(getResponseJob, options);

export const updateResponseJob = gql`
  mutation UpdateResponseJob($id: ID!, $response: Boolean!) {
    updateResponseJob(id: $id, response: $response) {
      id
      response
      parcourId
      jobId
      questionJobId
      questionJobLabel
      description
    }
  }
`;

export const useUpdateResponseJob = (options: MutationHookOptions<ResponseJobArgument> = {}) =>
  useLocalMutation<ResponseJobArgument>(updateResponseJob, options);

export const jobsListQuery = gql`
  {
    jobs {
      data {
        title
        id
        description
        rome_codes
      }
    }
  }
`;
export interface AllJobsResponse {
  jobs: { data: Jobs[] };
}
export const useJobsList = (options: LazyQueryHookOptions<AllJobsResponse> = {}) =>
  useLocalLazyQuery<AllJobsResponse>(jobsListQuery, options);

export const InfoJob = gql`
  query referentiel($code: String) {
    referentiel(code: $code) {
      resultOffre {
        success
        result {
          records {
            NB_APPLICATION_END_MONTH
            NB_OFFER_END_MONTH
            NB_APPLICATION_LAST_WEEK
            NB_OFFER_LAST_WEEK
          }
        }
      }
    }
  }
`;
export interface ResponseInfoJobType {
  referentiel: {
    resultOffre: {
      success: boolean;
      result: {
        records: {
          NB_APPLICATION_END_MONTH: string;
          NB_OFFER_END_MONTH: string;
          NB_APPLICATION_LAST_WEEK: string;
          NB_OFFER_LAST_WEEK: string;
        }[];
      };
    };
  };
}
export const useInfoJob = (options: LazyQueryHookOptions<ResponseInfoJobType> = {}) =>
  useLocalLazyQuery<ResponseInfoJobType>(InfoJob, options);
