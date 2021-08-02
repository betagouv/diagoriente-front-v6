import React, { FunctionComponent, ReactElement, ReactNode, useContext, useRef, useState } from 'react';
import IconProfile, { ReactComponent as UserProfileIcon } from '../assets/svg/user_profile.svg';
import useOnClickOutside from '../common/hooks/useOnclickOutside';
import UserContext from '../common/contexts/UserContext';
import { AppUserMenu } from './AppUserMenu';

const MobileHeaderGeneric: FunctionComponent<{ left?: ReactNode; center?: ReactElement }> = ({ left, center }) => {
  const { user } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef: any = useRef();

  useOnClickOutside(menuRef, () => {
    if (showMenu) setShowMenu(false);
  });

  return (
    <div className="sticky top-0 shadow-md z-50">
      <div className="p-2 bg-lena-lightgray flex flex-row items-center justify-between">
        <div>{!!left && left}</div>
        <div>{!!center && center}</div>
        <div>
          {user && (
            <button onClick={() => setShowMenu(!showMenu)} className="focus:ring-0 focus:outline-none">
              <img src={IconProfile} width={32} height={32} alt="Profil utilisateur" />
            </button>
          )}
        </div>
      </div>
      {showMenu && <AppUserMenu ref={menuRef} />}
    </div>
  );
};

export default MobileHeaderGeneric;
