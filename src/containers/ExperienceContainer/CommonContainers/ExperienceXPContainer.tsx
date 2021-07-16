import React from 'react';
import { useListSkills } from 'common/requests/skills';
import { useHistory, useLocation } from 'react-router-dom';
import { useDidMount } from 'common/hooks/useLifeCycle';
import { ReactComponent as ExpProSvg } from 'assets/svg/exp_pro_white.svg';
import { ReactComponent as CrossSvg } from 'assets/svg/cross.svg';
import { ReactComponent as EditSvg } from 'assets/svg/edit.svg';
import MedailleSvg from 'assets/svg/medaille.svg';
import { ReactComponent as PlusSvg } from 'assets/svg/plus.svg';
import classNames from 'common/utils/classNames';

import { decodeUri } from 'common/utils/url';

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

const Experience: React.FC<ExperienceProps> = ({ title, startDate, endDate, description, certified }) => (
  <div className="bg-white p-4 rounded-lg mb-2" style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}>
    <div className="flex justify-between items-start mb-2">
      <div className={classNames(certified && 'flex items-center')}>
        {certified && (
          <div className="mr-3">
            <img src={MedailleSvg} style={{ height: 27 }} alt="Medaille Badge" />
          </div>
        )}
        <div>
          <h3 className="text-sm font-bold ">{title}</h3>
          {startDate && <span className="block font-bold text-xs text-lena-blue-dark">{startDate}</span>}
          {endDate && <span className="block font-bold text-xs text-lena-blue-dark">{` - ${endDate}`}</span>}
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
        <div className="uppercase font-bold text-sm inline-block bg-lena-yellow bg-opacity-50 px-2  pt-1 rounded-md">
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

const ExperienceXPProContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const params = decodeUri(location.search);
  const [callSkills, skillsState] = useListSkills();
  useDidMount(() => {
    if (params.type) {
      callSkills({ variables: { domain: params.type } });
    }
  });
  const path = () => {
    let text = '';
    let text2 = '';
    let url = '';
    if (params.type) {
      switch (params.type) {
        case 'professional': {
          text = 'professionnelles';
          text2 = 'professionnelle';
          url = 'professional';
          break;
        }
        case 'personnel': {
          text = 'personnelles';
          text = 'personnelle';
          url = 'personal';
          break;
        }
        case 'voluntary': {
          text = 'bénévolat';
          url = 'voluntary';
          break;
        }
        default: {
          text = 'personnelles';
          text2 = 'personnelle';
          url = 'personal';
          break;
        }
      }
    }
    return {
      text,
      text2,
      url,
    };
  };
  return (
    <div className="min-h-screen h-full flex flex-col">
      <div style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)' }} className="bg-lena-blue-light py-5">
        <div className="container flex justify-between w-full">
          <div className="flex items-center">
            <ExpProSvg />
            <span className="font-bold ml-3 text-lena-blue-dark">Mes expériences {path().text}</span>
          </div>
          <button className="focus:ring-0 focus:outline-none" onClick={() => history.push('/experience')}>
            <CrossSvg fill="#223A7A" />
          </button>
        </div>
      </div>
      <div style={{ background: 'rgb(250,250,250)' }} className="pt-9 flex flex-col justify-start flex-1">
        <div className="container">
          <h2 className="text-sm mb-10">
            Vous pouvez ici modifier les expériences que vous avez renseigné, ou bien ajouter de nouvelles expériences.
          </h2>
          <div className="mt-4">
            {skillsState.data?.skills.data.map((exp) => {
              console.log('exp', exp);
              return (
                <Experience
                  key={exp.id}
                  title={exp.theme.title}
                  startDate={exp.startDate}
                  endDate={exp.endDate}
                  description={exp.activities}
                />
              );
            })}
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => history.push(`/experience/theme/create?type=${path().url}`)}
              className="flex items-center focus:ring-0 focus:outline-none"
            >
              <PlusSvg />{' '}
              <span className="ml-3 text-lena-blue-dark">
                Ajouter une expérience {path().text2 ? path().text2 : path().text}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceXPProContainer;
