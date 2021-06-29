import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ExperienceXPContainer from './XP/ParcoursContainer/ExperienceXPContainer';
import PageNotFoundContainer from '../PageNotFoundContainer';

type Props = {
  path: string;
};

const ExperienceRoute = ({ path }: Props) => {
  return (
    <Switch>
      <Route exact path={`${path}`} component={ExperienceXPContainer} />
      <Route component={PageNotFoundContainer} />
    </Switch>
  );
};

export default ExperienceRoute;
