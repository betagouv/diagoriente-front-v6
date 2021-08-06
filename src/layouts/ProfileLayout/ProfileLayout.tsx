import AppLayout from 'layouts/AppLayout/AppLayout';
import React, { FunctionComponent } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import ProfileSidebar from './ProfileSidebar';

const ProfileLayout: FunctionComponent = ({ children }) => {
  const isDesktop = useMediaQuery('md');

  return (
    <AppLayout>
      <div className="flex flex-row flex-1 absolute top-14 bottom-0 left-0 right-0">
        {isDesktop && <ProfileSidebar />}
        <div className="flex flex-col flex-1 overflow-auto">{children}</div>
      </div>
    </AppLayout>
  );
};

export default ProfileLayout;
