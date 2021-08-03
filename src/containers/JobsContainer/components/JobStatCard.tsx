import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'common/utils/classNames';

const JobStatCard: FunctionComponent<{ title: String; icon: ReactNode }> = ({ title, icon, children }) => {
  return (
    <div
      className={classNames(
        'flex p-4 rounded-lg bg-lena-lightgray space-x-4',
        'md:flex-col md:space-y-4 md:space-x-0 items-center',
        'lg:flex-row lg:space-x-4 lg:space-y-0 lg:items-start',
      )}
    >
      <div>{icon}</div>
      <div className="flex flex-col">
        <div className="text-lena-blue-dark">{title}</div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default JobStatCard;
