import React, { useEffect, useReducer } from 'react';
import { Switch } from 'react-router-dom';
import UserContext from 'common/contexts/UserContext';
import useRoot from 'common/hooks/useRoot';
import Route from 'components/ui/Route';
import SnackBarContext, { snackbarState, snackbarReducer } from 'common/contexts/SnackbarContext';
import HomeContainer from 'containers/HomeContainer/HomeContainer';
import LoginContainer from 'containers/LoginContainer';
import RegisterContainer from 'containers/RegisterContainer';
import { usePosthog } from '../common/hooks/usePosthog';
import { useMyAnalyticsProfile } from '../requests/analytics';

const RootContainer = () => {
  const { startupEnd, user, setUser } = useRoot();
  const [state, dispatch] = useReducer(snackbarReducer, snackbarState);
  const { enableAnalytics, posthog } = usePosthog();

  const [fetchAnalyticsProfile, { data: analyticsProfileData }] = useMyAnalyticsProfile();

  useEffect(() => {
    if (startupEnd && user && enableAnalytics) {
      fetchAnalyticsProfile();
    }
  }, [startupEnd, user, enableAnalytics, fetchAnalyticsProfile]);

  useEffect(() => {
    if (enableAnalytics && analyticsProfileData) {
      posthog!.register({
        nombreConnexions: analyticsProfileData.myAnalyticsProfile.nombreConnexions,
      });
    }
  }, [analyticsProfileData, enableAnalytics, posthog]);

  if (!startupEnd) return <div />;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <SnackBarContext.Provider value={{ state, dispatch }}>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route footer path="/login" exact component={LoginContainer} />
          <Route footer path="/register" exact component={RegisterContainer} />
        </Switch>
      </SnackBarContext.Provider>
    </UserContext.Provider>
  );
};

export default RootContainer;
