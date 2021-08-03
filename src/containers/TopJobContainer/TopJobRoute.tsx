import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PageNotFoundContainer from '../PageNotFoundContainer';
import TopJobContainer from './TopJobContainer';

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
