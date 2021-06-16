import gql from 'graphql-tag';

import { MutationHookOptions } from '@apollo/react-hooks';
import { useLocalMutation } from 'common/hooks/apollo';

export const addSkillCommentlMutation = gql`
  mutation AddSkillComment($firstName: String!, $lastName: String!, $email: String!, $text: String!, $id: ID!) {
    addSkillComment(firstName: $firstName, lastName: $lastName, email: $email, text: $text, id: $id) {
      id
    }
  }
`;
export interface AddSkillCommentArguments {
  firstName: string;
  lastName: string;
  email: string;
  text: string;
  id: string;
}

export const useAddSkillComment = (
  options: MutationHookOptions<{ addSkillComment: { id: string } }, AddSkillCommentArguments> = {},
) => useLocalMutation(addSkillCommentlMutation, options);

export const updateSkillComment = gql`
  mutation UpdateSkillComment(
    $id: ID!
    $commentText: String!
    $status: String!
    $location: String
    $institution: String!
  ) {
    updateSkillComment(
      id: $id
      commentText: $commentText
      institution: $institution
      status: $status
      location: $location
    ) {
      id
    }
  }
`;

export interface UpdateSkillCommentArguments {
  commentText: string;
  status: 'accepted' | 'refused';
  location: string;
  institution: string;
  id: string;
}

export const useUpdateSkillComment = (
  options: MutationHookOptions<{ addSkillComment: { id: string } }, UpdateSkillCommentArguments> = {},
) => useLocalMutation(updateSkillComment, options);
