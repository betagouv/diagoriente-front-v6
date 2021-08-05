import React, { FunctionComponent } from 'react';
import classNames from 'common/utils/classNames';
import AppFooter from './AppFooter';
import AppHeaderDesktop from './AppHeader.desktop';
import useMediaQuery from '../../hooks/useMediaQuery';
import AppHeaderMobile from './AppHeader.mobile';

const AppLayout: FunctionComponent<{ showHeader?: boolean; showFooter?: boolean; className?: string }> = ({
  showHeader = true,
  showFooter = true,
  className,
  children,
}) => {
  const isDesktop = useMediaQuery('md');

  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && (isDesktop ? <AppHeaderDesktop /> : <AppHeaderMobile />)}
      <main className={classNames('flex flex-col flex-1', className)}>{children}</main>
      {showFooter && <AppFooter />}
    </div>
  );
};

export default AppLayout;
