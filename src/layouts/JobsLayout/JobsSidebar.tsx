import React, { FunctionComponent } from 'react';
import { ReactComponent as JobsIcon } from 'assets/svg/picto_metiers.svg';

const JobsSidebar: FunctionComponent = () => {
  return (
    <div className="w-80 bg-lena-lightgray flex flex-col top-0 left-0 relative filter drop-shadow-sm z-10">
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-center space-y-4 p-8 border-b border-lena-lightgray2">
            <JobsIcon className="w-16 h-16" />
            <div className="text-center text-lena-blue-dark font-bold md:text-md xl:text-xl">Pistes Métiers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsSidebar;
