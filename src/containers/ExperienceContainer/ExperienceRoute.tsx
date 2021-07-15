import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ExperienceXPContainer from 'containers/ExperienceContainer/CommonContainers/ExperienceXPContainer';
import ParcoursXPContainer from 'containers/ExperienceContainer/CommonContainers/ParcoursXPContainer';
import QuestionXPContainer from 'containers/ExperienceContainer/CommonContainers/QuestionsContainer';

import PageNotFoundContainer from '../PageNotFoundContainer';
import ExperienceContainer from './ExperienceContainer';

type Props = {
  path: string;
};

const ExperienceRoute = ({ path }: Props) => {
  return (
    <Switch>
      <Route exact path={`${path}`} component={ExperienceContainer} />
      <Route exact path={`${path}/theme`} component={ExperienceXPContainer} />
      <Route exact path={`${path}/theme/create`} component={ParcoursXPContainer} />
      <Route exact path={`${path}/theme/question`} component={QuestionXPContainer} />

      <Route component={PageNotFoundContainer} />
    </Switch>
  );
};

export default ExperienceRoute;
