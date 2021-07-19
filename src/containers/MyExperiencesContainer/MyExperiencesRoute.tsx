import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PageNotFoundContainer from '../PageNotFoundContainer';
import MyExperiencesContainer from './MyExperiencesContainer';
import MyExperiencesByThemeContainer from './containers/MyExperiencesByThemeContainer';

type Props = {
  path: string;
};

const MyExperiencesRoute = ({ path }: Props) => {
  return (
    <Switch>
      <Route exact path="/mes-experiences" component={MyExperiencesContainer} />
      <Route exact path="/mes-experiences/:type" component={MyExperiencesByThemeContainer} />
      <Route component={PageNotFoundContainer} />
    </Switch>
  );
};

export default MyExperiencesRoute;
