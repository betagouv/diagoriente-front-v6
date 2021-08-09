import React, { FunctionComponent, ReactNode } from 'react';
import { Listbox } from '@headlessui/react';
import { ReactComponent as ArrowDownSvg } from 'assets/svg/arrow_down.svg';
import classNames from 'common/utils/classNames';

type Props = {
  choices: { key?: string; label: ReactNode; value: string }[];
  onChange: (value: string) => void;
  value: string;
};

const ChoiceDropdown: FunctionComponent<Props> = ({ choices, onChange, value }) => {
  return (
    <div className="relative">
      <Listbox onChange={onChange} value={value}>
        <Listbox.Button
          className={classNames(
            'w-full bg-white border border-lena-lightgray2 focus:border-lena-gray rounded-lg text-left px-4 py-3',
            'text-lena-blue-dark focus:outline-none focus:ring-0 flex items-center justify-between space-x-4',
          )}
        >
          <span className="truncate">{choices.find((v) => v.value === value)?.label}</span>
          <ArrowDownSvg />
        </Listbox.Button>
        <Listbox.Options
          className={classNames(
            'mt-1 absolute w-full rounded-md border-2 p-1 border-lena-lightgray2 bg-white shadow z-10',
            'text-left',
          )}
        >
          {choices.map((v) => (
            <Listbox.Option
              className={`rounded hover:bg-lena-turquoise-light focus:bg-lena-turquoise
                          cursor-pointer py-2 px-4`}
              key={v.key || v.value}
              value={v.value}
            >
              {v.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default ChoiceDropdown;
