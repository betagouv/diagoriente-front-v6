import React, { useContext, useState } from 'react';
import UserContext from 'common/contexts/UserContext';
import DrawerContext from 'common/contexts/DrawerContext';

import { encodeUri } from 'common/utils/url';
import { Route as BaseRoute, Redirect, RouteProps as BaseRouteProps, useLocation } from 'react-router-dom';
/* import PrivateHeader from 'components/Layout/Header/Header';
 */ import PrivateDrawer from 'components/Layout/Drawer/Drawer';

import classNames from 'common/utils/classNames';

import NotFoundPage from 'components/Layout/NotFound/NotFound';
import classes from './styles.module.scss';

export interface RouteProps extends BaseRouteProps {
  protected?: boolean;
  footer?: boolean;
  header?: boolean;
  authorizedRole?: 'user' | 'admin' | 'advisor';
}

// u can add extra props to customise/add headers/footers/sidebars...

const Route = ({ protected: protectedProp, footer, header, authorizedRole, ...rest }: RouteProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user } = useContext(UserContext);
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  function renderHeader(components: { private: JSX.Element }) {
    if (!user || !user?.isActive) return null;
    return components.private;
  }

  if (protectedProp) {
    if (!user && authorizedRole === 'user') {
      return <Redirect to={`/login${encodeUri({ from: window.location.pathname + window.location.search })}`} />;
    }
    if (user && !user?.isActive) {
      return <Redirect to="/" />;
    }
  }
  if (user && isAuthPage) {
    return <Redirect to="/" />;
  }
  function renderRoute() {
    if ((!user || user.role === 'user') && authorizedRole === 'admin') {
      return <NotFoundPage />;
    }
    if ((!user || user.role === 'user') && authorizedRole === 'advisor') {
      return <NotFoundPage />;
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <BaseRoute {...rest} />;
  }
  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      <div className={classNames(header && classes.container, classes.row)}>
        {renderHeader({ private: <PrivateDrawer /> })}
        <div
          className={classNames(
            classes.page,
            classes.column,
            user && user.isActive && classes.marginPage,
            open ? classes.marginPageOpen : classes.marginPageClose,
            (isAuthPage || !user?.isActive) && classes.isAuthMargin,
          )}
        >
          {renderRoute()}
        </div>
      </div>
    </DrawerContext.Provider>
  );
};

Route.defaultProps = {
  header: true,
  privateHeaderProps: {},
  authorizedRole: 'user',
};

export default Route;
