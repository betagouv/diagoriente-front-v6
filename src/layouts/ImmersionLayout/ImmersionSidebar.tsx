import React, { FunctionComponent } from 'react';
import ImmersionSearchForm from 'containers/ImmersionContainer/components/ImmersionSearchForm';
import { ReactComponent as SearchIcon } from 'assets/svg/search_job.svg';

const ImmersionSidebar: FunctionComponent<{ showSearch: boolean }> = ({ showSearch }) => {
  return (
    <div className="w-80 bg-lena-lightgray flex flex-col overflow-auto filter drop-shadow-sm z-10 scroll-thin">
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-center space-y-4 p-8 border-b border-lena-lightgray2">
            <SearchIcon className="w-12 h-12 xl:w-16 xl:h-16" />
            <div className="text-center text-lena-blue-dark font-bold md:text-md xl:text-xl">Engagements</div>
          </div>
          {showSearch && (
            <div className="flex flex-col">
              <ImmersionSearchForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImmersionSidebar;
