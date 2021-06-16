import gql from 'graphql-tag';

import { QueryHookOptions, MutationHookOptions, LazyQueryHookOptions } from '@apollo/react-hooks';
import { useLocalMutation, useLocalLazyQuery } from 'common/hooks/apollo';

import { Reference } from './types';

export const referencesQuery = gql`
  {
    references {
      data {
        id
        title
        static
        competences {
          id
          title
          type
          niveau {
            title
            sub_title
          }
        }
      }
    }
  }
`;

export interface ReferenceResponse {
  references: {
    data: Reference[];
  };
}

export const useReferences = (options: QueryHookOptions<ReferenceResponse> = {}) =>
  useLocalLazyQuery(referencesQuery, options);

export const referenceDefault = gql`
  {
    referencesDefault {
      data {
        id
        title
        competences {
          id
          title
        }
      }
    }
  }
`;
export interface ReferenceDefaultResponse {
  referencesDefault: { data: Reference[] };
}
export const useDefaultReferences = (options: QueryHookOptions<ReferenceDefaultResponse> = {}) =>
  useLocalLazyQuery(referenceDefault, options);

export const referenceQuery = gql`
  query Reference($id: ID, $title: String) {
    reference(id: $id, title: $title) {
      id
      title
      static
      competences {
        id
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
export interface ReferenceQueryResponse {
  reference: Reference;
}
export const useReference = (options: LazyQueryHookOptions<ReferenceQueryResponse> = {}) =>
  useLocalLazyQuery(referenceQuery, options);
export const addReferenceMutation = gql`
  mutation AddReference($title: String!, $competences: [referenceCompetenceInput]!) {
    addReference(title: $title, competences: $competences) {
      id
      title
    }
  }
`;

export interface AddReferenceArguments {
  title: string;
  competences: { title: string; type: string; niveau: { title: string; sub_title: string }[] }[];
}

export interface AddReferenceResponse {
  addReference: {
    id: string;
    title: string;
  };
}

export const useAddReference = (options: MutationHookOptions<AddReferenceResponse, AddReferenceArguments> = {}) =>
  useLocalMutation(addReferenceMutation, options);

export const deleteRefMutation = gql`
  mutation deleteReference($id: ID) {
    deleteReference(id: $id)
  }
`;
export const useDeleteRef = (options: MutationHookOptions = {}) => useLocalMutation(deleteRefMutation, options);

export const UpdateReferenceMutation = gql`
  mutation updateReference($id: ID!, $title: String, $competences: [referenceCompetenceUpdateInput], $static: Boolean) {
    updateReference(id: $id, title: $title, competences: $competences, static: $static) {
      id
      title
      static
      competences {
        id
        type
        title
        niveau {
          title
          sub_title
        }
      }
    }
  }
`;

export interface UpdateReferenceArguments {
  id: string;
  title: string;
  competences: { id?: string; title: string; type: string; niveau: { title: string; sub_title: string }[] }[];
  static?: boolean;
}

export interface UpdateReferenceResponse {
  updateReference: Reference;
}

export const useUpdateReference = (
  options: MutationHookOptions<UpdateReferenceResponse, UpdateReferenceArguments> = {},
) => useLocalMutation(UpdateReferenceMutation, options);

/* const GetStaticRef = gql`
  query ReferencesStatic($title: String, $id: ID) {
    referencesStatic(title: $title, id: $id) {
      id
      title
      competences {
        type
        title
        niveau {
          title
          sub_title
        }
      }
      static
    }
  }
`;
interface StaticRefArguments {
  title?: string;
  id?: string;
}
interface StaticRefResponse {
  referencesStatic: Reference;
}
export const useGetStaticRef = (options: LazyQueryHookOptions<StaticRefResponse, StaticRefArguments> = {}) =>
  useLocalLazyQuery<StaticRefResponse, StaticRefArguments>(GetStaticRef, options); */
