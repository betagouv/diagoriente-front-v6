import React from 'react';
import PeintureImg from 'assets/illu/topjob.svg';
import JobsLayout from 'layouts/JobsLayout/JobsLayout';
import { CardJob } from './TopJobContainer';

const SearchResults = () => {
  return (
    <JobsLayout>
      <div className="container my-8 text-lena-blue-dark text-center text-lg">
        <strong>TODO</strong> métiers correspondent à votre recherche
      </div>
      <div className="flex-1" style={{ background: `url(${PeintureImg}) no-repeat fixed`, backgroundSize: 'cover' }}>
        <div className="flex flex-1 p-4 2xl:p-8 grid lg:grid-cols-2 xl:grid-cols-4 gap-2">
          <CardJob />
          <CardJob />
          <CardJob />
          <CardJob />
          <CardJob />
          <CardJob />
          <CardJob />
          <CardJob />
          <CardJob />
          <CardJob />
        </div>
      </div>
    </JobsLayout>
  );
};

export default SearchResults;
