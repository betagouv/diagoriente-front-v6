import React, { FunctionComponent } from 'react';
import { ReactComponent as UserProfileIcon } from 'assets/svg/user_profile.svg';
import ProgressBar from 'components/design-system/ProgressBar';

const ParcoursLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="min-h-screen h-full flex flex-col">
      <ProgressBar value={20} />
      <div className="p-2 bg-lena-lightgray flex flex-row items-center justify-between">
        <div>[!!WIP!!] Breadcrumb EXP...</div>
        <UserProfileIcon />
      </div>
      <div className="container flex flex-col items-center justify-start pt-16 flex-1">{children}</div>
    </div>
  );
};

export default ParcoursLayout;
