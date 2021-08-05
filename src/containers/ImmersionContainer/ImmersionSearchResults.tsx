import React, { useEffect, useState } from 'react';
import BgImmersion from 'assets/images/bg/bg-immersion.jpg';
import { useLocation } from 'react-router-dom';
import ImmersionLayout from 'layouts/ImmersionLayout/ImmersionLayout';
import classNames from 'common/utils/classNames';
import { decodeUri } from 'common/utils/url';
import { useFormation, useImmersion } from 'common/requests/immersion';
import AppLoader from 'components/ui/AppLoader';
import ImmersionSearchFilters from './ImmersionSearchFilters';
import ImmersionResultItem from './components/ImmersionResultItem';
import ImmersionMapView from './components/ImmersionMapView';

type ImmersionSearchUrlProps = {
  type: string;
  rome_codes: string;
};

const ImmersionSearchResults = () => {
  const location = useLocation();
  const [openFilters, setOpenFilters] = useState(false);
  const [viewMode, setViewMode] = useState<string>('list');
  const [immersionCall, immersionState] = useImmersion({ fetchPolicy: 'network-only' });
  const [formationCall, formationState] = useFormation({ fetchPolicy: 'network-only' });
  const [immersionResults, setImmersionResults] = useState<any>();

  useEffect(() => {
    const params = decodeUri(location.search) as ImmersionSearchUrlProps;
    if (params.type === 'immersion') {
      immersionCall({
        variables: {
          rome_codes: 'M1805',
          latitude: 48.8584,
          longitude: 2.2945,
          distance: 30,
          sort: 'distance',
        },
      });
    } else {
      alert('Not immersion !!');
    }
  }, [location]);

  useEffect(() => {
    setImmersionResults(immersionState.data?.immersions);
  }, [immersionState.data]);

  if (openFilters) return <ImmersionSearchFilters onClose={() => setOpenFilters(false)} />;

  const renderViewMode = (label: string, mode: string) => {
    return (
      <div
        className={classNames(
          'text-lena-pink-dark cursor-pointer border-b-2',
          viewMode === mode ? 'border-lena-pink-dark' : 'border-transparent',
        )}
        onClick={() => setViewMode(mode)}
      >
        {label}
      </div>
    );
  };

  return (
    <ImmersionLayout showSearch={true}>
      {immersionState.data && !immersionState.loading && (
        <div className="flex flex-row items-center justify-between px-4 md:px-8 py-8 filter drop-shadow-md">
          <div className="hidden md:block md:invisible" />
          <div className="text-lena-blue-dark text-center text-lg font-bold">
            {immersionResults?.companies_count} engagements trouvés
          </div>
          <div className="flex flex-row justify-center items-center space-x-2 text-lena-pink-dark">
            {renderViewMode('Liste', 'list')}
            <span>|</span>
            {renderViewMode('Carte', 'map')}
          </div>
        </div>
      )}
      {immersionState.loading && <AppLoader />}
      {immersionState.data && !immersionState.loading && (
        <div className="flex flex-1 overflow-auto">
          {viewMode === 'list' && (
            <div
              className="flex-1 overflow-auto"
              style={{ background: `url(${BgImmersion}) no-repeat fixed`, backgroundSize: 'cover' }}
            >
              <div className="px-4 xl:px-16 py-4 grid xl:grid-cols-2 gap-4">
                {immersionResults?.companies &&
                  immersionResults.companies.map((result: any) => (
                    <ImmersionResultItem key={result.siret} result={result} />
                  ))}
              </div>
            </div>
          )}
          {viewMode === 'map' && <ImmersionMapView results={immersionResults?.companies} />}
        </div>
      )}
    </ImmersionLayout>
  );
};

export default ImmersionSearchResults;
