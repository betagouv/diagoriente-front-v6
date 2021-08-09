import React, { FunctionComponent } from 'react';
import useMediaQuery from 'hooks/useMediaQuery';
import ParcoursExperienceLayoutForDesktop from './ParcoursExperienceLayout.desktop';
import ParcoursExperienceLayoutForMobile from './ParcoursExperienceLayout.mobile';

const ParcoursExperienceLayout: FunctionComponent<{ showMobileHeader?: boolean }> = ({
  showMobileHeader = true,
  children,
}) => {
  const isDesktop = useMediaQuery('md');

  return isDesktop ? (
    <ParcoursExperienceLayoutForDesktop>{children}</ParcoursExperienceLayoutForDesktop>
  ) : (
    <ParcoursExperienceLayoutForMobile showHeader={showMobileHeader}>{children}</ParcoursExperienceLayoutForMobile>
  );
};

export default ParcoursExperienceLayout;
