import gql from 'graphql-tag';

import { MutationHookOptions, QueryHookOptions } from '@apollo/react-hooks';
import { useLocalMutation, useLocalQuery, useLocalLazyQuery } from 'common/hooks/apollo';
import { User, Token } from './types';

export const GetAllMembers = gql`
  query GetStructureMembers($search: String, $completed: String) {
    getStructureMembers(search: $search, completed: $completed) {
      data {
        id
        email
        role
        profile {
          firstName
          lastName
        }
        nbrLogin {
          date
        }
        tutorialStep
        followers
      }
    }
  }
`;
export interface GetAllMembersResponse {
  getStructureMembers: {
    data: User[];
  };
}
export const useGetAllMembers = (options: QueryHookOptions = {}) => useLocalQuery(GetAllMembers, options);
export const useGetAllLazyMembers = (options: QueryHookOptions = {}) => useLocalLazyQuery(GetAllMembers, options);

export const RegisterSuperAdminMutation = gql`
  mutation registerSuperAdmin(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $structure: String!
  ) {
    registerSuperAdmin(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      structure: $structure
    ) {
      user {
        id
        email
        role
        profile {
          firstName
          lastName
        }
        structure
        isActive
        tutorialStep
      }
      token {
        tokenType
        accessToken
        refreshToken
        expiresIn
      }
    }
  }
`;
export interface RegisterSuperAdvisorArguments {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  structure: string;
}
export interface RegisterSuperAdvisorData {
  user: User;
  token: Token;
}
export const useSuperAdvisorRegister = (
  options: MutationHookOptions<{ registerAdmin: RegisterSuperAdvisorData }, RegisterSuperAdvisorArguments> = {},
) => useLocalMutation(RegisterSuperAdminMutation, options);

export const inviteSuperAdvisor = gql`
  mutation inviteAdvisor($email: String!, $firstName: String!, $lastName: String!) {
    inviteAdvisor(email: $email, firstName: $firstName, lastName: $lastName)
  }
`;
export interface InviteSuperAdvisorParams {
  email: string;
  firstName: string;
  lastName: string;
}
export const useInviteAdvisor = (options: MutationHookOptions = {}) => useLocalMutation(inviteSuperAdvisor, options);

export const acceptStructureMutation = gql`
  mutation acceptStructure($password: String!, $token: String!) {
    acceptStructure(password: $password, token: $token) {
      user {
        email
        profile {
          firstName
          lastName
        }
        nbrLogin {
          date
        }
        tutorialStep
      }
    }
  }
`;
export interface AcceptStructureParams {
  password: string;
  token: string;
}
export const useAcceptStructure = (options: MutationHookOptions = {}) =>
  useLocalMutation(acceptStructureMutation, options);

export const removeAdvisorStructure = gql`
  mutation RemoveFromStructure($id: ID!) {
    removeFromStructure(id: $id)
  }
`;
export const useRemoveAdvisorStructure = (
  options?: MutationHookOptions<{ removeFromStructure: string }, { id: string }>,
) => useLocalMutation(removeAdvisorStructure, options);
