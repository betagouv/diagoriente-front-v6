import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ExperienceXPContainer from 'containers/ExperienceContainer/CommonContainers/ExperienceXPContainer';
import ParcoursXPProContainer from './XPPro/ParcoursContainer/ParcoursXPProContainer';
import PageNotFoundContainer from '../PageNotFoundContainer';
import ExperienceContainer from './ExperienceContainer';
import ParcoursXPPersoContainer from './XPPerso/ParcoursContainer/ParcoursXPPersoContainer';

type Props = {
  path: string;
};

const ExperienceRoute = ({ path }: Props) => {
  return (
    <Switch>
      <Route exact path={`${path}`} component={ExperienceContainer} />
      <Route exact path={`${path}/theme`} component={ExperienceXPContainer} />
      <Route exact path={`${path}/pro/create`} component={ParcoursXPProContainer} />
      <Route exact path={`${path}/perso/create`} component={ParcoursXPPersoContainer} />
      <Route component={PageNotFoundContainer} />
    </Switch>
  );
};

export default ExperienceRoute;
