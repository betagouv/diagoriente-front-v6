import React, { FunctionComponent } from 'react';
import classNames from 'common/utils/classNames';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import useMediaQuery from '../../hooks/useMediaQuery';
import MobileHeaderGeneric from '../MobileHeaderGeneric';

const AppLayout: FunctionComponent<{ className?: string }> = ({ className, children }) => {
  const isDesktop = useMediaQuery('md');

  return (
    <div className="flex flex-col min-h-screen">
      {isDesktop ? <AppHeader /> : <MobileHeaderGeneric />}
      <main className={classNames('flex flex-col flex-1', className)}>{children}</main>
      <AppFooter />
    </div>
  );
};

export default AppLayout;
