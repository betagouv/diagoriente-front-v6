import localforage from 'localforage';
import moment from 'moment';
import { FetchResult } from '@apollo/client';
import { refreshMutation, RefreshArguments, LoginData } from 'common/requests/auth';
import { client, setAuthorizationBearer } from 'common/requests/client';
import { User, Token, UserParcour } from 'common/requests/types';
import { getUserParcourQuery } from 'common/requests/parcours';

export default async function startup(): Promise<{ user: User; parcours: UserParcour | null } | null> {
  try {
    const authString = await localforage.getItem<string | null>('auth');
    let nextData:
    | FetchResult<
    {
      refresh: LoginData;
    },
    Record<string, any>,
    Record<string, any>
    >
    | undefined;
    let accessToken = null;
    if (authString) {
      const { user, token }: { user: User; token: Token } = JSON.parse(authString);

      if (token.refreshToken) {
        nextData = await client.mutate<{ refresh: LoginData }, RefreshArguments>({
          mutation: refreshMutation,
          variables: { email: user.email, refreshToken: token.refreshToken },
        });
        if (nextData.data) {
          accessToken = nextData.data.refresh.token.accessToken;
          localforage.setItem('auth', JSON.stringify(nextData.data.refresh));
        }
      } else if (moment(token.expiresIn, 'x').diff(moment(), 'minutes') > 0) {
        accessToken = token.accessToken;
      }

      if (accessToken) {
        setAuthorizationBearer(accessToken);
        if (user.role === 'user') {
          const parcours = await client.query({ query: getUserParcourQuery });
          if (parcours.data) {
            return {
              user: nextData && nextData.data ? nextData.data.refresh.user : user,
              parcours: parcours.data.userParcour,
            };
          }
        } else {
          return { user, parcours: null };
        }
      }
    }
    return null;
  } catch (e) {
    return null;
  }
}
