import React, { FunctionComponent } from 'react';
import DetailJobImg from 'assets/illu/topjob.svg';

const JobHeader: FunctionComponent = () => {
  return (
    <div
      className="min-h-44 flex items-center justify-center "
      style={{ background: `url(${DetailJobImg}) no-repeat fixed`, backgroundSize: 'cover' }}
    >
      <div className="flex-1 text-center py-8">
        <h2 className="font-bold text-white text-xl">Technicien/ne démonstrateur/trice en matériel agricole</h2>
      </div>
    </div>
  );
};

export default JobHeader;
