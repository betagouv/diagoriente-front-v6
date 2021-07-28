import React, { FunctionComponent } from 'react';
import useMediaQuery from 'hooks/useMediaQuery';
import ImmersionLayoutForDesktop from './ImmersionLayout.desktop';
import ImmersionLayoutForMobile from './ImmersionLayout.mobile';

const ImmersionLayout: FunctionComponent<{ showSearch?: boolean }> = ({ showSearch = false, children }) => {
  const isDesktop = useMediaQuery('md');

  return isDesktop ? (
    <ImmersionLayoutForDesktop showSearch={showSearch}>{children}</ImmersionLayoutForDesktop>
  ) : (
    <ImmersionLayoutForMobile>{children}</ImmersionLayoutForMobile>
  );
};

export default ImmersionLayout;
