/* eslint-disable react/require-default-props */
import React, { useState, useRef } from 'react';
import useOnclickOutside from 'common/hooks/useOnclickOutside';

interface Props {
  open?: boolean;
  setOpen?: any;
  options: { label: string | number; value: string | number }[];
  renderOption: (option: { label: string | number; value: string | number }, openSelect: boolean) => JSX.Element;
  openActivity?: () => void;
  handleClose?: () => void;
  onChangeValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  label?: string;
}

const Select = ({
  label,
  value,
  onChange,
  open,
  setOpen,
  options,
  openActivity,
  handleClose,
  onChangeValue,
  renderOption,
}: Props) => {
  const [openSelect, setOpenSelect] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  useOnclickOutside(selectRef, () => {
    if (setOpenSelect) setOpenSelect(false);
  });
  const selectClose = () => {
    if (setOpenSelect) setOpenSelect(false);
  };
  return (
    <div className="relative">
      <div
        ref={selectRef}
        className={`w-full border-2 border-indigo-600
      rounded-md  h-16 flex items-center p-4`}
        onClick={() => setOpenSelect(!openSelect)}
      >
        <p>{label || 'Action'}</p>
      </div>
      {openSelect && (
        <div
          className="absolute top-19 bg-red w-full h-auto p-4 z-1 border-2 border-indigo-600
        rounded-md "
        >
          {options
            .filter((o) => o.label !== '___plus___')
            .map((p) => (
              /* <p className="font-bold m-1 cursor-pointer">{renderOption(p, openSelect)}</p> */
              <p className="font-bold m-1 cursor-pointer">{p.label}</p>
            ))}
        </div>
      )}
    </div>
  );
};

export default Select;
