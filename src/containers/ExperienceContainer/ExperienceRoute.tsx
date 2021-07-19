import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RootSkills from './CommonContainers/RootSkills';

import PageNotFoundContainer from '../PageNotFoundContainer';

const ExperienceRoute = () => {
  return (
    <Switch>
      <Route path="/experience/theme/:id" component={RootSkills} />
      <Route component={PageNotFoundContainer} />
    </Switch>
  );
};

export default ExperienceRoute;
