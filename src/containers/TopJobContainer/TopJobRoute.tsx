import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PageNotFoundContainer from '../PageNotFoundContainer';
import TopJobContainer from './TopJobContainer';
import SearchJob from './containers/SearchJob';
import ListJob from './containers/ListJob';

type Props = {
  path: string;
};

const TopJobRoute = ({ path }: Props) => {
  return (
    <Switch>
      <Route exact path={`${path}`} component={TopJobContainer} />
      <Route exact path={`${path}/rechercher`} component={SearchJob} />
      <Route exact path={`${path}/rechercher/resultats`} component={ListJob} />
      <Route component={PageNotFoundContainer} />
    </Switch>
  );
};

export default TopJobRoute;
