import React, { FunctionComponent, useContext, useState, useEffect } from 'react';
import { EParcoursStep, NewExperienceContext } from 'contexts/NewExperienceContext';
import { Competence } from 'common/requests/types';
import classNames from 'common/utils/classNames';
import { ReactComponent as PictoSorganiserSvg } from 'assets/images/svg/picto/sorganiser.svg';
import SelectorTest from 'components/design-system/SelectorTest';
import useMediaQuery from 'hooks/useMediaQuery';
import SaveButtonComponent from 'components/design-system/SaveButton';
import ModalChoice from './Modals/CompetenceValues';
import ParcoursLayout from '../layout/ParcoursLayout';

const SelectionCompetence: FunctionComponent = () => {
  const { theme, competencesValues, setCompetencesValues, setStep, setCompetences } = useContext(NewExperienceContext);
  const [skills, setSkills] = useState<Competence[]>([]);
  const [skillsChecked, setSkillsChecked] = useState<Competence[]>([]);
  const [showLevelSelectionModal, setShowLevelSelectionModal] = useState(false);
  const [selectedCMpValue, setSelectedCMpValue] = useState(0);

  const [step, SetStep] = useState(1);

  const mediaQueryMD = useMediaQuery('md');
  useEffect(() => {
    if (theme?.reference.competences) {
      setSkills(theme?.reference.competences);
    }
  }, [theme]);

  const verifyIfCheck = (value: any) => {
    const filteredAry = skillsChecked.filter(function (e) {
      return e.id === value;
    });
    return filteredAry.length > 0;
  };

  const handleCheck = (value: Competence) => {
    const isCheked = verifyIfCheck(value.id);
    if (!isCheked) {
      const arrayCompetences = [...skillsChecked];
      arrayCompetences.push(value);
      setSkillsChecked(arrayCompetences);
    } else {
      const filteredAry = skillsChecked.filter(function (e) {
        return e !== value;
      });
      setSkillsChecked(filteredAry);
    }
  };

  const handleAddLevel = (value: number) => {
    setSelectedCMpValue(value);
    const array = [...competencesValues];
    const dataToSave = { id: skills[step].id, value };
    array[step - 1] = dataToSave;
    setCompetencesValues(array);
  };
  const onConfirmLevel = () => {
    if (step < skillsChecked.length) {
      setSelectedCMpValue(0);
      SetStep(step + 1);
    } else {
      setShowLevelSelectionModal(false);
    }
  };

  const handleValidateCompetences = () => {
    if (step < skillsChecked.length) {
      setShowLevelSelectionModal(true);
    } else {
      setCompetences(skillsChecked);
      setStep(EParcoursStep.DATE);
    }
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
              <SelectorTest key={skill.id} onClick={() => handleCheck(skill)} checked={verifyIfCheck(skill.id)}>
                {skill.title}
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
                className={classNames(
                  'focus:ring-0 focus:outline-none w-full  text-white py-3 text-center font-bold text-lg md:w-72 md:rounded-lg',
                  skillsChecked.length > 0 ? 'bg-lena-blue' : 'bg-gray-300',
                )}
              >
                Valider
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {showLevelSelectionModal && (
        <ModalChoice
          open={showLevelSelectionModal}
          data={skillsChecked}
          onClose={() => {
            setShowLevelSelectionModal(false);
            document.body.style.overflow = 'auto';
          }}
          step={step}
          onSend={handleAddLevel}
          selectedCMpValue={selectedCMpValue}
          competencesValues={competencesValues}
          onConfirmLevel={onConfirmLevel}
        />
      )}
    </ParcoursLayout>
  );
};

export default SelectionCompetence;
