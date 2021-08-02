/* eslint-disable react/require-default-props */
import React, { useState, useRef } from 'react';
import { ReactComponent as ArrowDownSvg } from 'assets/svg/arrow_down.svg';
import useOnclickOutside from 'common/hooks/useOnclickOutside';
import Checkbox from 'components/design-system/Checkbox';
import { mois } from 'utils/staticMonths';
import classNames from 'common/utils/classNames';
import useMediaQuery from 'hooks/useMediaQuery';

interface DatePickerType {
  title: string;
  month: string;
  year: string;
  setMonth: (s: string) => void;
  setYear: (y: string) => void;
  subTitle?: string;
  hasCheckBox?: boolean;
}
/* flex items-center flex-col md:flex-row */
const DatePicker = ({ title, subTitle, month, year, hasCheckBox, setMonth, setYear }: DatePickerType) => {
  const mediaQueryMD = useMediaQuery('md');

  const [open, setOpen] = useState(false);
  const [openYear, setOpenYear] = useState(false);

  const getYears = (back: number) => {
    const years = new Date().getFullYear();
    return Array.from({ length: back }, (v, i) => years - back + i + 1);
  };
  const divMonth = useRef<HTMLDivElement>(null);
  useOnclickOutside(divMonth, () => setOpen(false));
  const divYear = useRef<HTMLDivElement>(null);
  useOnclickOutside(divYear, () => setOpenYear(false));
  return (
    <div className={mediaQueryMD ? 'p-14' : 'p-2'}>
      <div>
        <strong className="text-lena-blue-dark">{title}</strong>{' '}
        {subTitle && <span className="text-lena-blue-dark">{subTitle}</span>}
      </div>
      <div>
        <div className="flex flex-row items-center justify-between mt-5">
          <div className="flex flex-col md:items-center relative md:flex-row relative" ref={divMonth}>
            <span className="text-lena-blue-dark text-left ml-0 mb-3 md:mb-0 md:mn-0 md:ml0">Mois</span>{' '}
            <div
              style={{ borderColor: '#e1e7f7' }}
              className={`flex w-dateInputMd md:w-dateInput sm:w-dateInputSm items-center justify-between
              border rounded-md focus:ring-0 focus:outline-none
              pt-2 pb-2 ml-0 md:ml-5 px-6 shadow text-lena-blue-dark cursor-pointer`}
              onClick={() => {
                setOpen(!open);
                setOpenYear(false);
              }}
            >
              <strong>{mois[Number(month) - 1]?.title || 'Choisir'}</strong>
              <div className=" ml-6">
                <ArrowDownSvg />
              </div>
            </div>
            {open && (
              <div
                className={`w-80 h-50 border radio-4 absolute top-20
              md:top-12 left-0 md:left-14 bg-white z-10 shadow`}
              >
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
          <div className="flex flex-col md:items-center md:ml-20 md:flex-row relative" ref={divYear}>
            <span className="mr-5 text-lena-blue-dark text-left md:ml0 mb-3 md:mb-0 md:mn-0">Année</span>{' '}
            <div
              style={{ borderColor: '#e1e7f7' }}
              className={`flex w-dateInputMd md:w-dateInput sm:w-dateInputSm items-center justify-between
              border rounded-md focus:ring-0 focus:outline-none
              pt-2 pb-2 px-6 shadow text-lena-blue-dark cursor-pointer`}
              onClick={() => {
                setOpenYear(!openYear);
              }}
            >
              <strong>{year || 'Choisir'}</strong>
              <div className=" ml-6">
                <ArrowDownSvg />
              </div>
            </div>
            {openYear && (
              <div
                className={`w-80 md:w-80 h-50 border radio-4 absolute
              top-20 md:top-12 right-0 md:left-16 bg-white z-10 shadow`}
              >
                <div className="flex flex-wrap w-full">
                  {getYears(10).map((m) => (
                    <div
                      onClick={() => {
                        setYear(m.toString());
                        setOpenYear(false);
                      }}
                      className="w-2/6 p-3 align-center cursor-pointer "
                    >
                      <span className={classNames(m.toString() === year ? 'text-lena-blue-dark font-bold' : '')}>
                        {m}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
