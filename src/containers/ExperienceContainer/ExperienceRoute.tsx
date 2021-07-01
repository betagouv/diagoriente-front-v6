import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ParcoursXPProContainer from './XPPro/ParcoursContainer/ParcoursXPProContainer';
import PageNotFoundContainer from '../PageNotFoundContainer';
import ExperienceContainer from './ExperienceContainer';
import ExperienceXPProContainer from './XPPro/ExperienceXPProContainer';
import ExperienceXPPersoContainer from './XPPerso/ExperienceXPPersoContainer';
import ParcoursXPPersoContainer from './XPPerso/ParcoursContainer/ParcoursXPPersoContainer';

type Props = {
  path: string;
};

const ExperienceRoute = ({ path }: Props) => {
  return (
    <Switch>
      <Route exact path={`${path}`} component={ExperienceContainer} />
      <Route exact path={`${path}/pro`} component={ExperienceXPProContainer} />
      <Route exact path={`${path}/pro/create`} component={ParcoursXPProContainer} />
      <Route exact path={`${path}/perso`} component={ExperienceXPPersoContainer} />
      <Route exact path={`${path}/perso/create`} component={ParcoursXPPersoContainer} />
      <Route component={PageNotFoundContainer} />
    </Switch>
  );
};

export default ExperienceRoute;
