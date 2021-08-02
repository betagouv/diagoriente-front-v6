import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import createLazyComponent from '../../utils/createLazyComponent';

const DetailJob = createLazyComponent(() => import('./containers/DetailJob'));
const Search = createLazyComponent(() => import('./containers/SearchV2'));
const SearchResults = createLazyComponent(() => import('./containers/SearchResults'));

const JobsRoute: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/metiers/recherche" component={Search} />
      <Route exact path="/metiers/recherche/resultats" component={SearchResults} />
      <Route exact path="/metiers/:id" component={DetailJob} />
    </Switch>
  );
};

export default JobsRoute;
