import gql from 'graphql-tag';

import { QueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';
import { useLocalQuery, useLocalMutation, useLocalLazyQuery } from 'common/hooks/apollo';

import { Question } from './types';

export const questionsQuery = gql`
  query Questions($search: String, $page: Int, $perPage: Int, $path: [ID]) {
    questions(search: $search, page: $page, perPage: $perPage, path: $path) {
      perPage
      page
      totalPages
      count
      data {
        id
        title
        parent {
          id
          title
        }
      }
    }
  }
`;

export interface QuestionsArguments {
  search?: string;
  page?: number;
  perPage?: number;
  path?: string[];
}

export interface QuestionsResponse {
  questions: {
    data: Question[];
    perPage: number;
    page: number;
    totalPages: number;
    count: number;
  };
}

export const useQuestions = (options: QueryHookOptions<QuestionsResponse, QuestionsArguments> = {}) =>
  useLocalQuery<QuestionsResponse, QuestionsArguments>(questionsQuery, options);

export const questionQuery = gql`
  query Question($id: ID!) {
    question(id: $id) {
      id
      title
      parent {
        id
        title
      }
    }
  }
`;

export interface QuestionResponse {
  question: Question;
}

export const useQuestion = (options: QueryHookOptions<QuestionResponse, { id: string }> = {}) =>
  useLocalLazyQuery(questionQuery, options);

export const addQuestionMutation = gql`
  mutation AddQuestion($title: String!, $parent: ID) {
    addQuestion(title: $title, parent: $parent) {
      id
      title
    }
  }
`;

export interface AddQuestionParams {
  title: string;
  parent: string;
}

export const useAddQuestion = (options?: MutationHookOptions<{ addQuestion: Question }, AddQuestionParams>) =>
  useLocalMutation(addQuestionMutation, options);

export const updateQuestionMutation = gql`
  mutation UpdateQuestion($id: ID!, $title: String, $parent: ID) {
    updateQuestion(id: $id, title: $title, parent: $parent) {
      id
      title
    }
  }
`;

export interface UpdateQuestionParams extends Partial<AddQuestionParams> {
  id: string;
}

export const useUpdateQuestion = (options?: MutationHookOptions<{ updateQuestion: Question }, UpdateQuestionParams>) =>
  useLocalMutation(updateQuestionMutation, options);

export const deleteQuestionMutation = gql`
  mutation DeleteQuestion($id: ID, $ids: [ID]) {
    deleteQuestion(id: $id, ids: $ids)
  }
`;

export const useDeleteQuestion = (
  options?: MutationHookOptions<{ deleteQuestion: string }, { id?: string; ids?: string[] }>,
) => useLocalMutation(deleteQuestionMutation, options);
