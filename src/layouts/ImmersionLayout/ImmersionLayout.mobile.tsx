import React, { FunctionComponent } from 'react';
import AppLayout from '../AppLayout/AppLayout';

const ImmersionLayoutForMobile: FunctionComponent = ({ children }) => {
  return (
    <AppLayout>
      <div className="flex flex-col flex-1">{children}</div>
    </AppLayout>
  );
};

export default ImmersionLayoutForMobile;
