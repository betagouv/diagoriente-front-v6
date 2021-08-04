import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RootSkills from './CommonContainers/RootSkills';
import PageNotFoundContainer from '../PageNotFoundContainer';
import SelectionTheme from './CommonContainers/SelectionTheme';
import SelectionThemePro from './XPPro/ParcoursContainer/containers/SelectionTheme';

const ExperienceRoute = () => {
  return (
    <Switch>
      <Route exact path="/experience/theme" component={SelectionTheme} />
      <Route exact path="/experience/theme-pro" component={SelectionThemePro} />
      <Route path="/experience/:id" component={RootSkills} />
      <Route component={PageNotFoundContainer} />
    </Switch>
  );
};

export default ExperienceRoute;
