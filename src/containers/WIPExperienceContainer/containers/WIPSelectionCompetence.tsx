import React, { FunctionComponent, useState } from 'react';
import { ReactComponent as PictoExpPro } from 'assets/svg/exp_professional.svg';
import SelectorTest from 'components/design-system/SelectorTest';
import Modal from 'components/design-system/Modal';
import ParcoursLayout from '../ParcoursLayout';
import CardLevel from '../../../components/design-system/CardLevel';
import Button from '../../../components/design-system/Button';

const WipSelectionCompetence: FunctionComponent = () => {
  const [competencesValues, setCompetencesValues] = useState({} as Record<string, number>);
  const [selectedCompetence, setSelectedCompetence] = useState<string | null>(null);
  const [openLevelModal, setLevelModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const tmpLevels = [
    { value: 1, title: 'Niveau débutant' },
    { value: 2, title: 'Niveau intermédiaire' },
    { value: 3, title: 'Niveau confirmé' },
    { value: 4, title: 'Niveau avancé' },
  ];

  const tmpSkills = [
    { id: '1', name: 'Compétence 1' },
    { id: '2', name: 'Compétence 2' },
    { id: '3', name: 'Compétence 3' },
    { id: '4', name: 'Compétence 4' },
    { id: '5', name: 'Compétence 5' },
    { id: '6', name: 'Compétence 6' },
    { id: '7', name: 'Compétence 7' },
    { id: '8', name: 'Compétence 8' },
    { id: '9', name: 'Compétence 9' },
  ];

  const handleSelectCompetence = (competenceId: string) => {
    if (competencesValues[competenceId]) {
      const updated = competencesValues;
      delete updated[competenceId];
      setCompetencesValues({ ...updated });
    } else {
      setSelectedCompetence(competenceId);
      setLevelModalOpen(true);
    }
  };

  const handleChangeCompetenceLevel = (competenceId: string | null, value: number | null) => {
    if (!competenceId || !value) return;

    setSelectedLevel(value);
    setCompetencesValues({ ...competencesValues, [competenceId]: value });
    setLevelModalOpen(false);
  };

  return (
    <ParcoursLayout>
      <div className="flex flex-col items-center justify-start space-y-8">
        <div className="flex flex-col justify-center items-center bg-lena-lightgray rounded-full h-56 w-56 space-y-2 p-4">
          <PictoExpPro />
          <div className="text-center text-lena-blue-dark font-bold text-xl">Mes expériences professionnelles</div>
        </div>
        <div>
          <div className="text-lena-blue-dark">
            Quelles sont les <strong>compétences de [!!WIP!!]</strong> que vous mettez en oeuvre ?
          </div>
          <div className="italic">Plusieurs choix possibles</div>
        </div>
        <div className="w-full flex flex-col space-y-2">
          {tmpSkills.map((v) => (
            <SelectorTest key={v.id} checked={!!competencesValues[v.id]} onClick={() => handleSelectCompetence(v.id)}>
              {v.name}
            </SelectorTest>
          ))}
        </div>
      </div>
      <Modal variant="secondary" open={openLevelModal} onClose={() => setLevelModalOpen(false)}>
        <div className="flex flex-col items-center justify-center space-y-8 p-8">
          <div className="text-xl font-bold">Organiser l'activité</div>
          <div>
            {tmpLevels.map((v) => (
              <CardLevel
                key={v.value}
                selected={selectedLevel === v.value}
                title={v.title}
                opacity={selectedLevel !== v.value}
                star={v.value}
                starReverse
                onSelect={() => setSelectedLevel(v.value)}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci at blanditiis consequuntur deleniti
                doloremque, earum est ex fugit hic inventore ipsum labore modi officia quia quidem, quisquam sunt
                voluptate voluptatum.
              </CardLevel>
            ))}
          </div>
          <Button
            variant="secondary"
            size="lg"
            disabled={!selectedLevel}
            onClick={() => handleChangeCompetenceLevel(selectedCompetence, selectedLevel)}
          >
            Valider
          </Button>
        </div>
      </Modal>
    </ParcoursLayout>
  );
};

export default WipSelectionCompetence;
