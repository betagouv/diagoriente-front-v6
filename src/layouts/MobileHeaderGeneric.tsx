import React, { FunctionComponent, ReactElement, ReactNode, useContext, useState } from 'react';
import { ReactComponent as BurgerMenuSvg } from 'assets/svg/menu_mobile_burger.svg';
import UserContext from '../common/contexts/UserContext';
import { AppUserMenu } from './AppUserMenu';
import AppDrawer from './AppDrawer';

const MobileHeaderGeneric: FunctionComponent<{ left?: ReactNode; center?: ReactElement }> = ({ left, center }) => {
  const { user } = useContext(UserContext);
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div className="sticky top-0 shadow-md z-50 h-14">
      <div className="py-2 px-4 bg-lena-lightgray flex flex-row items-center justify-between h-full">
        <div>
          <BurgerMenuSvg onClick={() => setShowDrawer(!showDrawer)} />
        </div>
        <div className="font-bold text-lena-blue-dark">{document.title}</div>
        {user && <AppUserMenu />}
      </div>
      <AppDrawer open={showDrawer} onClose={() => setShowDrawer(false)} />
    </div>
  );
};

export default MobileHeaderGeneric;
