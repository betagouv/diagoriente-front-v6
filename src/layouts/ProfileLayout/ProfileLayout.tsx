import React, { FunctionComponent } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import ProfileLayoutForDesktop from './ProfileLayout.desktop';
import ProfileLayoutForMobile from './ProfileLayout.mobile';

const ProfileLayout: FunctionComponent = ({ children }) => {
  const mediaQueryMD = useMediaQuery('md');

  return mediaQueryMD ? (
    <ProfileLayoutForDesktop>{children}</ProfileLayoutForDesktop>
  ) : (
    <ProfileLayoutForMobile>{children}</ProfileLayoutForMobile>
  );
};

export default ProfileLayout;
