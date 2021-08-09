import React, { FunctionComponent } from 'react';
import { ReactComponent as JobsIcon } from 'assets/svg/picto_metiers.svg';
import { Link } from 'react-router-dom';
import JobSearchForm from 'containers/JobsContainer/components/JobSearchForm';

const JobsSidebar: FunctionComponent = () => {
  return (
    <div className="w-80 bg-lena-lightgray flex flex-col top-0 left-0 relative filter drop-shadow-sm scroll-thin z-10">
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-center space-y-4 p-8 border-b border-lena-lightgray2">
            <JobsIcon className="w-16 h-16" />
            <div className="text-center text-lena-blue-dark font-bold md:text-md xl:text-xl">Pistes Métiers</div>
          </div>
          <div className="flex flex-col divide-y divide-lena-lightgray2">
            <Link className="p-4 font-bold text-lena-blue-dark" to="/metiers/mon-top-metiers">
              Mon top métiers
            </Link>
            <div className="p-4">
              <JobSearchForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsSidebar;
