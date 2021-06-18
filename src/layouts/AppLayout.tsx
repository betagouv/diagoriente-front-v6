import React, { FunctionComponent } from 'react';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

const AppLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex flex-col flex-1">{children}</main>
      <AppFooter />
    </div>
  );
};

export default AppLayout;
