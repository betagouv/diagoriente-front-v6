import React, { FunctionComponent } from 'react';
import DetailJobImg from 'assets/illu/topjob.svg';

const JobHeader: FunctionComponent = () => {
  return (
    <div className="min-h-44 flex items-center justify-center bg-lena-blue border-b-4 border-lena-yellow-dark">
      <div className="flex-1 text-center py-8">
        <h2 className="font-bold text-white text-2xl">Technicien/ne démonstrateur/trice en matériel agricole</h2>
      </div>
    </div>
  );
};

export default JobHeader;
