import React, { useContext, useState } from 'react';
import UserContext from 'common/contexts/UserContext';
import DrawerContext from 'common/contexts/DrawerContext';
import { encodeUri } from 'common/utils/url';
import { Route as BaseRoute, Redirect, RouteProps as BaseRouteProps, useLocation } from 'react-router-dom';
import classNames from 'common/utils/classNames';
import classes from './styles.module.scss';

export interface RouteProps extends BaseRouteProps {
  protected?: boolean;
  authorizedRole?: 'user' | 'admin' | 'advisor';
}

const Route = ({ protected: protectedProp, authorizedRole, ...rest }: RouteProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user } = useContext(UserContext);
  const isAuthPage = location.pathname === '/connexion' || location.pathname === '/inscription';

  if (protectedProp) {
    if (!user && authorizedRole === 'user') {
      return <Redirect to={`/connexion${encodeUri({ from: window.location.pathname + window.location.search })}`} />;
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
      return <Redirect to="/404" />;
    }
    if ((!user || user.role === 'user') && authorizedRole === 'advisor') {
      return <Redirect to="/404" />;
    }

    return <BaseRoute {...rest} />;
  }

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      <div className={classNames(classes.row)}>
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
