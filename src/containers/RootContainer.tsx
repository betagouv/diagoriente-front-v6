import React, { useReducer } from 'react';
import { Switch } from 'react-router-dom';
import UserContext from 'common/contexts/UserContext';
import useRoot from 'common/hooks/useRoot';
import Route from 'components/ui/Route';
import SnackBarContext, { snackbarState, snackbarReducer } from 'common/contexts/SnackbarContext';
import HomeContainer from './HomeContainer/HomeContainer';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';
import OnBoardingContainer from './OnBoardingContainer/OnBoardingContainer';
import WipExperienceContainer from './WIPExperienceContainer/WIPExperienceContainer';

const RootContainer = () => {
  const { startupEnd, user, setUser } = useRoot();
  const [state, dispatch] = useReducer(snackbarReducer, snackbarState);

  if (!startupEnd) return <div />;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <SnackBarContext.Provider value={{ state, dispatch }}>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route footer path="/login" exact component={LoginContainer} />
          <Route footer path="/register" exact component={RegisterContainer} />
          <Route path="/onboarding" exact component={OnBoardingContainer} />
          <Route footer path="/experience" component={WipExperienceContainer} />
        </Switch>
      </SnackBarContext.Provider>
    </UserContext.Provider>
  );
};

export default RootContainer;
