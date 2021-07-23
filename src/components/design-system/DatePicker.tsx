/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { ReactComponent as ArrowDownSvg } from 'assets/svg/arrow_down.svg';
import InputComponent from 'components/Register/Input';
import Checkbox from 'components/design-system/Checkbox';
import { mois } from 'utils/staticMonths';
import classNames from 'common/utils/classNames';

interface DatePickerType {
  title: string;
  month: string;
  year: string;
  setMonth: (s: string) => void;
  setYear: (y: string) => void;
  subTitle?: string;
  hasCheckBox?: boolean;
}

const DatePicker = ({ title, subTitle, month, year, hasCheckBox, setMonth, setYear }: DatePickerType) => {
  const [open, setOpen] = useState(false);
  const onHandleChange = (e: any) => {
    const { value } = e.target;
    setYear(value);
  };
  return (
    <div className="p-14">
      <div>
        <strong>{title}</strong> {subTitle && <span>{subTitle}</span>}
      </div>
      <div>
        <div className="flex flex-row items-center mt-5">
          <div className="flex flex-row items-center relative ">
            <strong className="text-lena-blue-dark">Mois</strong>{' '}
            <div
              style={{ borderColor: '#e1e7f7' }}
              className={`flex w-40 items-center justify-between border rounded-md focus:ring-0 focus:outline-none
              pt-2 pb-2 ml-5 px-6 shadow text-lena-blue-dark`}
              onClick={() => setOpen(!open)}
            >
              {mois[Number(month) - 1]?.title || 'janvier'}
              <div className=" ml-6">
                <ArrowDownSvg />
              </div>
            </div>
            {open && (
              <div className="w-80 h-50 border radio-4 absolute top-14 left-14 bg-white z-10 shadow">
                <div className="flex flex-wrap w-full">
                  {mois.map((m) => (
                    <div
                      onClick={() => {
                        setMonth(m.value);
                        setOpen(false);
                      }}
                      className="w-2/6 p-3 align-center cursor-pointer "
                    >
                      <span className={classNames(m.value === month ? 'text-lena-blue-dark font-bold' : '')}>
                        {m.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-row items-center ml-20">
            <strong className="mr-5 text-lena-blue-dark">Année</strong>{' '}
            <InputComponent
              value={year}
              onChange={onHandleChange}
              id="year"
              name="firstName"
              type="text"
              placeholder="AAAA"
            />
          </div>
        </div>
        {hasCheckBox && (
          <div className="mt-10">
            <Checkbox required={false} label={<>Cette expérience est toujours en cours</>} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
