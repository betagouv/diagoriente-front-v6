import React, { FunctionComponent } from 'react';
import useMediaQuery from 'hooks/useMediaQuery';
import ParcoursInterestsLayoutForMobile from './ParcoursLayout.mobile';
import ParcoursInterestsLayoutForDesktop from './ParcoursLayout.desktop';

type Props = {
  withRange?: boolean;
  withMobile?: boolean;
  backgroundColor?: string;
};

const ParcoursInterestsLayout: FunctionComponent<Props> = ({
  withRange,
  withMobile = true,
  backgroundColor,
  children,
}) => {
  const isDesktop = useMediaQuery('md');

  return isDesktop ? (
    <ParcoursInterestsLayoutForDesktop>{children}</ParcoursInterestsLayoutForDesktop>
  ) : withMobile ? (
    <ParcoursInterestsLayoutForMobile backgroundColor={backgroundColor} withRange={withRange}>
      {children}
    </ParcoursInterestsLayoutForMobile>
  ) : (
    <div>{children}</div>
  );
};

export default ParcoursInterestsLayout;
