import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PageNotFoundContainer from '../PageNotFoundContainer';
import CenterInterestContainer from './CenterInterestContainer';

type Props = {
  path: string;
};

const CenterInterestRoute = ({ path }: Props) => {
  return (
    <Switch>
      <Route exact path={`${path}`} component={CenterInterestContainer} />
      <Route component={PageNotFoundContainer} />
    </Switch>
  );
};

export default CenterInterestRoute;
