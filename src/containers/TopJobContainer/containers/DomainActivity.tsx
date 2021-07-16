import React, { useState } from 'react';
import { ReactComponent as CrossSvg } from 'assets/svg/cross.svg';
import classNames from '../../../common/utils/classNames';

export type DomainActivityType = {
  id: string;
  title: string;
};

type ListProps = {
  data: DomainActivityType;
  checked?: boolean;
  checkboxActive?: boolean;
  onClick: (data: DomainActivityType) => void;
};

const List: React.FC<ListProps> = ({ checked, checkboxActive, data, onClick }) => {
  return (
    <button
      onClick={() => onClick.call(null, data)}
      style={{ border: '1px solid #F3F2F4' }}
      className={classNames(
        'w-full text-left container py-4 focus:ring-0 focus:outline-none',
        checked && 'bg-lena-turquoise-light',
      )}
    >
      {checkboxActive && (
        <input
          type="checkbox"
          readOnly
          checked={checked}
          className={classNames(
            'border border-lena-lightgray2 checked:border-white checkbox-white checked:bg-lena-turquoise-dark',
            'rounded-md h-6 w-6 cursor-pointer focus:outline-none focus:ring-0 text-white',
            !checked && 'group-hover:border-lena-turquoise-dark group-hover:border-2',
          )}
        />
      )}
      <span className="ml-4 text-lena-black">{data.title}</span>
    </button>
  );
};

type Props = {
  domains?: Array<DomainActivityType>;
  onClose: () => void;
  onValid: (data: Array<DomainActivityType>) => void;
};

const DomainActivity: React.FC<Props> = ({ domains, onClose, onValid }) => {
  const [selected, setSelected] = useState<Array<DomainActivityType>>(domains ?? []);

  const fakeList = [
    {
      id: 'a',
      title: 'Agriculture, agroalimentaire',
    },
    {
      id: 'b',
      title: 'Industrie, matériaux',
    },
    {
      id: 'c',
      title: 'Animaux',
    },
  ];

  const handleAddSelected = (data: DomainActivityType) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const isCheck = isChecked(data);
    if (isCheck) {
      const select: Array<DomainActivityType> = [];
      const list = selected.map((e) => e.id !== data.id && select.push(e));
      setSelected(select);
    } else {
      const list = selected.concat(data);
      setSelected(list);
    }
  };

  const isChecked = (data: DomainActivityType) => {
    const exist = selected.find((e) => e.id === data.id);

    return !!exist;
  };

  return (
    <div className="pb-20">
      <header className="flex justify-between items-center py-6 container">
        <span className="text-lena-blue-dark font-bold text-xl">Domaine d'activité</span>
        <button
          onClick={() => onClose.call(null)}
          style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15))' }}
          className="bg-lena-blue-dark p-3 rounded-full"
        >
          <CrossSvg fill="#fff" />
        </button>
      </header>
      <div style={{ border: '1px solid #C9C9C7' }} />
      {fakeList.map((l) => (
        <List
          checkboxActive={selected.length > 0}
          checked={isChecked(l)}
          onClick={(data) => handleAddSelected(data)}
          data={l}
        />
      ))}
      {selected.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 md:relative">
          <button
            onClick={() => {
              onValid.call(null, selected);
              onClose.call(null);
            }}
            className={classNames(
              `focus:ring-0 focus:outline-none w-full
                    text-white py-3 text-center font-bold
                    text-lg md:w-72 md:rounded-lg bg-lena-blue`,
            )}
          >
            Valider
          </button>
        </div>
      )}
    </div>
  );
};

export default DomainActivity;
