import React, { useState } from 'react';
import BgImmersion from 'assets/images/bg/bg-immersion.jpg';
import ImmersionSearchFilters from './ImmersionSearchFilters';
import ImmersionResultItem from './components/ImmersionResultItem';
import ImmersionLayout from '../../layouts/ImmersionLayout/ImmersionLayout';
import ImmersionMapView from './components/ImmersionMapView';
import classNames from '../../common/utils/classNames';

const ImmersionSearchResults = () => {
  const [openFilters, setOpenFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');

  if (openFilters) return <ImmersionSearchFilters onClose={() => setOpenFilters(false)} />;

  return (
    <ImmersionLayout showSearch={true}>
      <div className="flex flex-row items-center justify-between px-4 md:px-8 py-8">
        <div className="hidden md:block md:invisible" />
        <div className="text-lena-blue-dark text-center text-lg font-bold">1337 engagements trouvés</div>
        <div className="flex flex-row justify-center items-center space-x-2 text-lena-pink-dark">
          <div
            className={classNames(
              'cursor-pointer border-b-2',
              viewMode === 'list' ? 'border-lena-pink-dark' : 'border-transparent',
            )}
            onClick={() => setViewMode('list')}
          >
            Liste
          </div>
          <div>|</div>
          <div
            className={classNames(
              'cursor-pointer border-b-2',
              viewMode === 'map' ? 'border-lena-pink-dark' : 'border-transparent',
            )}
            onClick={() => setViewMode('map')}
          >
            Carte
          </div>
        </div>
      </div>
      {viewMode === 'list' && (
        <div style={{ background: `url(${BgImmersion}) no-repeat fixed`, backgroundSize: 'cover' }}>
          <div className="px-4 xl:px-16 py-4 grid xl:grid-cols-2 gap-4">
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
      )}
      {viewMode === 'map' && (
        <div className="flex flex-1">
          <ImmersionMapView />
        </div>
      )}
    </ImmersionLayout>
  );
};

export default ImmersionSearchResults;
