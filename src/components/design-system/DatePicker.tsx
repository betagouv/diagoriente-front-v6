import React from 'react';

interface DatePickerType {
  title: string;
  month: string;
  year: string;
  setMonth: (s: string) => void;
  setYear: (y: string) => void;
}

const DatePicker = ({ title, month, year, setMonth, setYear }: DatePickerType) => {
  return (
    <div>
      <div>{title}</div>
      <div className="flex flex-row items-center ">
        <p>Mois</p>{' '}
        <div className="border rounded-md focus:ring-0 focus:outline-none pt-3 pb-3 ml-5 px-6 border-lena-turquoise-dark">
          {month}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
