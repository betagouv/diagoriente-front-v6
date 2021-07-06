import React, { FunctionComponent } from 'react';
import classNames from 'common/utils/classNames';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

const AppLayout: FunctionComponent<{ className?: string }> = ({ className, children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className={classNames('flex flex-col flex-1', className)}>{children}</main>
      <AppFooter />
    </div>
  );
};

export default AppLayout;
