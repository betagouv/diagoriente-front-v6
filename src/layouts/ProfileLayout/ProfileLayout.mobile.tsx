import React, { FunctionComponent } from 'react';
import PrivateBarLayout from '../PrivateBar';

const ProfileLayoutForMobile: FunctionComponent = ({ children }) => {
  return (
    <div className="min-h-screen h-full flex flex-col">
      <PrivateBarLayout />
      <div className="flex-1 bg-lena-lightgray">{children}</div>
    </div>
  );
};

export default ProfileLayoutForMobile;
