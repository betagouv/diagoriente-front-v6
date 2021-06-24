import React, { useEffect } from 'react';
import clsx from 'clsx';
import Checkbox from 'components/Register/Checkbox';
import Star from 'components/design-system/Star';
import MedailleSvg from 'assets/svg/medaille.svg';
import CloseSvg from 'assets/svg/cross2.svg';
import ModalExportSvg from 'assets/svg/export_red.svg';

type SkillProps = {
  star: number;
  checked?: boolean;
  title: string;
  description: string;
  bottom?: boolean;
};

const Skill: React.FC<SkillProps> = ({ star, checked, title, description, bottom = false }) => {
  return (
    <div className={clsx('bg-white px-10 py-3 rounded-md', bottom && 'mb-2', !checked && 'opacity-50')}>
      <div className="mb-4 flex items-start">
        <div className="mt-5 mr-2">
          <Checkbox label="" checked={checked} />
        </div>
        <div>
          <div>
            <Star star={star} />
          </div>
          <div className="text-lena-blue-dark font-bold text-lg mt-2">{title}</div>
          <span className="mt-1 inline-block">{description}</span>
        </div>
      </div>
    </div>
  );
};

type ExperienceRecommended = {
  checked?: boolean;
  description?: string;
  signature?: string;
};

type ExperienceProps = {
  checked?: boolean;
  title: string;
  date: string;
  exp: Array<string>;
  recommended?: ExperienceRecommended;
};

