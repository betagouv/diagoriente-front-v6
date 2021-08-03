import React, { FunctionComponent, useMemo, useState } from 'react';
import { ReactComponent as ChevronRightSvg } from '../../assets/svg/chevron_right.svg';
import classNames from '../../common/utils/classNames';
import ModalFilter from './ModalFilter';

type Props = {
  choices?: { label: string; value: string }[];
  title: string;
  values: string[];
  onSetValues?: (values: string[]) => void;
  icon?: string;
};

const ButtonFilter: FunctionComponent<Props> = ({ icon, choices = [], values, onSetValues, title, ...rest }) => {
  const [openModal, setOpenModal] = useState(false);

  const displayText = useMemo(() => {
    return values
      .map((selected) => choices.find((v) => v.value === selected)?.label)
      .filter((v) => v !== undefined)
      .join(', ');
  }, [values]);

  if (choices.length > 0 && openModal) {
    return (
      <ModalFilter
        title={title}
        choices={choices}
        values={values}
        onSetValues={onSetValues}
        onClose={() => setOpenModal(false)}
      />
    );
  }

  return (
    <button
      className={classNames(
        'flex justify-between items-center',
        'bg-white border-2 border-lena-blue-lightest p-4 w-full rounded-md space-x-2',
      )}
      onClick={() => choices.length > 0 && setOpenModal(true)}
      {...rest}
    >
      <div className="flex items-center space-x-4 overflow-ellipsis overflow-hidden whitespace-nowrap">
        {icon && <img src={icon} alt="Svg" />}
        <span className="text-lena-blue-dark text-left overflow-ellipsis overflow-hidden whitespace-nowrap">
          {values.length > 0 ? <span className="font-bold">{displayText}</span> : title}
        </span>
      </div>
      <div className="flex flex-row items-center space-x-2 text-lena-blue-dark font-bold">
        {values.length > 1 && <span>({values.length})</span>}
        <ChevronRightSvg />
      </div>
    </button>
  );
};

export default ButtonFilter;
