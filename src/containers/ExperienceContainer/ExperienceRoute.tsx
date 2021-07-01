import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ParcoursXPContainer from './XPPro/ParcoursContainer/ParcoursXPContainer';
import PageNotFoundContainer from '../PageNotFoundContainer';
import ExperienceContainer from './ExperienceContainer';
import ExperienceXPProContainer from './XPPro/ExperienceXPProContainer';
import ExperienceXPPersoContainer from './XPPerso/ExperienceXPPersoContainer';

type Props = {
  path: string;
};

const ExperienceRoute = ({ path }: Props) => {
  return (
    <Switch>
      <Route exact path={`${path}`} component={ExperienceContainer} />
      <Route exact path={`${path}/pro`} component={ExperienceXPProContainer} />
      <Route exact path={`${path}/pro/create`} component={ParcoursXPContainer} />
      <Route exact path={`${path}/perso`} component={ExperienceXPPersoContainer} />
      <Route component={PageNotFoundContainer} />
    </Switch>
  );
};

export default ExperienceRoute;
