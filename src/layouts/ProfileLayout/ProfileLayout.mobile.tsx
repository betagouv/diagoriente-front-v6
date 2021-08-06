import React, { FunctionComponent } from 'react';
import AppLayout from '../AppLayout/AppLayout';

const ProfileLayoutForMobile: FunctionComponent = ({ children }) => {
  return (
    <AppLayout>
      <div className="flex flex-col flex-1 bg-lena-lightgray">{children}</div>
    </AppLayout>
  );
};

export default ProfileLayoutForMobile;
