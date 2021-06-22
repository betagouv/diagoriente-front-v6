import React, { FunctionComponent } from 'react';
import useMediaQuery from '../../../hooks/useMediaQuery';
import ParcoursLayoutForDesktop from './ParcoursLayout.desktop';
import ParcoursLayoutForMobile from './ParcoursLayout.mobile';

const ParcoursLayout: FunctionComponent = ({ children }) => {
  const isDesktop = useMediaQuery('md');

  return isDesktop ? (
    <ParcoursLayoutForDesktop>{children}</ParcoursLayoutForDesktop>
  ) : (
    <ParcoursLayoutForMobile>{children}</ParcoursLayoutForMobile>
  );
};

export default ParcoursLayout;
