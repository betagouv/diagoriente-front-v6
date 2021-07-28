import React, { FunctionComponent } from 'react';
import MedailleSvg from 'assets/svg/medaille.svg';

type ExperienceRecommended = {
  description?: string;
  signature?: string;
};

type ExperienceProps = {
  title: string;
  date: string;
  activities: { id: string; title: string }[];
  recommended?: ExperienceRecommended;
};

const ExperienceItem: FunctionComponent<ExperienceProps> = ({ title, date, activities, recommended }) => {
  return (
    <div className="flex mb-7">
      <h3 className="text-lena-blue-dark font-bold mr-5">&bull;</h3>
      <div className="flex-grow">
        <h3 className="text-lena-blue-dark font-bold lowercase first-letter:uppercase">{title}</h3>
        <span className="text-lena-blue-dark inline-block mb-3">{date}</span>
        <ul>
          {activities.map((info) => (
            <li key={info.id}>{info.title}</li>
          ))}
        </ul>
        {typeof recommended !== 'undefined' && (
          <div className="bg-lena-yellow-light mt-5 p-5 rounded-md">
            <div className="flex items-center">
              <img src={MedailleSvg} alt="Medaille Svg" />
              <span className="bg-lena-yellow inline-block ml-4 px-3 text-sm py-1 rounded-md bg-opacity-50 font-bold uppercase">
                Expérience recommandée
              </span>
            </div>
            <div className="mt-3">
              <span className="block" style={{ color: '#424242' }}>
                "{recommended.description}"
              </span>
              <span className="block italic mt-2">{recommended.signature}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceItem;