const Experience: React.FC<ExperienceProps> = ({ checked, title, date, exp, recommended }) => {
  return (
    <div
      className={clsx(
        'flex mb-7 bg-white p-5 rounded-md',
        !recommended?.checked && !checked ? 'opacity-50' : !checked && !recommended?.checked && 'opacity-50',
      )}
    >
      <h3 className="text-lena-blue-dark font-bold mr-2">
        <Checkbox checked={recommended?.checked ? true : checked} label="" />
      </h3>
      <div className="flex-grow">
        <h3 className="text-lena-blue-dark font-bold">{title}</h3>
        <span className="text-lena-blue-dark inline-block mb-3">{date}</span>
        <ul>
          {exp.map((info) => (
            <li>{info}</li>
          ))}
        </ul>
        {typeof recommended !== 'undefined' && (
          <div className={clsx('flex mt-5', !recommended?.checked && 'opacity-50')}>
            <Checkbox checked={recommended.checked} label="" />
            <div className="bg-lena-yellow-light p-5 rounded-md">
              <div className="flex items-center">
                <img src={MedailleSvg} alt="Medaille Svg" />
                <span className="bg-lena-yellow inline-block ml-4 px-3 text-sm py-1 rounded-md bg-opacity-50 font-bold">
                  EXPÉRIENCE RECOMMANDÉE
                </span>
              </div>
              <div className="mt-3">
                <span className="block" style={{ color: '#424242' }}>
                  "{recommended.description}"
                </span>
                <span className="block italic mt-2">{recommended.signature}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

type SkillCardExportProps = {
  onClose: () => void;
};

const SkillCardExport = ({ onClose }: SkillCardExportProps) => {
  useEffect(() => {
    document.body.style.backgroundColor = '#E5E5E5';
    document.body.style.overflow = 'auto';
  }, [document]);
  return (
    <div className="mb-32 overflow-auto">
      <nav className="mb-6" style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
        <div className="flex justify-between container py-6">
          <span className="font-bold">Sélectionnez ce qui sera visible sur votre carte de compétences :</span>
          <button
            onClick={() => onClose.call(null)}
            className="text-lena-pink-dark flex items-center focus:ring-0 focus:outline-none"
          >
            Fermer <img className="ml-3" src={CloseSvg} alt="Cross Icon" />
          </button>
        </div>
      </nav>
      <div className="container">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2
              style={{ fontSize: 22 }}
              className="bg-lena-blue-dark uppercase py-4 text-white text-center font-bold text-xl rounded-lg"
            >
              Mes compétences
            </h2>
            <div
              className={clsx('mt-3 bg-lena-turquoise-light p-6 rounded-lg', false && 'opacity-50')}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="flex items-center ml-10 mb-5">
                <Checkbox label="" />
                <h5 className="ml-2 text-lena-blue-dark uppercase font-bold text-lg">Mes compétences transversales</h5>
              </div>
              <Skill
                star={4}
                title="Agir collectivement"
                description="Je fais des propositions au groupe, j'écoute et prends en compte l'avis de chacun, exprime des avis contraires."
                bottom={true}
              />
              <Skill
                star={4}
                title="Organiser son activité"
                description="Je m’organise en fonction d'imprévus, je prends quelques initiatives."
              />
            </div>
            <div
              className={clsx('mt-3 bg-lena-turquoise-light p-6 rounded-lg', false && 'opacity-50')}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="flex items-center ml-10 mb-5">
                <Checkbox label="" />
                <h5 className="ml-2 text-lena-blue-dark uppercase font-bold text-lg">Mes compétences d'engagement</h5>
              </div>
              <Skill
                star={4}
                title="Prendre en compte les codes sociaux dans l’activité"
                description="Je fais des propositions au groupe, j'écoute et prends en compte l'avis de chacun, exprime des avis contraires."
                bottom={true}
              />
              <Skill
                star={4}
                title="Prendre en compte les règlements dans le cadre de sa mission"
                description="Je m’organise en fonction d'imprévus, je prends quelques initiatives."
              />
            </div>
          </div>
          <div>
            <h2
              style={{ fontSize: 22 }}
              className="bg-lena-blue-dark uppercase py-4 text-white text-center font-bold text-xl rounded-lg"
            >
              Mes expériences
            </h2>
            <div
              className={clsx('mt-3 bg-lena-blue-lightest p-6 rounded-lg', false && 'opacity-50')}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="flex items-center ml-10 mb-5">
                <Checkbox label="" />
                <h5 className="ml-2 text-lena-blue-dark uppercase font-bold text-lg">Mes expériences pro</h5>
              </div>
              <Experience
                title="Graphisme multimédia"
                date="Depuis Avril 2020"
                exp={[
                  "J'analyse les besoins du client",
                  'Je traite des images numériques (colorimétrie, recadrage...)',
                  'Je modélise des éléments graphique',
                ]}
              />
              <Experience
                checked={true}
                title="Programmation"
                date="Avril 2020 - Mai 2021"
                exp={[
                  "J'écris les notices techniques d'installation",
                  'Je code des logiciels (ou parties de logiciels)',
                ]}
                recommended={{
                  checked: false,
                  description:
                    '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam neque ac laoreet lobortis.”',
                  signature: 'Maurice Michon, Pâtissier à Saint Quentin en Yvelines (91), le 12/01/20',
                }}
              />
            </div>
            <div
              className={clsx('mt-3 bg-lena-blue-lightest p-6 rounded-lg', false && 'opacity-50')}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="flex items-center ml-10 mb-5">
                <Checkbox label="" />
                <h5 className="ml-2 text-lena-blue-dark uppercase font-bold text-lg">Mes expériences persos</h5>
              </div>
              <Experience
                title="Lecture"
                date="Depuis Avril 2020"
                exp={[
                  "J'analyse les besoins du client",
                  'Je traite des images numériques (colorimétrie, recadrage...)',
                  'Je modélise des éléments graphique',
                ]}
              />
              <Experience
                checked={true}
                title="Programmation"
                date="Avril 2020 - Mai 2021"
                exp={[
                  "J'écris les notices techniques d'installation",
                  'Je code des logiciels (ou parties de logiciels)',
                ]}
                recommended={{
                  checked: false,
                  description:
                    '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam neque ac laoreet lobortis.”',
                  signature: 'Maurice Michon, Pâtissier à Saint Quentin en Yvelines (91), le 12/01/20',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 py-7 bg-lena-pink-dark flex justify-center">
        <button className="text-lena-pink-dark bg-white items-center flex px-14 py-2 rounded-md">
          <img className="mr-2" alt="Export Icon" src={ModalExportSvg} />
          Exporter
        </button>
      </div>
    </div>
  );
};

export default SkillCardExport;
