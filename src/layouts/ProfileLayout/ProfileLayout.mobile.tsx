import React, { FunctionComponent } from 'react';
import PrivateBarLayout from './components/ProfileHeader';

const ProfileLayoutForMobile: FunctionComponent = ({ children }) => {
  return (
    <div className="min-h-screen h-full flex flex-col">
      <PrivateBarLayout />
      <div className="flex flex-col flex-1 bg-lena-lightgray">{children}</div>
    </div>
  );
};

export default ProfileLayoutForMobile;
