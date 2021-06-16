import gql from 'graphql-tag';
import { QueryHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery } from '../common/hooks/apollo';

export const analyticsProfileQuery = gql`
  query {
    myAnalyticsProfile {
      nombreConnexions
    }
  }
`;

export interface AnalyticsProfileResponse {
  myAnalyticsProfile: {
    nombreConnexions: number;
  };
}

export const useMyAnalyticsProfile = (options: QueryHookOptions<AnalyticsProfileResponse> = {}) =>
  useLocalLazyQuery<AnalyticsProfileResponse>(analyticsProfileQuery, options);
