import React, { FunctionComponent } from 'react';
import { ReactComponent as SearchJobIcon } from 'assets/svg/search_job.svg';
import BgImmersion from 'assets/images/bg/bg-immersion.jpg';
import ImmersionLayout from 'layouts/ImmersionLayout/ImmersionLayout';
import ImmersionSearchForm from './components/ImmersionSearchForm';
import useMediaQuery from '../../hooks/useMediaQuery';

const ImmersionSearch: FunctionComponent = () => {
  const isDesktop = useMediaQuery('md');

  return (
    <ImmersionLayout>
      <div
        className="flex flex-1 items-center justify-center bg-cover py-8"
        style={{ backgroundImage: `url(${BgImmersion})`, backgroundSize: 'cover' }}
      >
        <div className="flex flex-col items-center justify-center w-full px-4 sm:w-3/4 lg:w-1/2 2xl:w-1/3">
          <div className="w-full bg-lena-lightgray rounded-lg flex flex-col justify-center space-y-2">
            {!isDesktop && (
              <div className="p-4 md:hidden flex flex-col items-center justify-center space-y-4">
                <SearchJobIcon />
                <h2 className="font-bold text-lena-blue-dark text-lg">Rechercher</h2>
              </div>
            )}
            <ImmersionSearchForm variant="bold" />
          </div>
        </div>
      </div>
    </ImmersionLayout>
  );
};

export default ImmersionSearch;
