import React, { FunctionComponent } from 'react';
import { ReactComponent as TopJobsIcon } from 'assets/svg/picto_top_metiers.svg';

const JobsSidebar: FunctionComponent = () => {
  return (
    <div className="w-96 bg-lena-lightgray flex flex-col top-0 left-0 relative filter drop-shadow-sm z-10">
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex flex-col space-y-8 p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <TopJobsIcon className="w-16 h-16" />
            <div className="text-center text-lena-blue-dark font-bold md:text-md xl:text-xl">Top Métiers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsSidebar;
