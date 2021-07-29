import React, { FunctionComponent } from 'react';
import MobileHeaderGeneric from '../MobileHeaderGeneric';

const JobsLayoutForMobile: FunctionComponent = ({ children }) => {
  return (
    <div>
      <MobileHeaderGeneric />
      <div>{children}</div>
    </div>
  );
};

export default JobsLayoutForMobile;
