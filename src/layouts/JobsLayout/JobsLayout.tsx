import React, { FunctionComponent } from 'react';
import useMediaQuery from 'hooks/useMediaQuery';
import JobsLayoutForDesktop from './JobsLayout.desktop';
import JobsLayoutForMobile from './JobsLayout.mobile';

const JobsLayout: FunctionComponent = ({ children }) => {
  const isDesktop = useMediaQuery('md');

  return isDesktop ? (
    <JobsLayoutForDesktop>{children}</JobsLayoutForDesktop>
  ) : (
    <JobsLayoutForMobile>{children}</JobsLayoutForMobile>
  );
};

export default JobsLayout;
