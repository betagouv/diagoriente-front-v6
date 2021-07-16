import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ParcoursXPContainer from 'containers/ExperienceContainer/CommonContainers/ParcoursXPContainer';
import QuestionXPContainer from 'containers/ExperienceContainer/CommonContainers/QuestionsContainer';

import PageNotFoundContainer from '../PageNotFoundContainer';
import MyExperiencesContainer from '../MyExperiencesContainer/MyExperiencesContainer';

type Props = {
  path: string;
};

const ExperienceRoute = ({ path }: Props) => {
  return (
    <Switch>
      <Route exact path={`${path}/theme/create`} component={ParcoursXPContainer} />
      <Route exact path={`${path}/theme/question`} component={QuestionXPContainer} />

      <Route component={PageNotFoundContainer} />
    </Switch>
  );
};

export default ExperienceRoute;
