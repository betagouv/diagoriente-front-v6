import React, { FunctionComponent, useContext, useState } from 'react';
import { EParcoursStep, NewExperienceContext } from 'contexts/NewExperienceContext';
import { useListCompetences } from 'common/requests/competences';
import { useDidMount } from 'common/hooks/useLifeCycle';
import { ReactComponent as PictoSorganiserSvg } from 'assets/images/svg/picto/sorganiser.svg';
import SelectorTest from 'components/design-system/SelectorTest';
import CardLevel from 'components/design-system/CardLevel';
import ModalComponent from 'components/design-system/Modal';
import useMediaQuery from 'hooks/useMediaQuery';
import SaveButtonComponent from 'components/design-system/SaveButton';
import ParcoursLayout from '../layout/ParcoursLayout';

type Choice = {
  open?: boolean;
  data: {
    id: number;
    name: string;
    star: number;
    description: string;
  }[];
  onSend: (e: Levels) => void;
  onClose: () => void;
};

const ModalChoice: FunctionComponent<Choice> = ({ open, onClose, onSend, data }) => {
  return (
    <div>
      {open && (
        <ModalComponent
          variant="secondary"
          open={open}
          onClose={() => onClose.call(null)}
          isMobile
          bgColor="bg-lena-turquoise-light"
        >
          <div className="flex justify-center mb-6 mt-3">
            <div className="text-lg font-bold">Organiser l'activité</div>
          </div>
          {data &&
            data.map((level) => (
              <CardLevel
                key={level.id}
                onSelect={() => {
                  onSend.call(null, level);
                  onClose.call(null);
                }}
                selected={false}
                starReverse
                text={
                  <span className="lowercase">
                    Niveau <strong>{level.name}</strong>
                  </span>
                }
                opacity={false}
                star={level.star}
              >
                {level.description}
              </CardLevel>
            ))}
        </ModalComponent>
      )}
    </div>
  );
};

type Levels = {
  id: number;
  name: string;
  star: number;
  description: string;
};

type Skills = {
  id: string;
  name: string;
  levels: Levels[];
};

type Skill = {
  id: string;
  name: string;
  levels: Levels;
};

const SelectionCompetence: FunctionComponent = () => {
  const [loadList, { data }] = useListCompetences();
  useDidMount(() => {
    loadList();
  });
  const skills: Skills[] = [
    {
      id: '1',
      name: 'Agir face aux imprévus',
      levels: [
        {
          id: 1,
          name: 'débutant',
          star: 4,
          description: 'zeubi',
        },
      ],
    },
    {
      id: '2',
      name: 'test',
      levels: [
        {
          id: 1,
          name: 'Débutant',
          star: 1,
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        },
        {
          id: 2,
          name: 'Intermédiaire',
          star: 2,
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        },
        {
          id: 3,
          name: 'Confirmé',
          star: 3,
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        },
        {
          id: 4,
          name: 'Avancé',
          star: 4,
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        },
      ],
    },
  ];

  const [skillsChecked, setSkillsChecked] = useState<Array<Skill>>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skills>();
  const [showLevelSelectionModal, setShowLevelSelectionModal] = useState(false);
  const { setStep, setCompetences } = useContext(NewExperienceContext);
  const mediaQueryMD = useMediaQuery('md');

  const handleCheck = (value: Skills, checked: boolean) => {
    if (checked) {
      setSelectedSkill(value);
      setShowLevelSelectionModal(true);
    } else {
      const filteredAry = skillsChecked.filter(function (e) {
        return e.id !== value.id;
      });
      setSkillsChecked(filteredAry);
    }
  };

  const verifyIfCheck = (value: any) => {
    const filteredAry = skillsChecked.filter(function (e) {
      return e.id === value;
    });
    return filteredAry.length > 0;
  };

  const handleAddLevel = (value: Levels) => {
    if (selectedSkill) {
      const skill = {
        id: selectedSkill.id,
        name: selectedSkill.name,
        levels: value,
      };
      setSkillsChecked([...skillsChecked, skill]);
    }
  };

  const handleValidateCompetences = () => {
    setCompetences(skillsChecked);
    setStep(EParcoursStep.DONE);
    // TODO change competence group
  };

  const handleSkipCompetences = () => {
    setCompetences([]);
    setStep(EParcoursStep.DONE);
  };

  return (
    <ParcoursLayout>
      <div className="flex flex-col items-center justify-start space-y-8 container py-8 md:p-14 relative">
        <div className="flex flex-col justify-center items-center bg-lena-lightgray rounded-full h-40 w-40 space-y-2 p-4">
          <PictoSorganiserSvg />
          <div className="text-center text-lena-gray-dark text-xl">S'organiser</div>
        </div>
        <div>
          <div className="text-lena-blue-dark">
            Quelles sont les <strong>compétences d'organisation</strong> que vous mettez en oeuvre ?
          </div>
          <div className="italic mt-2">Plusieurs choix possibles</div>
        </div>
        <div className="flex flex-col space-y-2 w-full md:w-auto">
          {skills &&
            skills.map((skill) => (
              <SelectorTest key={skill.id} onClick={(e) => handleCheck(skill, e)} checked={verifyIfCheck(skill.id)}>
                {skill.name}
              </SelectorTest>
            ))}
        </div>
        <div>
          <div onClick={handleSkipCompetences} className="text-lena-blue-dark cursor-pointer font-bold">
            Aucune de ces compétences
          </div>
        </div>
        <div>
          {!mediaQueryMD && skillsChecked.length === 0 && !showLevelSelectionModal ? (
            <SaveButtonComponent isMobile={true} />
          ) : !showLevelSelectionModal ? (
            <div className="fixed bottom-0 left-0 right-0 md:relative">
              <button
                disabled={skillsChecked.length <= 0}
                onClick={handleValidateCompetences}
                className="focus:ring-0 focus:outline-none w-full bg-lena-blue text-white py-3 text-center font-bold text-lg md:w-72 md:rounded-lg"
              >
                Valider
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {selectedSkill && (
        <ModalChoice
          open={showLevelSelectionModal}
          data={selectedSkill.levels}
          onClose={() => {
            setShowLevelSelectionModal(false);
            document.body.style.overflow = 'auto';
          }}
          onSend={(e) => handleAddLevel(e)}
        />
      )}
    </ParcoursLayout>
  );
};

export default SelectionCompetence;
