import React, { FunctionComponent } from 'react';
import useMediaQuery from 'hooks/useMediaQuery';
import AppLayout from '../AppLayout/AppLayout';
import ParcoursInterestsSidebar from './ParcoursInterestsSidebar';

type Props = {
  showHeader?: boolean;
};

const ParcoursInterestsLayout: FunctionComponent<Props> = ({ showHeader, children }) => {
  const isDesktop = useMediaQuery('md');

  return (
    <AppLayout showHeader={showHeader}>
      <div className="flex flex-row flex-1 absolute top-14 bottom-0 left-0 right-0">
        {isDesktop && <ParcoursInterestsSidebar />}
        <div className="flex flex-col flex-1 overflow-auto">{children}</div>
      </div>
    </AppLayout>
  );
};

export default ParcoursInterestsLayout;
