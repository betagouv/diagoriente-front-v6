import React, { FunctionComponent } from 'react';
import DetailJobImg from 'assets/illu/topjob.svg';

const JobHeader: FunctionComponent = () => {
  return (
    <div style={{ background: `url(${DetailJobImg}) no-repeat fixed`, backgroundSize: 'cover' }}>
      <div className="container text-center py-8">
        <h2 className="font-bold text-white text-xl">Technicien/ne démonstrateur/trice en matériel agricole</h2>
      </div>
    </div>
  );
};

export default JobHeader;
