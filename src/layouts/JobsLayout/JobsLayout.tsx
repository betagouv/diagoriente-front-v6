import React, { FunctionComponent } from 'react';
import useMediaQuery from 'hooks/useMediaQuery';
import JobsLayoutForDesktop from './JobsLayout.desktop';
import JobsLayoutForMobile from './JobsLayout.mobile';

const JobsLayout: FunctionComponent<{ mobileHeaderMode?: 'back' | 'search_jobs'; onBack?: () => void }> = ({
  mobileHeaderMode,
  children,
  onBack,
}) => {
  const isDesktop = useMediaQuery('md');

  return isDesktop ? (
    <JobsLayoutForDesktop>{children}</JobsLayoutForDesktop>
  ) : (
    <JobsLayoutForMobile headerMode={mobileHeaderMode} onBack={onBack}>
      {children}
    </JobsLayoutForMobile>
  );
};

export default JobsLayout;
