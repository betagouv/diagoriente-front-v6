import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ParcoursXPContainer from './XP/ParcoursContainer/ParcoursXPContainer';
import PageNotFoundContainer from '../PageNotFoundContainer';
import ExperienceContainer from './ExperienceContainer';
import ExperienceXPContainer from './XP/ExperienceXPContainer';

type Props = {
  path: string;
};

const ExperienceRoute = ({ path }: Props) => {
  return (
    <Switch>
      <Route exact path={`${path}`} component={ExperienceContainer} />
      <Route exact path={`${path}/xp`} component={ExperienceXPContainer} />
      <Route exact path={`${path}/xp/create`} component={ParcoursXPContainer} />
      <Route component={PageNotFoundContainer} />
    </Switch>
  );
};

export default ExperienceRoute;
