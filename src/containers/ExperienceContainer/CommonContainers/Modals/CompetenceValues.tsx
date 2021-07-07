import React, { FunctionComponent, useState } from 'react';
import ModalComponent from 'components/design-system/Modal';
import CardLevel from 'components/design-system/CardLevel';

type Choice = {
  open?: boolean;
  data: any[];
  onSend: (e: any) => void;
  onClose: () => void;
  step: number;
  selectedCMpValue: number;
  onConfirmLevel: () => void;
};
const Levels = [
  {
    text: 'Niveau débutant',
    subText:
      'Faire des comparatifs, se munir d’une application de planification et de prise de note, constituer une note récapitulative',
    value: 1,
  },
  {
    text: 'Niveau intermédiaire',
    subText:
      'Faire des comparatifs, se munir d’une application de planification et de prise de note, constituer une note récapitulative',
    value: 2,
  },
  {
    text: 'Niveau confirmé',
    subText:
      'Faire des comparatifs, se munir d’une application de planification et de prise de note, constituer une note récapitulative',
    value: 3,
  },
  {
    text: 'Niveau avancé',
    subText:
      'Faire des comparatifs, se munir d’une application de planification et de prise de note, constituer une note récapitulative',
    value: 4,
  },
];

const ModalChoice: FunctionComponent<Choice> = ({
  open,
  onClose,
  onSend,
  data,
  step,
  selectedCMpValue,
  onConfirmLevel,
}) => {
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
            <div className="text-lg font-bold">{`${step}/${data.length}`}</div>
          </div>
          <div className="flex justify-center mb-6 mt-3">
            <div className="text-lg font-bold">{data[step]?.title}</div>
          </div>
          {Levels &&
            Levels.map((level, index) => (
              <CardLevel
                key={level.text}
                onSelect={() => {
                  onSend(level.value);
                }}
                selected={selectedCMpValue === index + 1}
                starReverse
                text={
                  <span>
                    <strong>{level.text}</strong>
                  </span>
                }
                opacity={false}
                star={index + 1}
              >
                {level.subText}
              </CardLevel>
            ))}
          <div className="bottom-0 left-0 right-0 md:relative">
            <button
              onClick={onConfirmLevel}
              className="focus:ring-0 focus:outline-none w-full bg-lena-blue text-white py-3 text-center font-bold text-lg md:w-72 md:rounded-lg"
            >
              Valider
            </button>
          </div>
        </ModalComponent>
      )}
    </div>
  );
};
export default ModalChoice;
