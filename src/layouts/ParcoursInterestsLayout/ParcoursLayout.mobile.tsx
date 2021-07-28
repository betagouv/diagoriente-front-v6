import React, { FunctionComponent } from 'react';
import { ReactComponent as UserProfileIcon } from 'assets/svg/user_profile.svg';
import classNames from 'common/utils/classNames';

const ParcoursInterestsLayoutForMobile: FunctionComponent = ({ children }) => {
  return (
    <div className="min-h-screen h-full flex flex-col">
      <div className="sticky top-0 shadow-md z-50">
        <div className="p-2 bg-lena-lightgray flex flex-row items-center justify-between">
          <div className="text-lena-blue-dark font-bold uppercase">Centres d'intérêts</div>
          <UserProfileIcon />
        </div>
      </div>
      <div className={classNames('flex flex-col items-center justify-start flex-1')}>{children}</div>
    </div>
  );
};

export default ParcoursInterestsLayoutForMobile;
