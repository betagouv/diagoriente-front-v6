import React, { FunctionComponent } from 'react';
import MedailleSvg from 'assets/svg/medaille.svg';
import { ReactComponent as EditSvg } from 'assets/svg/edit.svg';

type ExperienceProps = {
  id?: string;
  title: string;
  startDate?: string;
  endDate?: string;
  description: {
    id: string;
    title: string;
  }[];
  certified?: {
    message: string;
    signature: string;
  };
};

const CardExperience: FunctionComponent<ExperienceProps> = ({ title, startDate, endDate, description, certified }) => (
  <div className="bg-white p-4 rounded-lg mb-2 shadow-md">
    <div className="flex justify-between items-start mb-4 space-x-4">
      <div className="flex flex-row items-center space-x-4">
        {certified && <img src={MedailleSvg} className="h-8 w-8" alt="Medaille Badge" />}
        <div>
          <h3 className="text-sm font-bold">{title}</h3>
          {startDate && <span className="font-bold text-xs text-lena-blue-dark">{startDate}</span>}
          {endDate && <span className="font-bold text-xs text-lena-blue-dark">{` - ${endDate}`}</span>}
        </div>
      </div>
      <button>
        <EditSvg />
      </button>
    </div>
    {description && (
      <ul>
        {description.map((d) => (
          <li className="text-sm" key={d.id}>
            {d.title}
          </li>
        ))}
      </ul>
    )}
    {certified && (
      <div className="bg-lena-yellow-light mt-2 px-5 py-4 rounded-lg">
        <div
          className={`uppercase font-bold text-sm inline-block
        bg-lena-yellow bg-opacity-50 px-2 pt-1 rounded-md uppercase`}
        >
          Expérience recommandée
        </div>
        <p className="mt-2 text-sm" style={{ color: '#424242' }}>
          {certified.message}
        </p>
        <p className="text-sm mt-2">{certified.signature}</p>
      </div>
    )}
  </div>
);

export default CardExperience;
