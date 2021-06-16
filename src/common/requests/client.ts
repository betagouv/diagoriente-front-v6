/* eslint-disable no-console */
import {
  ApolloClient, InMemoryCache, ApolloLink, Observable, Operation,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';

let token = '';

export function setAuthorizationBearer(nextToken: string) {
  token = nextToken;
}

const request = async (operation: Operation) => {
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: ZenObservable.Subscription | undefined;
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    }),
);

export const client = new ApolloClient({
  link: ApolloLink.from([
    requestLink,
    // @ts-ignore
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    createUploadLink({
      uri: process.env.REACT_APP_BACKEND_URL,
    }),
  ]),
  cache: new InMemoryCache({
    dataIdFromObject: (o: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      o.id ? `${o.__typename}-${o.id}` : `${o.__typename}-${o.cursor}`;
    },
  } as any),
});
