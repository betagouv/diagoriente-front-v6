import { useContext, useEffect } from 'react';
import { MutationHookOptions, MutationTuple } from '@apollo/react-hooks';
import localforage from 'localforage';

import { setAuthorizationBearer } from 'common/requests/client';
import { useGetUserParcour } from 'common/requests/parcours';
import { User, Token } from 'common/requests/types';
import { graphQLResult } from 'common/utils/graphql';

import ParcourContext from 'common/contexts/ParcourContext';
import UserContext from 'common/contexts/UserContext';
import { usePosthog } from './usePosthog';

function useAuth<Arguments, Result extends { [key: string]: { user: User; token: Token } }>(
  fn: (options?: MutationHookOptions<Result, Arguments>) => MutationTuple<Result, Arguments>,
  stayConnected: boolean = true,
): MutationTuple<Result, Arguments> {
  const { setParcours } = useContext(ParcourContext);
  const { setUser } = useContext(UserContext);
  const [call, state] = fn();
  const [parcourCall, parcourState] = useGetUserParcour();
  const { enableAnalytics, posthog } = usePosthog();

  function persistUser(data: { user: User; token: Token }) {
    const result = { ...data };
    if (!stayConnected) {
      // @ts-ignore
      delete result.token.refreshToken;
    }
    localforage.setItem('auth', JSON.stringify(result));
  }

  useEffect(() => {
    if (state.data) {
      const result = graphQLResult(state.data);
      setAuthorizationBearer(result.token.accessToken);
      persistUser(result);
      if (enableAnalytics) {
        posthog!.identify(result.user.id, {
          role: result.user.role,
          codeGroupe: result.user.codeGroupe,
          institution: result.user.profile.institution,
        });
      }
      if (result.user.role === 'user') parcourCall();
      else setUser(result.user);
    }
    // eslint-disable-next-line
  }, [state.data]);

  useEffect(() => {
    if (parcourState.data && state.data) {
      const result = graphQLResult(state.data);
      setParcours(parcourState.data.userParcour);
      setUser(result.user);
    }
    // eslint-disable-next-line
  }, [parcourState.data]);

  return [call, { ...state, error: state.error || parcourState.error }];
}

export default useAuth;
