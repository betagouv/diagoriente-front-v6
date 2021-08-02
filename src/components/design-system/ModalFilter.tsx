import React, { FunctionComponent, useState } from 'react';
import { ReactComponent as CloseIcon } from 'assets/svg/cross3.svg';
import Checkbox from 'components/design-system/Checkbox';
import classNames from 'common/utils/classNames';
import Button from 'components/design-system/Button';
import { Link } from 'react-router-dom';

type Props = {
  choices: { label: string; value: string }[];
  title: string;
  values: string[];
  onSetValues?: (values: string[]) => void;
  onClose: () => void;
};

const ModalFilter: FunctionComponent<Props> = ({ title, choices, values, onSetValues, onClose }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(values);

  const handleSelectValue = (value: string) => {
    if (selectedValues.includes(value)) setSelectedValues(selectedValues.filter((v) => v !== value));
    else setSelectedValues([...selectedValues, value]);
  };

  const handleConfirmValues = () => {
    onSetValues?.(selectedValues);
    onClose?.();
  };

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-lena-lightgray z-10">
      <div className="bg-lena-lightgray divide-y divide-lena-lightgray2">
        <div className="sticky top-0 right-0 py-4 bg-lena-lightgray shadow">
          <div className="flex flex-row justify-between px-4">
            <div className="text-lena-blue-dark font-bold text-xl">{title}</div>
            <button onClick={() => onClose?.()}>
              <CloseIcon className="fill-current text-lena-blue-dark" />
            </button>
          </div>
        </div>
        <div className="divide-y divide-lena-lightgray2 flex-1">
          {choices.map((v) => (
            <div
              key={v.value}
              className={classNames('px-4 py-4', selectedValues.includes(v.value) && 'bg-lena-turquoise-light')}
            >
              <Checkbox
                checked={selectedValues.includes(v.value)}
                onClick={() => handleSelectValue(v.value)}
                label={v.label}
                value={v.value}
              />
            </div>
          ))}
        </div>
        <div className="py-4 flex items-center justify-center">
          <div className="fixed bottom-0 left-0 right-0">
            <button
              className={`focus:ring-0 focus:outline-none w-full bg-lena-blue
        hover:bg-lena-blue-alt-dark text-white py-4 text-center font-bold text-lg`}
              onClick={handleConfirmValues}
            >
              Valider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFilter;
