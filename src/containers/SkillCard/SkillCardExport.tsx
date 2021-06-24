import React from 'react';
import clsx from 'clsx';
import Checkbox from '../../components/Register/Checkbox';
import Star from '../../components/design-system/Star';

type SkillProps = {
  star: number;
  checked?: boolean;
  title: string;
  description: string;
  opacity?: boolean;
  bottom?: boolean;
};

const Skill: React.FC<SkillProps> = ({ star, checked, title, description, opacity = false, bottom = false }) => {
  return (
    <div className={clsx('bg-white px-10 py-3 rounded-md', bottom && 'mb-2', opacity && 'opacity-50')}>
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

const SkillCardExport = () => {
  return (
    <div>
      <nav className="mb-6" style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
        <div className="flex justify-between container py-6">
          <span className="font-bold">Sélectionnez ce qui sera visible sur votre carte de compétences :</span>
          <button className="text-lena-pink-dark">Fermer</button>
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
              <Skill star={4} title="Agir collectivement" description="Je fais des propositions au groupe, j'écoute et prends en compte l'avis de chacun, exprime des avis contraires." opacity={false} bottom={true} />
              <Skill star={4} title="Organiser son activité" description="Je m’organise en fonction d'imprévus, je prends quelques initiatives." />
            </div>
            <div
              className={clsx('mt-3 bg-lena-turquoise-light p-6 rounded-lg', false && 'opacity-50')}
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="flex items-center ml-10 mb-5">
                <Checkbox label="" />
                <h5 className="ml-2 text-lena-blue-dark uppercase font-bold text-lg">Mes compétences d'engagement</h5>
              </div>
              <Skill star={4} title="Prendre en compte les codes sociaux dans l’activité" description="Je fais des propositions au groupe, j'écoute et prends en compte l'avis de chacun, exprime des avis contraires." opacity={false} bottom={true} />
              <Skill star={4} title="Prendre en compte les règlements dans le cadre de sa mission" description="Je m’organise en fonction d'imprévus, je prends quelques initiatives." />
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
              <Skill star={4} title="Agir collectivement" description="Je fais des propositions au groupe, j'écoute et prends en compte l'avis de chacun, exprime des avis contraires." opacity={false} bottom={true} />
              <Skill star={4} title="Organiser son activité" description="Je m’organise en fonction d'imprévus, je prends quelques initiatives." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCardExport;
