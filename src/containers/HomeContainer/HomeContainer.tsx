import React, { useContext, useEffect } from 'react';
// context
import userContext from 'common/contexts/UserContext';
import { useDidMount } from 'common/hooks/useLifeCycle';

// local component
import { Redirect } from 'react-router-dom';
import { usePosthog } from '../../common/hooks/usePosthog';
import { useMyAnalyticsProfile } from '../../requests/analytics';

const HomeContainer = () => {
  const { user } = useContext(userContext);

  const { enableAnalytics, posthog } = usePosthog();
  const [fetchAnalyticsProfile, { data: analyticsProfileData }] = useMyAnalyticsProfile();

  useEffect(() => {
    if (enableAnalytics && analyticsProfileData) {
      posthog!.register({
        nombreConnexions: analyticsProfileData.myAnalyticsProfile.nombreConnexions,
      });
    }
  }, [analyticsProfileData, enableAnalytics, posthog]);
  useDidMount(() => {
    if (user) {
      if (user && enableAnalytics) {
        fetchAnalyticsProfile();
      }
    }
  });

  if (!user) {
    return <Redirect to="/login" />;
  }
  if (user.isActive && user.tutorialStep !== 5) {
    return <Redirect to="/tutorial" />;
  }
  return (
    <div>
      <div>
        <span>home</span>
      </div>
    </div>
  );
};

export default HomeContainer;
