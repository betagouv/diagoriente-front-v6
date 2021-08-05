import React, { FunctionComponent } from 'react';
import useMediaQuery from 'hooks/useMediaQuery';
import AppLayout from '../AppLayout/AppLayout';
import ImmersionSidebar from './ImmersionSidebar';

const ImmersionLayout: FunctionComponent<{ showSearch?: boolean }> = ({ showSearch = false, children }) => {
  const isDesktop = useMediaQuery('md');

  return (
    <AppLayout>
      <div className="flex flex-row flex-1 absolute top-14 bottom-0 left-0 right-0">
        {isDesktop && <ImmersionSidebar showSearch={showSearch} />}
        <div className="flex flex-col flex-1 overflow-auto">{children}</div>
      </div>
    </AppLayout>
  );
};

export default ImmersionLayout;
