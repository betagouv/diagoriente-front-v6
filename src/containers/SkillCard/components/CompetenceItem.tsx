import React, { FunctionComponent } from 'react';

type Props = {
  level: number;
  title: string;
  description: string;
};

const CompetenceItem: FunctionComponent<Props> = ({ level = 1, title, description }) => {
  return (
    <div className="md:flex items-start justify-between mb-4">
      <div>
        <div className="text-lena-blue-dark font-bold">{title}</div>
        <span>{description}</span>
      </div>
      <div className="flex-shrink-0 mb-3 md:mb-0 w-auto md:w-20">
        <div className="flex flex-col items-center">
          <p className="text-lena-blue-dark text-thin text-sm">Niveau</p>
          <div
            className="rounded-full flex items-center text-lena-blue-dark font-bold justify-center"
            style={{ height: 28, width: 28, backgroundColor: '#72D9F1' }}
          >
            {level}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetenceItem;
