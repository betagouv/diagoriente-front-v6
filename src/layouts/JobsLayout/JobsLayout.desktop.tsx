import React, { FunctionComponent } from 'react';
import { ReactComponent as TopJobsIcon } from 'assets/svg/picto_top_metiers.svg';
import AppHeader from '../AppLayout/components/AppHeader';

const JobsLayoutForDesktop: FunctionComponent = ({ children }) => {
  return (
    <div className="min-h-screen h-full flex flex-col">
      <AppHeader />
      <div className="flex flex-row flex-1">
        <div className="w-96 bg-lena-lightgray flex flex-col top-0 left-0 relative">
          <div className="flex flex-col justify-between flex-grow">
            <div className="flex flex-col space-y-8 p-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <TopJobsIcon className="w-16 h-16" />
                <div className="text-center text-lena-blue-dark font-bold md:text-md xl:text-xl">Top Métiers</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:relative">{children}</div>
      </div>
    </div>
  );
};

export default JobsLayoutForDesktop;
