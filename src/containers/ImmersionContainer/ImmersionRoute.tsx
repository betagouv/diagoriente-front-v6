import Route from 'components/ui/Route';
import React, { FunctionComponent } from 'react';
import { Switch } from 'react-router-dom';
import createLazyComponent from '../../utils/createLazyComponent';

const ImmersionSearch = createLazyComponent(() => import('./ImmersionSearch'));
const ImmersionSearchResults = createLazyComponent(() => import('./ImmersionSearchResults'));

const ImmersionRoute: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/immersion/recherche" component={ImmersionSearch} />
      <Route exact path="/immersion/recherche/resultats" component={ImmersionSearchResults} />
    </Switch>
  );
};

export default ImmersionRoute;
