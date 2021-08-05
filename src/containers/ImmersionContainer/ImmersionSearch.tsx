import React, { FunctionComponent } from 'react';
import { ReactComponent as SearchJobIcon } from 'assets/svg/search_job.svg';
import BgImmersion from 'assets/images/bg/bg-immersion.jpg';
import ImmersionLayout from 'layouts/ImmersionLayout/ImmersionLayout';
import ImmersionSearchForm from './components/ImmersionSearchForm';

const ImmersionSearch: FunctionComponent = () => {
  return (
    <ImmersionLayout>
      <div
        className="flex flex-1 items-center justify-center bg-cover"
        style={{ backgroundImage: `url(${BgImmersion})`, backgroundSize: 'cover' }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg p-4 flex flex-col justify-center space-y-8 md:space-y-4">
            <div className="md:hidden flex flex-col items-center justify-center space-y-4">
              <SearchJobIcon />
              <h2 className="font-bold text-lena-blue-dark text-lg">Rechercher</h2>
            </div>
            <ImmersionSearchForm variant="bold" />
          </div>
        </div>
      </div>
    </ImmersionLayout>
  );
};

export default ImmersionSearch;
