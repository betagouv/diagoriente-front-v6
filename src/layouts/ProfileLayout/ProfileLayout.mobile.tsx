import React, { FunctionComponent } from 'react';
import MobileHeaderGeneric from '../MobileHeaderGeneric';

const ProfileLayoutForMobile: FunctionComponent = ({ children }) => {
  return (
    <div className="min-h-screen h-full flex flex-col">
      <MobileHeaderGeneric center={<div className="font-bold text-lena-blue-dark text-lg">Mon profil</div>} />
      <div className="flex flex-col flex-1 bg-lena-lightgray">{children}</div>
    </div>
  );
};

export default ProfileLayoutForMobile;
