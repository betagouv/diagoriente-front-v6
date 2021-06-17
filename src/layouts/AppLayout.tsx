import React, { FunctionComponent } from 'react';

const AppLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>Header</header>
      <main className="flex flex-col flex-1">{children}</main>
      <header>Footer</header>
    </div>
  );
};

export default AppLayout;
