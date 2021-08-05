import React, { FunctionComponent, useEffect } from 'react';
import AppLayout from '../AppLayout/AppLayout';
import ParcoursExperienceSidebar from './ParcoursExperienceSidebar';

const ParcoursExperienceLayoutForDesktop: FunctionComponent = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-row flex-1 absolute top-14 bottom-0 left-0 right-0">
        <ParcoursExperienceSidebar />
        <div className="w-full flex flex-col md:relative overflow-auto">{children}</div>
      </div>
    </AppLayout>
  );
};

export default ParcoursExperienceLayoutForDesktop;
