import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PageNotFoundContainer from '../PageNotFoundContainer';
import CenterInterestContainer from './CenterInterestContainer';
import CenterInterestCreateContainer from './Create/CenterInterestCreateContainer';

type Props = {
  path: string;
};

const CenterInterestRoute = ({ path }: Props) => {
  return (
    <Switch>
      <Route exact path={`${path}`} component={CenterInterestContainer} />
      <Route exact path={`${path}/create`} component={CenterInterestCreateContainer} />
      <Route component={PageNotFoundContainer} />
    </Switch>
  );
};

export default CenterInterestRoute;
