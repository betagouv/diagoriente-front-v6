import React, { FunctionComponent } from 'react';
import AppLayout from '../AppLayout/AppLayout';

const ParcoursInterestsLayoutForMobile: FunctionComponent = ({ children }) => {
  return (
    <AppLayout>
      <div className="flex flex-col flex-1">{children}</div>
    </AppLayout>
  );
};

export default ParcoursInterestsLayoutForMobile;
