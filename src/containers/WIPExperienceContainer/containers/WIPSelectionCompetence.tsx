import React, { FunctionComponent, useState } from 'react';
import ParcoursLayout from '../ParcoursLayout';
import { ReactComponent as PictoSorganiserSvg } from '../../../assets/images/svg/picto/sorganiser.svg';
import SelectorTest from '../../../components/design-system/SelectorTest';
import CardLevel from '../../../components/design-system/CardLevel';
import ModalComponent from '../../../components/design-system/Modal';

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
                  <>
                    Niveau <strong>{level.name.toLowerCase()}</strong>
                  </>
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
  id: number;
  name: string;
  levels: Levels[];
};

type Skill = {
  id: number;
  name: string;
  levels: Levels;
};

const WipSelectionCompetence: FunctionComponent = () => {
  const [skills] = useState<Array<Skills>>([
    {
      id: 1,
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
      id: 2,
      name: 'test',
      levels: [
        {
          id: 1,
          name: 'débutant',
          star: 1,
          description: 'test test test test test test test',
        },
        {
          id: 2,
          name: 'avancé',
          star: 1,
          description: 'test test test test test test test',
        },
      ],
    },
  ]);
  const [skillsChecked, setSkillsChecked] = useState<Array<Skill>>([]);

  const [skillSelected, setSkillSelected] = useState<Skills>();
  const [showModal, setShowModal] = useState(false);

  const handleCheck = (value: Skills, checked: boolean) => {
    if (checked) {
      setSkillSelected(value);
      setShowModal(true);
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
    if (skillSelected) {
      const skill = {
        id: skillSelected.id,
        name: skillSelected.name,
        levels: value,
      };
      setSkillsChecked([...skillsChecked, skill]);
    }
  };

  return (
    <ParcoursLayout>
      <div className="flex flex-col items-center justify-start space-y-8 md:p-14 relative">
        <div className="flex flex-col justify-center items-center bg-lena-lightgray rounded-full h-40 w-40 space-y-2 p-4">
          <PictoSorganiserSvg />
          <div className="text-center text-lena-gray-dark text-xl">S'organiser</div>
        </div>
        <div>
          <div className="text-lena-blue-dark">
            Quelles sont les <strong>compétences d’organisation</strong> que vous mettez en oeuvre ?
          </div>
          <div className="italic mt-2">Plusieurs choix possibles</div>
        </div>
        <div className="flex flex-col space-y-2">
          {skills &&
            skills.map((skill) => (
              <SelectorTest key={skill.id} onClick={(e) => handleCheck(skill, e)} checked={verifyIfCheck(skill.id)}>
                {skill.name}
              </SelectorTest>
            ))}
        </div>
      </div>
      {skillSelected && (
        <ModalChoice
          open={showModal}
          data={skillSelected.levels}
          onClose={() => setShowModal(false)}
          onSend={(e) => handleAddLevel(e)}
        />
      )}
    </ParcoursLayout>
  );
};

export default WipSelectionCompetence;
