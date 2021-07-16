import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ExperienceXPContainer from 'containers/ExperienceContainer/CommonContainers/ExperienceXPContainer';
import RootSkills from 'containers/ExperienceContainer/CommonContainers/RootSkills';

import PageNotFoundContainer from '../PageNotFoundContainer';
import ExperienceContainer from './ExperienceContainer';

const ExperienceRoute = () => {
  return (
    <Switch>
      <Route exact path="/experience" component={ExperienceContainer} />
      <Route exact path="/experience/theme" component={ExperienceXPContainer} />
      <Route path="/experience/theme/:id" component={RootSkills} />
      <Route component={PageNotFoundContainer} />
    </Switch>
  );
};

export default ExperienceRoute;
