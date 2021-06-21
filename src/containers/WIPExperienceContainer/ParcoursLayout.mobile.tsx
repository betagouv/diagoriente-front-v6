import React, { FunctionComponent } from 'react';
import { ReactComponent as UserProfileIcon } from 'assets/svg/user_profile.svg';
import ProgressBar from 'components/design-system/ProgressBar';

const ParcoursLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="min-h-screen md:min-h-0 h-full flex flex-col">
      <div className="sticky top-0 shadow-md">
        <ProgressBar value={20} />
        <div className="p-2 bg-lena-lightgray flex flex-row items-center justify-between">
          <div>[!!WIP!!] Breadcrumb EXP...</div>
          <UserProfileIcon />
        </div>
      </div>
      <div className="flex flex-col items-center justify-start flex-1">{children}</div>
    </div>
  );
};

export default ParcoursLayout;
