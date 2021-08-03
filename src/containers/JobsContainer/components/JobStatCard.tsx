import React, { FunctionComponent, ReactNode } from 'react';

const JobStatCard: FunctionComponent<{ title: String; icon: ReactNode }> = ({ title, icon, children }) => {
  return (
    <div className="flex p-4 rounded-lg space-x-4 bg-lena-lightgray">
      {icon}
      <div className="flex flex-col">
        <div className="text-lena-blue-dark">{title}</div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default JobStatCard;
