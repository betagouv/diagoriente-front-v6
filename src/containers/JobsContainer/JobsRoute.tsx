import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import createLazyComponent from '../../utils/createLazyComponent';

const DetailJob = createLazyComponent(() => import('./containers/DetailJob'));
const Search = createLazyComponent(() => import('./containers/Search'));
const SearchResults = createLazyComponent(() => import('./containers/SearchResults'));
const DetailJobAdvForMobile = createLazyComponent(() => import('./containers/DetailJobAdv.mobile'));

const JobsRoute: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/metiers/recherche" component={Search} />
      <Route exact path="/metiers/recherche/resultats" component={SearchResults} />
      <Route exact path="/metiers/:id" component={DetailJob} />
      <Route exact path="/metiers/:id/statistiques" component={DetailJobAdvForMobile} />
    </Switch>
  );
};

export default JobsRoute;
