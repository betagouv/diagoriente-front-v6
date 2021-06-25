import React, { FunctionComponent, useEffect, useState } from 'react';
import MenuSkillSvg from 'assets/svg/menu_skill.svg';
import ExportSvg from 'assets/svg/export.svg';
import IlluSkillSvg from 'assets/illu/skill.svg';
import HelpSvg from 'assets/images/svg/picto/onboarding_help.svg';
import BrainSvg from 'assets/svg/brain.svg';
import LoveSvg from 'assets/svg/love.svg';
import BagSvg from 'assets/svg/bag.svg';
import MedailleSvg from 'assets/svg/medaille.svg';
import ExpPersoSvg from 'assets/svg/exp_perso.svg';
import EditSvg from 'assets/svg/edit.svg';
import ExportModalSvg from 'assets/svg/modal_export.svg';
import Button from 'components/design-system/Button';
import Star from 'components/design-system/Star';
import ModalComponent from '../../components/design-system/Modal';
import SkillCardExport from './SkillCardExport';
import useMediaQuery from '../../hooks/useMediaQuery';

type SkillProps = {
  star: number;
  title: string;
  description: string;
};

const Skill = ({ star = 1, title, description }: SkillProps) => {
  return (
    <div className="md:flex items-start mb-4">
      <div className="flex-shrink-0 mb-3 md:mb-0 w-auto md:w-20">
        <Star star={star} />
      </div>
      <div className="-mt-1">
        <h3 className="text-lena-blue-dark font-bold">{title}</h3>
        <span>{description}</span>
      </div>
    </div>
  );
};

type ExperienceRecommended = {
  description?: string;
  signature?: string;
};

type ExperienceProps = {
  title: string;
  date: string;
  exp: Array<string>;
  recommended?: ExperienceRecommended;
};

const Experience: React.FC<ExperienceProps> = ({ title, date, exp, recommended }) => {
  return (
    <div className="flex mb-7">
      <h3 className="text-lena-blue-dark font-bold mr-5">&bull;</h3>
      <div className="flex-grow">
        <h3 className="text-lena-blue-dark font-bold">{title}</h3>
        <span className="text-lena-blue-dark inline-block mb-3">{date}</span>
        <ul>
          {exp.map((info) => (
            <li>{info}</li>
          ))}
        </ul>
        {typeof recommended !== 'undefined' && (
          <div className="bg-lena-yellow-light mt-5 p-5 rounded-md">
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
        )}
      </div>
    </div>
  );
};

type ModalExportProps = {
  open: boolean;
  onClose: () => void;
  onSelect: () => void;
};

const ModalExport = ({ open, onClose, onSelect }: ModalExportProps) => {
  return (
    <ModalComponent onClose={() => onClose.call(null)} open={open}>
      <div className="flex flex-col justify-center items-center py-10">
        <img className="mb-6" src={ExportModalSvg} alt="Export Icon" />
        <h2 className="text-lena-pink-dark font-bold uppercase text-xl text-center">
          Exporter ma carte de compétences
        </h2>
        <div className="md:w-1/2 text-center mt-5 text-sm">
          Vous allez exporter votre carte de compétences.
          <br />
          Vous pouvez sélectionner les expériences et compétences que vous voulez voir apparaître, ou bien l’exporter
          dans sa totalité.
        </div>
        <div className="mt-10 fle">
          <Button variant="primary">Exporter la carte complète</Button>
        </div>
        <div className="py-4">ou</div>
        <button
          onClick={() => {
            onSelect.call(null);
            onClose.call(null);
          }}
          className="text-lena-pink-dark text-sm underline cursor-pointer"
        >
          Exporter une sélection
        </button>
      </div>
    </ModalComponent>
  );
};

