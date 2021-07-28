import React, { FunctionComponent } from 'react';
import MobileHeaderGeneric from '../MobileHeaderGeneric';

const ImmersionLayoutForMobile: FunctionComponent = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MobileHeaderGeneric />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default ImmersionLayoutForMobile;
