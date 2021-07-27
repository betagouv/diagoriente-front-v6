import React, { FunctionComponent } from 'react';

const CompetenceLevel: FunctionComponent<{ level: number }> = ({ level }) => {
  return (
    <div className="flex-shrink-0 mb-3 md:mb-0 w-auto md:w-20">
      <div className="flex flex-col space-x-2 items-center">
        <p className="text-lena-blue-dark text-thin text-sm">Niveau</p>
        <div
          className="rounded-full flex items-center text-lena-blue-dark font-bold justify-center"
          style={{ height: 28, width: 28, backgroundColor: '#72D9F1' }}
        >
          {level}
        </div>
      </div>
    </div>
  );
};

export default CompetenceLevel;
