import { ApolloError } from '@apollo/client';
import {
  useMutation,
  useQuery,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  LazyQueryHookOptions,
  MutationTuple,
} from '@apollo/react-hooks';
import { OperationVariables } from '@apollo/react-common';
import { DocumentNode } from 'graphql';
import { useEffect } from 'react';

export function useLocalMutation<T = any, V = OperationVariables>(
  mutation: DocumentNode,
  options: MutationHookOptions<T, V> = {},
): MutationTuple<T, V> {
  return useMutation(mutation, { onError: () => {}, ...options });
}

export function useLocalQuery<T = any, V = OperationVariables>(query: DocumentNode, options: QueryHookOptions<T, V>) {
  return useQuery(query, { onError: () => {}, ...options });
}

export function useLocalLazyQuery<T = any, V = OperationVariables>(
  query: DocumentNode,
  options: LazyQueryHookOptions<T, V>,
) {
  return useLazyQuery(query, { onError: () => {}, ...options });
}

export function useError(state: { error?: ApolloError } | undefined | null, callback: (error: string) => void) {
  useEffect(() => {
    if (state && state.error) {
      if (!state.error.graphQLErrors.length) {
        callback(state.error.message);
      } else if (typeof state.error.graphQLErrors[0].message === 'string') {
        callback(state.error.graphQLErrors[0].message);
      } else if (typeof state.error.graphQLErrors[0].message === 'object') {
        callback((state.error.graphQLErrors[0].message as any).message);
      }
    }
    // eslint-disable-next-line
  }, [state?.error]);
}
