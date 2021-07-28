import React, { FunctionComponent } from 'react';
import { ReactComponent as EditSvg } from 'assets/svg/edit.svg';
import { Link } from 'react-router-dom';
import ExperienceItem from './ExperienceItem';

const ExperienceGroup: FunctionComponent<{ icon: any; type: string; title: string; experiences: any[] }> = ({
  icon,
  type,
  title,
  experiences,
}) => {
  return (
    <div>
      <div className="flex flex-row justify-between py-6 px-10">
        <div className="flex flex-row space-x-8 items-center">
          {icon}
          <span className="text-lena-blue-dark font-bold text-lg uppercase">{title}</span>
        </div>
        <Link
          className="flex flex-col justify-center items-center space-y-2"
          to={`/profil/mes-experiences?type=${type}`}
        >
          <EditSvg />
          <span className="text-lena-blue-dark text-sm">Editer</span>
        </Link>
      </div>
      <div className="px-10">
        {experiences &&
          experiences.map((v) => (
            <ExperienceItem
              key={v.id}
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
