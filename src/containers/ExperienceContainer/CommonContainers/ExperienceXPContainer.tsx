import React from 'react';
import { useListSkills } from 'common/requests/skills';
import { useHistory, useLocation } from 'react-router-dom';
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
  date: string;
  description: {
    id: string;
    content: string;
  }[];
  certified?: {
    message: string;
    signature: string;
  };
};

const Experience: React.FC<ExperienceProps> = ({ title, date, description, certified }) => (
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
          <span className="block font-bold text-xs text-lena-blue-dark">{date}</span>
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
            {d.content}
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
  const experiences: ExperienceProps[] = [
    {
      id: 'a',
      title: 'Graphisme multimédia',
      date: 'Avril 20 - Mai 21',
      description: [
        {
          id: 'aa',
          content: "J'analyse les besoins du client",
        },
        {
          id: 'bb',
          content: 'Je traite les images numériques (colorimétrie, recadrage...)',
        },
        {
          id: 'cc',
          content: 'Je modélise des éléments graphique',
        },
      ],
    },
    {
      id: 'a',
      title: 'Programmation',
      date: 'Dec 19 - Mai 20',
      description: [
        {
          id: 'aa',
          content: "J'écris les notices techniques d'installation",
        },
        {
          id: 'bb',
          content: 'Je code des logiciels (ou parties de logiciels)',
        },
      ],
      certified: {
        message: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam neque ac laoreet lobortis.”',
        signature: 'Maurice Michon, Pâtissier à Saint Quentin en Yvelines (91), le 12/01/20',
      },
    },
  ];
  const path = () => {
    let text = '';
    let url = '';
    if (params.type) {
      switch (params.type) {
        case 'professional': {
          text = 'professionnelles';
          url = 'professional';
          break;
        }
        case 'personnel': {
          text = 'personnel';
          url = 'personal';
          break;
        }
        case 'voluntary': {
          text = 'bénévolat';
          url = 'voluntary';
          break;
        }
        default: {
          text = 'personnel';
          url = 'personal';
          break;
        }
      }
    }
    return {
      text,
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
            {experiences.map((exp) => (
              <Experience
                key={exp.id}
                title={exp.title}
                date={exp.date}
                description={exp.description}
                certified={exp.certified}
              />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => history.push(`/experience/theme/create?type=${path().url}`)}
              className="flex items-center focus:ring-0 focus:outline-none"
            >
              <PlusSvg /> <span className="ml-3 text-lena-blue-dark">Ajouter une expérience {path().text}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceXPProContainer;
