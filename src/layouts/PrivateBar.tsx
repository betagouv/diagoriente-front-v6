import React, { useContext } from 'react';
import userContext from 'common/contexts/UserContext';
import { useHistory } from 'react-router-dom';
import { ReactComponent as SettingsSvg } from '../assets/svg/settings.svg';

const PrivateBarLayout = () => {
  const { user } = useContext(userContext);
  const history = useHistory();
  return (
    <div style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)' }} className="bg-lena-blue-dark py-5">
      <div className="container flex items-center justify-between">
        <span className="uppercase font-bold text-white text-xl">
          {user?.lastName} {user?.firstName}
        </span>
        <button className="focus:outline-none focus:ring-0" onClick={() => history.push('/profil/reglages')}>
          <SettingsSvg fill="#fff" height={25} />
        </button>
      </div>
    </div>
  );
};

export default PrivateBarLayout;
