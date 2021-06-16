import posthog from 'posthog-js';

type PosthogHookResult = {
  enableAnalytics: boolean;
  posthog: typeof posthog | null;
};

export const usePosthog = (): PosthogHookResult => {
  if (process.env.REACT_APP_ENABLE_ANALYTICS && process.env.REACT_APP_POSTHOG_PROJECT_KEY) {
    // @ts-ignore
    if (!window.posthogInitialized) {
      posthog.init(process.env.REACT_APP_POSTHOG_PROJECT_KEY, {
        api_host: process.env.REACT_APP_POSTHOG_HOST_URL,
        autocapture: false,
        debug: process.env.NODE_ENV === 'development',
      });
      // @ts-ignore
      window.posthog = posthog;
      // @ts-ignore
      window.posthogInitialized = true;
    }

    // @ts-ignore
    return { enableAnalytics: true, posthog: window.posthog as typeof posthog };
  }

  return { enableAnalytics: false, posthog: null };
};
