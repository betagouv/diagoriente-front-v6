import React, { FunctionComponent } from 'react';
import BagSvg from 'assets/svg/bag.svg';
import ExperienceItem from './ExperienceItem';

const ExperienceGroup: FunctionComponent<{ icon: any; title: string; experiences: any[] }> = ({
  icon,
  title,
  experiences,
}) => {
  return (
    <div>
      <div className="flex flex-row space-x-8 items-center mb-8 px-10">
        {icon}
        <span className="text-lena-blue-dark font-bold text-lg uppercase">{title}</span>
      </div>
      <div className="px-10">
        {experiences &&
          experiences.map((v) => (
            <ExperienceItem
              title={v.theme.title}
              date={v.startDate}
              activities={v.activities.map((a: any) => ({ id: a.id, title: a.title }))}
            />
          ))}
      </div>
    </div>
  );
};

export default ExperienceGroup;
