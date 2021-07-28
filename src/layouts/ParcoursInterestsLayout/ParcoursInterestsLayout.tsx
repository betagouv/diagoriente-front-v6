import React, { FunctionComponent } from 'react';
import useMediaQuery from 'hooks/useMediaQuery';
import ParcoursInterestsLayoutForMobile from './ParcoursInterestsLayout.mobile';
import ParcoursInterestsLayoutForDesktop from './ParcoursInterestsLayout.desktop';

type Props = {
  withMobile?: boolean;
};

const ParcoursInterestsLayout: FunctionComponent<Props> = ({ withMobile = true, children }) => {
  const isDesktop = useMediaQuery('md');

  return isDesktop ? (
    <ParcoursInterestsLayoutForDesktop>{children}</ParcoursInterestsLayoutForDesktop>
  ) : withMobile ? (
    <ParcoursInterestsLayoutForMobile>{children}</ParcoursInterestsLayoutForMobile>
  ) : (
    <div>{children}</div>
  );
};

export default ParcoursInterestsLayout;
