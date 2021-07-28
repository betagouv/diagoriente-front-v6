import React, { FunctionComponent } from 'react';
import CompetenceLevel from './CompetenceLevel';

type Props = {
  level: number;
  title: string;
  description: string;
};

const CompetenceItem: FunctionComponent<Props> = ({ level = 1, title, description }) => {
  return (
    <div className="flex flex-row items-start space-x-4 justify-between mb-4">
      <div>
        <div className="text-lena-blue-dark font-bold lowercase first-letter:uppercase">{title}</div>
        <span>{description}</span>
      </div>
      <div className=" md:block">
        <CompetenceLevel level={level} />
      </div>
    </div>
  );
};

export default CompetenceItem;
