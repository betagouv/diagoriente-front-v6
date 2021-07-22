import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PageNotFoundContainer from '../PageNotFoundContainer';
import TopJobContainer from './TopJobContainer';
import Search from '../JobsContainer/containers/Search';
import SearchResults from '../JobsContainer/containers/SearchResults';
import DetailJob from '../JobsContainer/containers/DetailJob';

type Props = {
  path: string;
};

const TopJobRoute = ({ path }: Props) => {
  return (
    <Switch>
      <Route exact path={`${path}`} component={TopJobContainer} />
      <Route component={PageNotFoundContainer} />
    </Switch>
  );
};

export default TopJobRoute;
