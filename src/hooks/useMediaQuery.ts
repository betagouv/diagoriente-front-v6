import { useEffect, useState } from 'react';

type AppResponsiveBreakpoint = 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
const mediaQueries: Record<AppResponsiveBreakpoint, string> = {
  default: '(max-width: 640px)', // targets between 0-640px (most phones)
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

const useMediaQuery = (breakpoint: AppResponsiveBreakpoint) => {
  const [isVerified, setIsVerified] = useState(window.matchMedia(mediaQueries[breakpoint]).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueries[breakpoint]);
    const documentChangeHandler = () => setIsVerified(mediaQueryList.matches);

    try {
      mediaQueryList.addEventListener('change', documentChangeHandler);
    } catch (e) {
      // Safari isn't supporting mediaQueryList.addEventListener
      mediaQueryList.addListener(documentChangeHandler);
    }

    documentChangeHandler();
    return () => {
      try {
        mediaQueryList.removeEventListener('change', documentChangeHandler);
      } catch (e) {
        // Safari isn't supporting mediaQueryList.removeEventListener
        mediaQueryList.removeListener(documentChangeHandler);
      }
    };
  }, [breakpoint]);

  return isVerified;
};

export default useMediaQuery;
