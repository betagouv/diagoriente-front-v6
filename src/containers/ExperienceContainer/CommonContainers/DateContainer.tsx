import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import DatePicker from 'components/design-system/DatePicker';
import { Theme } from 'common/requests/types';
import useMediaQuery from 'hooks/useMediaQuery';
import ParcoursExperienceLayout from 'layouts/ParcoursExperienceLayout/ParcoursExperienceLayout';

interface Props {
  theme: Theme;
  monthStart: string;
  yearStart: string;
  setYearStart: (s: any) => void;
  setMonthStart: (s: any) => void;
  monthEnd: string;
  yearEnd: string;
  setMonthEnd: (s: any) => void;
  setYearEnd: (s: any) => void;
}

const DateContainer = ({
  theme,
  monthStart,
  yearStart,
  monthEnd,
  yearEnd,
  setMonthEnd,
  setYearEnd,
  setYearStart,
  setMonthStart,
}: Props) => {
  const mediaQueryMD = useMediaQuery('md');
  const history = useHistory();

  const DesktopContainer = () => (
    <div className="flex flex-col items-center justify-start space-y-8 container py-8 md:p-14 relative">
      <div>
        <div className="text-lena-blue-dark font-bold text-lg">
          À quelles dates s’est déroulée cette expérience de
          <strong> {theme.title} </strong> ? (facultatif){' '}
        </div>
      </div>
      <DatePicker
        title="Date de début"
        month={monthStart}
        year={yearStart}
        setMonth={setMonthStart}
        setYear={setYearStart}
      />
      <DatePicker
        title="Date de fin"
        subTitle="(facultatif)"
        month={monthEnd}
        year={yearEnd}
        setMonth={setMonthEnd}
        setYear={setYearEnd}
        hasCheckBox
      />
    </div>
  );
  const MobileContainer = () => (
    <div className="divide-y-2 divide-blue divide-solid">
      <div className="text-lena-blue-dark py-8 px-6 font-bold text-base">
        À quelles dates s’est déroulée cette expérience de
        <strong> {theme.title} </strong> ? (facultatif){' '}
      </div>
      <div className="py-8 px-6">
        <DatePicker
          title="Date de début"
          month={monthStart}
          year={yearStart}
          setMonth={setMonthStart}
          setYear={setYearStart}
        />
      </div>
      <div className="py-8 px-6">
        <DatePicker
          title="Date de fin"
          subTitle="(facultatif)"
          month={monthEnd}
          year={yearEnd}
          setMonth={setMonthEnd}
          setYear={setYearEnd}
          hasCheckBox
        />
      </div>
    </div>
  );
  return (
    <ParcoursExperienceLayout>
      {mediaQueryMD && (
        <button
          onClick={() => history.goBack()}
          className="flex items-center mt-5 ml-5 focus:ring-0 focus:outline-none"
        >
          <ArrowLeftSvg />
          <span className="text-sm mt-1 ml-3 text-lena-blue-dark">Retour</span>
        </button>
      )}
      {mediaQueryMD ? <DesktopContainer /> : <MobileContainer />}
      {mediaQueryMD ? (
        <div className="flex justify-center ">
          <button
            onClick={() => history.push(`/experience/theme/${theme.id}/activite?type=${theme.domain}`)}
            className={`md:px-14 md:rounded-md
              focus:ring-0 focus:outline-none w-full
              bg-lena-blue text-white py-3 text-center font-bold text-lg  w-1/4 mt-10`}
          >
            Suivant
          </button>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 md:relative">
          <button
            onClick={() => history.push(`/experience/theme/${theme.id}/activite?type=${theme.domain}`)}
            className={`md:px-14 md:rounded-md
                  focus:ring-0 focus:outline-none w-full
                  bg-lena-blue text-white py-3 text-center font-bold text-lg`}
          >
            Suivant
          </button>
        </div>
      )}
    </ParcoursExperienceLayout>
  );
};

export default DateContainer;
