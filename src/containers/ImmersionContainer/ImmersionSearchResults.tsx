import React, { useState } from 'react';
import PeintureImg from 'assets/illu/topjob.svg';
import ImmersionSearchFilters from './ImmersionSearchFilters';
import ImmersionResultItem from './components/ImmersionResultItem';
import ImmersionLayout from '../../layouts/ImmersionLayout/ImmersionLayout';

const ImmersionSearchResults = () => {
  const [openFilters, setOpenFilters] = useState(false);

  if (openFilters) return <ImmersionSearchFilters onClose={() => setOpenFilters(false)} />;

  return (
    <ImmersionLayout showSearch={true}>
      <div className="mt-3 container mb-5">
        <div className="text-lena-blue-dark text-center mt-5 text-lg">
          <strong>1337</strong> engagements trouvés
        </div>
      </div>
      <div style={{ background: `url(${PeintureImg}) no-repeat fixed`, backgroundSize: 'cover' }}>
        <div className="container py-4 grid md:grid-cols-2 gap-4 md:w-3/4">
          <ImmersionResultItem />
          <ImmersionResultItem />
          <ImmersionResultItem />
          <ImmersionResultItem />
          <ImmersionResultItem />
          <ImmersionResultItem />
          <ImmersionResultItem />
          <ImmersionResultItem />
          <ImmersionResultItem />
          <ImmersionResultItem />
          <ImmersionResultItem />
        </div>
      </div>
    </ImmersionLayout>
  );
};

export default ImmersionSearchResults;
