import React, { useReducer } from 'react';
import { Switch } from 'react-router-dom';
import UserContext from 'common/contexts/UserContext';
import useRoot from 'common/hooks/useRoot';
import Route from 'components/ui/Route';
import SnackBarContext, { snackbarState, snackbarReducer } from 'common/contexts/SnackbarContext';
import HomeContainer from './HomeContainer/HomeContainer';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';
import OnBoardingContainer from './OnBoardingContainer';
import WipExperienceContainer from './WIPExperienceContainer/WIPExperienceContainer';
import ProfileContainer from './ProfileContainer';
import PageNotFoundContainer from './PageNotFoundContainer';

const RootContainer = () => {
  const { startupEnd, user, setUser } = useRoot();
  const [state, dispatch] = useReducer(snackbarReducer, snackbarState);

  if (!startupEnd) return <div />;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <SnackBarContext.Provider value={{ state, dispatch }}>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/connexion" component={LoginContainer} />
          <Route exact path="/inscription" component={RegisterContainer} />
          <Route exact path="/bienvenue" component={OnBoardingContainer} />
          <Route exact path="/profil" component={ProfileContainer} />
          <Route path="/experience" component={WipExperienceContainer} />
          <Route exact path="/404" component={PageNotFoundContainer} />
          <Route component={PageNotFoundContainer} />
        </Switch>
      </SnackBarContext.Provider>
    </UserContext.Provider>
  );
};

export default RootContainer;
