import gql from 'graphql-tag';

import { MutationHookOptions, QueryHookOptions } from '@apollo/react-hooks';
import { useLocalMutation, useLocalQuery } from 'common/hooks/apollo';

import { User, Token } from './types';

export const registerMutation = gql`
  mutation Register(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $logo: String!
    $location: String!
    $institution: String
    $codeGroupe: String
    $coordinates: coordinateLocationInput
    $validateCampus: Boolean
  ) {
    register(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      institution: $institution
      codeGroupe: $codeGroupe
      location: $location
      logo: $logo
      coordinates: $coordinates
      validateCampus: $validateCampus
    ) {
      user {
        id
        email
        role
        profile {
          firstName
          lastName
          institution
        }
        codeGroupe
        location
        logo
        isCampus
        validateCampus
        coordinates {
          longitude
          lattitude
        }
        wc2023 {
          formation
          degree
          perimeter
          birthdate
        }
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
export interface RegisterArguments {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;
  logo: string;
  institution?: string;
  codeGroupe?: string;
}
export interface RegisterData {
  user: User;
  token: Token;
}

export const useRegister = (options: MutationHookOptions<{ register: RegisterData }, RegisterArguments> = {}) =>
  useLocalMutation(registerMutation, options);

export const registerAdvisorMutation = gql`
  mutation RegisterAdmin(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $institution: String
  ) {
    registerAdmin(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      institution: $institution
    ) {
      user {
        id
        email
        role
        profile {
          firstName
          lastName
          institution
        }
        isCampus
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
export interface RegisterAdvisorArguments {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  institution?: string;
}
export interface RegisterAdvisorData {
  user: User;
  token: Token;
}
export const useAdvisorRegister = (
  options: MutationHookOptions<{ registerAdmin: RegisterAdvisorData }, RegisterAdvisorArguments> = {},
) => useLocalMutation(registerAdvisorMutation, options);

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        logo
        location
        codeGroupe
        role
        isReferentiel
        profile {
          firstName
          lastName
          institution
        }
        isCampus
        validateCampus
        coordinates {
          longitude
          lattitude
        }
        wc2023 {
          degree
          formation
          perimeter
          birthdate
        }
        structure {
          name
        }
        tutorialStep
        isActive
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

export interface LoginArguments {
  email: string;
  password: string;
}
export interface LoginData {
  user: User;
  token: Token;
}

export const useLogin = (options: MutationHookOptions<{ login: LoginData }, LoginArguments> = {}) =>
  useLocalMutation(loginMutation, options);

export const loginAdminMutation = gql`
  mutation LoginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      user {
        id
        email
        logo
        location
        codeGroupe
        role
        isReferentiel
        profile {
          firstName
          lastName
          institution
        }
        tutorialStep
        isActive
        structure {
          name
        }
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
export const useLoginAdmin = (options: MutationHookOptions<{ loginAdmin: LoginData }, LoginArguments> = {}) =>
  useLocalMutation(loginAdminMutation, options);

export const forgotMutation = gql`
  mutation Forgot($email: String!) {
    forgot(email: $email)
  }
`;

export interface ForgotArguments {
  email: string;
}
export interface ForgotData {
  user: User;
}

export const useForgot = (options: MutationHookOptions<{ forgot: ForgotData }, ForgotArguments> = {}) =>
  useLocalMutation(forgotMutation, options);

export const refreshMutation = gql`
  mutation Refresh($email: String!, $refreshToken: String!) {
    refresh(email: $email, refreshToken: $refreshToken) {
      user {
        id
        email
        logo
        location
        role
        profile {
          firstName
          lastName
          institution
        }
        isCampus
        validateCampus
        coordinates {
          longitude
          lattitude
        }
        wc2023 {
          degree
          formation
          perimeter
          birthdate
        }
        tutorialStep
        isActive
        structure {
          name
        }
        isReferentiel
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

export interface RefreshArguments {
  email: string;
  refreshToken: string;
}

export const useRefresh = (options: MutationHookOptions<LoginData, RefreshArguments> = {}) =>
  useLocalMutation<LoginData, RefreshArguments>(refreshMutation, options);

export const AvatarQuery = gql`
  {
    avatars {
      data {
        id
        url
      }
    }
  }
`;
export interface AvatarsResponse {
  avatars: {
    data: [
      {
        id: string;
        url: string;
      },
    ];
  };
}
export const useAvatars = (options: QueryHookOptions<AvatarsResponse> = {}) =>
  useLocalQuery<AvatarsResponse>(AvatarQuery, options);

export const resetMutation = gql`
  mutation Reset($password: String!, $token: String!) {
    reset(password: $password, token: $token) {
      user {
        id
        email
        logo
        location
        role
        profile {
          firstName
          lastName
          institution
        }
        coordinates {
          longitude
          lattitude
        }
        isCampus
        validateCampus
        codeGroupe
        wc2023 {
          degree
          formation
          perimeter
          birthdate
        }
        structure {
          name
        }
        tutorialStep
        isActive
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

export interface ResetArguments {
  password: string;
  token: string;
}
export interface ResetData {
  user: User;
  token: Token;
}

export const useReset = (options: MutationHookOptions<{ reset: ResetData }, ResetArguments> = {}) =>
  useLocalMutation(resetMutation, options);
export const logoutMutation = gql`
  mutation logout {
    logout
  }
`;
export interface LogoutData {
  logout: string;
}
export const useLogout = (options: MutationHookOptions<{ logout: LogoutData }, ResetArguments> = {}) =>
  useLocalMutation(logoutMutation, options);
