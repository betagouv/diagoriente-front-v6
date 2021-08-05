import React, { FunctionComponent } from 'react';
import { ReactComponent as SearchIcon } from 'assets/svg/search_job.svg';
import ImmersionSearchForm from 'containers/ImmersionContainer/components/ImmersionSearchForm';
import AppLayout from '../AppLayout/AppLayout';

const ImmersionLayoutForDesktop: FunctionComponent<{ showSearch: boolean }> = ({ showSearch, children }) => {
  return (
    <AppLayout>
      <div className="flex flex-row flex-1">
        <div className="w-96 bg-lena-lightgray flex flex-col top-0 left-0 relative filter drop-shadow-sm z-10">
          <div className="flex flex-col justify-between flex-grow">
            <div className="flex flex-col space-y-8 p-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <SearchIcon className="w-12 h-12 xl:w-16 xl:h-16" />
                <div className="text-center text-lena-blue-dark font-bold md:text-md xl:text-xl">
                  Recherche immersion
                </div>
              </div>
              {showSearch && (
                <div className="flex flex-col space-y-4">
                  <ImmersionSearchForm />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:relative">{children}</div>
      </div>
    </AppLayout>
  );
};

export default ImmersionLayoutForDesktop;
