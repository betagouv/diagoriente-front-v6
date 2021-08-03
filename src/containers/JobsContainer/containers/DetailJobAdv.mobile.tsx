import React, { FunctionComponent } from 'react';
import JobsLayout from 'layouts/JobsLayout/JobsLayout';
import JobHeader from '../components/JobHeader';
import JobStatistics from '../components/JobStatistics';

const DetailJobAdvForMobile: FunctionComponent = () => {
  return (
    <JobsLayout mobileHeaderMode="back">
      <JobHeader />
      <JobStatistics />
    </JobsLayout>
  );
};

export default DetailJobAdvForMobile;