const SkillCardContainer: FunctionComponent = () => {
  const [showModalExport, setShowModalExport] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [showHelpComp, setShowHelpComp] = useState(false);
  const mediaQueryMD = useMediaQuery('md');

  useEffect(() => {
    document.body.style.backgroundColor = mediaQueryMD ? '#E5E5E5' : 'rgba(34, 58, 122)';
    document.body.style.overflow = 'auto';
  }, [document, mediaQueryMD]);

  return showSelector ? (
    <SkillCardExport onClose={() => setShowSelector(false)} />
  ) : (
    <div className="pb-10 mb-10">
      {mediaQueryMD ? (
        <div className="bg-lena-blue-dark pt-5 px-10 flex space-x-24 space-y-5">
          <div>
            <button
              className="
              bg-white p-2 rounded-full flex items-center justify-center cursor-pointer focus:ring-0 focus:outline-none"
              style={{ height: 45, width: 45 }}
            >
              <img src={MenuSkillSvg} alt="Menu Icon" style={{ height: 25, width: 25 }} />
            </button>
          </div>
          <div className="flex justify-around flex-grow">
            <div className="md:w-96 pt-10">
              <h2 className="text-white uppercase font-bold text-2xl mb-3">Ma carte de compétences</h2>
              <span className="text-white inline-block mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem consectetur ipsum dolor sit amet, con.
              </span>
              <Button onClick={() => setShowModalExport(true)} variant="primary">
                <div className="flex items-center px-10">
                  <img className="mr-3" src={ExportSvg} alt="Export Icon" />
                  Exporter
                </div>
              </Button>
            </div>
            <div>
              <img src={IlluSkillSvg} alt="Illustration" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center flex-col items-center mt-10">
          <img className="mb-5" style={{ width: '60%' }} src={IlluSkillSvg} alt="Illustration" />
          <h2 style={{ fontSize: 22 }} className="font-bold uppercase text-white text-center">
            Ma carte <br />
            de compétences
          </h2>
        </div>
      )}

      <div className="container mt-10">
        <div className="grid md:grid-cols-2 auto-cols-max gap-4">
          <div style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }} className="rounded-md bg-white">
            <div className="bg-lena-turquoise-light rounded-t-md py-3 pl-9 pr-5 flex items-center justify-between">
              <h3 className="text-lena-blue-dark uppercase font-bold" style={{ fontSize: 22 }}>
                Mes compétences
              </h3>
              <button onClick={() => setShowHelpComp(true)}>
                <img src={HelpSvg} alt="Help Icon" />
              </button>
            </div>
            <div className="py-7 bg-white rounded-b-md">
              <div className="flex items-center mb-7 px-8">
                <img className="mr-5" src={BrainSvg} alt="Brain Icon" />
                <span className="text-lena-blue-dark font-bold mt-2 text-lg">MES COMPÉTENCES TRANSVERSALES</span>
              </div>
              <div className="px-8">
                <Skill
                  star={1}
                  title="Agir collectivement"
                  description="Je fais des propositions au groupe, j'écoute et prends en compte l'avis de chacun, exprime des avis contraires."
                />
                <Skill
                  star={2}
                  title="Organiser son activité"
                  description="Je m’organise en fonction d'imprévus, je prends quelques initiatives."
                />
                <Skill
                  star={3}
                  title="Utiliser les mathématiques"
                  description="J'applique toutes les consignes et procédures en autonomie au travail, dans les activités manuelles... et j'identifie les risques de non respect"
                />
                <Skill
                  star={4}
                  title="Organiser son activité"
                  description="Je fais des opérations et des mesures pour des petits travaux, des dosages pour des produits..."
                />
              </div>
              <div className="bg-lena-lightgray mt-6 mb-6" style={{ height: 1 }} />
              <div className="flex items-center mb-7 px-8">
                <img className="mr-5" src={LoveSvg} alt="Brain Icon" />
                <span className="text-lena-blue-dark font-bold mt-2 text-lg">MES COMPÉTENCES D’ENGAGEMENT</span>
              </div>
              <div className="px-8">
                <Skill
                  star={1}
                  title="Prendre en compte les codes sociaux dans l’activité"
                  description="Je fais des propositions au groupe, j'écoute et prends en compte l'avis de chacun, exprime des avis contraires."
                />
                <Skill
                  star={2}
                  title="Prendre en compte les règlements dans le cadre de sa mission"
                  description="Je m’organise en fonction d'imprévus, je prends quelques initiatives."
                />
                <Skill
                  star={3}
                  title="Agir collectivement"
                  description="J’explique mes manières de communiquer suivant les enjeux des interactions"
                />
                <Skill
                  star={4}
                  title="Lorem ipsum"
                  description="Je fais des opérations et des mesures pour des petits travaux, des dosages pour des produits..."
                />
              </div>
            </div>
          </div>
          <div style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }} className="rounded-md bg-white">
            <div className="bg-lena-blue-lightest rounded-t-md py-3 pl-9 pr-5 flex items-center justify-between">
              <h3 className="text-lena-blue-dark uppercase font-bold" style={{ fontSize: 22 }}>
                Mes expériences
              </h3>
            </div>
            <div className="py-7 bg-white rounded-b-md">
              <div className="flex items-center mb-7 px-10">
                <img className="mr-5" src={BagSvg} alt="Brain Icon" />
                <span className="text-lena-blue-dark font-bold mt-2 text-lg">MES EXPÉRIENCES PRO</span>
              </div>
              <div className="px-10">
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
                  title="Programmation"
                  date="Avril 2020 - Mai 2021"
                  exp={[
                    "J'écris les notices techniques d'installation",
                    'Je code des logiciels (ou parties de logiciels)',
                  ]}
                  recommended={{
                    description:
                      '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam neque ac laoreet lobortis.”',
                    signature: 'Maurice Michon, Pâtissier à Saint Quentin en Yvelines (91), le 12/01/20',
                  }}
                />
                <Experience
                  title="Programmation"
                  date="Avril 2020 - Mai 2021"
                  exp={[
                    "J'écris les notices techniques d'installation",
                    'Je code des logiciels (ou parties de logiciels)',
                  ]}
                  recommended={{
                    description:
                      '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam neque ac laoreet lobortis.”',
                    signature: 'Maurice Michon, Pâtissier à Saint Quentin en Yvelines (91), le 12/01/20',
                  }}
                />
              </div>
              <div className="bg-lena-lightgray mt-6 mb-6" style={{ height: 1 }} />
              <div className="px-10">
                <div className="rounded-md relative">
                  <div className="flex items-center justify-between mb-7">
                    <div className="flex items-center">
                      <img className="mr-5" src={ExpPersoSvg} alt="Brain Icon" />
                      <span className="text-lena-blue-dark font-bold mt-2 text-lg">MES EXPÉRIENCES PERSOS</span>
                    </div>
                    <div className="absolute right-6 top-6 flex flex-col justify-center items-center">
                      <img src={EditSvg} alt="Edit Icon" />
                      <span className="text-lena-blue-dark text-sm">Editer</span>
                    </div>
                  </div>
                  <div>
                    <Experience
                      title="Programmation"
                      date="Avril 2020 - Mai 2021"
                      exp={[
                        "J'écris les notices techniques d'installation",
                        'Je code des logiciels (ou parties de logiciels)',
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-lena-pink-dark fixed bottom-0 left-0 right-0 flex justify-center py-4 md:hidden">
        <button onClick={() => setShowModalExport(true)} className="flex items-center text-white font-bold text-lg">
          <img className="mr-2" src={ExportSvg} alt="Export Svg" />
          Exporter
        </button>
      </div>
      <ModalExport
        open={showModalExport}
        onSelect={() => setShowSelector(true)}
        onClose={() => setShowModalExport(false)}
      />
      <ModalComponent open={showHelpComp}>
        <div className="flex flex-col items-center justify-center py-5">
          <div className="w-1/2 flex justify-center flex-col items-center">
            <img alt="Help Svg" src={HelpSvg} className="mb-5" />
            <div>
              Pour <strong>supprimer ou éditer une compétence,</strong> vous devez modifier l'
              <strong>expérience</strong> dans laquelle vous avez renseigné cette compétence.
            </div>
            <div className="mt-4">
              NB : Si une compétence est associée à plusieurs expériences, par défaut, c’est le niveau de compétence le
              plus élevé qui apparaît dans la carte de compétences.
            </div>
            <div className="mt-7">
              <Button onClick={() => setShowHelpComp(false)} size="md" variant="primary">
                OK
              </Button>
            </div>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default SkillCardContainer;
