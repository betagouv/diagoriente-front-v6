import React, { FunctionComponent } from 'react';
import { ReactComponent as SearchTitleSvg } from 'assets/svg/picto_metiers.svg';
import { ReactComponent as CrossIcon } from 'assets/svg/cross3.svg';
import { useHistory } from 'react-router-dom';
import JobSearchForm from '../components/JobSearchForm';

const Search: FunctionComponent = () => {
  const history = useHistory();

  return (
    <div className="bg-lena-lightgray h-screen p-4 flex flex-col justify-between">
      <div className="space-y-8">
        <div className="flex items-center justify-end text-right">
          <CrossIcon className="fill-current text-lena-blue-dark" onClick={() => history.goBack()} />
        </div>
        <div className="flex flex-col justify-center items-center space-y-4">
          <SearchTitleSvg />
          <div className="text-lena-blue-dark text-lg font-bold">Rechercher un métier</div>
        </div>
        <JobSearchForm />
      </div>
    </div>
  );
};

export default Search;
