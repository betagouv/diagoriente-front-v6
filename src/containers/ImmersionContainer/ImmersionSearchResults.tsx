import React, { useEffect, useMemo, useState } from 'react';
import BgImmersion from 'assets/images/bg/bg-immersion.jpg';
import { Link, useLocation } from 'react-router-dom';
import ImmersionLayout from 'layouts/ImmersionLayout/ImmersionLayout';
import classNames from 'common/utils/classNames';
import { decodeUri } from 'common/utils/url';
import { useFormation, useImmersion } from 'common/requests/immersion';
import AppLoader from 'components/ui/AppLoader';
import useMediaQuery from 'hooks/useMediaQuery';
import ImmersionSearchFilters from './ImmersionSearchFilters';
import ImmersionResultItem from './components/ImmersionResultItem';
import ImmersionMapView from './components/ImmersionMapView';

// TODO : move to typings file
type ImmersionSearchUrlProps = {
  type: string;
  romeCodes: { romes: string[]; label: string }[];
  lat: number;
  lng: number;
  distance?: string;
};

const ImmersionSearchResults = () => {
  const isDesktop = useMediaQuery('md');
  const location = useLocation();
  const params = decodeUri(location.search) as { query: string; view?: string };
  const [openFilters, setOpenFilters] = useState(false);
  const [viewMode, setViewMode] = useState<string>(params.view || 'list');
  const [immersionCall, immersionState] = useImmersion({ fetchPolicy: 'network-only' });
  const [formationCall, formationState] = useFormation({ fetchPolicy: 'network-only' });
  const [searchResults, setSearchResults] = useState<{ length: number; entries: any[] }>({
    length: 0,
    entries: [],
  });

  const options = useMemo(() => {
    return JSON.parse(params.query) as ImmersionSearchUrlProps;
  }, [location]);

  useEffect(() => {
    if (options.type === 'immersion') {
      immersionCall({
        variables: {
          rome_codes: options.romeCodes
            .map((v) => v.romes)
            .flat()
            .join(','),
          latitude: options.lat,
          longitude: options.lng,
          distance: options.distance ? Number.parseInt(options.distance, 10) : 30,
          sort: 'distance',
        },
      });
    } else if (options.type === 'formation') {
      formationCall({
        variables: {
          romes: JSON.stringify(
            options.romeCodes
              .map((v) => v.romes)
              .flat()
              .join(','),
          ),
          latitude: options.lat,
          longitude: options.lng,
          radius: options.distance ? Number.parseInt(options.distance, 10) : 30,
          insee: '75000',
          caller: 'test',
        },
      });
    }
  }, [options]);

  const hasReturnedData = useMemo(() => {
    return formationState.data || immersionState.data;
  }, [formationState.data, immersionState.data]);

  const isLoading = useMemo(() => {
    return immersionState.loading || formationState.loading;
  }, [immersionState.loading, formationState.loading]);

  useEffect(() => {
    if (options.type === 'immersion' && immersionState.data) {
      const numEntries = immersionState.data.immersions.companies_count;
      const formattedEntries = immersionState.data.immersions.companies.map((v) => ({
        type: 'immersion',
        key: v.siret,
        title: v.name,
        location: { address: v.address, city: v.city, lat: v.lat, lng: v.lon },
        apiData: v,
      }));
      setSearchResults({ length: parseInt(numEntries, 10), entries: formattedEntries });
    }
  }, [options, immersionState.data]);

  useEffect(() => {
    if (options.type === 'formation' && formationState.data) {
      const numEntries = formationState.data.formation.length;
      const formattedEntries = formationState.data.formation.map((v) => ({
        type: 'formation',
        key: v.company.siret,
        title: v.title,
        location: { address: v.place.fullAddress, city: v.place.city, lat: v.place.latitude, lng: v.place.longitude },
        apiData: v,
      }));
      setSearchResults({ entries: formattedEntries, length: numEntries });
    }
  }, [options, formationState.data]);

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
      {searchResults.entries && !isLoading && (
        <div className="flex flex-row items-center justify-between px-4 md:px-8 py-4 md:py-8 shadow">
          <div className="hidden md:block md:invisible" />
          <div className="text-lena-blue-dark">
            {isDesktop ? (
              <span className="text-center text-lg font-bold">{searchResults?.length} engagements trouv??s</span>
            ) : (
              <Link
                className="bg-lena-lightgray py-2 px-4 rounded text-sm"
                to={`/immersion/recherche/${location.search}`}
              >
                Modifier ma recherche
              </Link>
            )}
          </div>
          <div className="flex flex-row justify-center items-center space-x-2 text-lena-pink-dark">
            {renderViewMode('Liste', 'list')}
            <span>|</span>
            {renderViewMode('Carte', 'map')}
          </div>
        </div>
      )}
      {isLoading && <AppLoader />}
      {hasReturnedData && !isLoading && (
        <div className="flex flex-1 overflow-auto">
          {viewMode === 'list' && (
            <div
              className="flex-1 overflow-auto"
              style={{ background: `url(${BgImmersion}) no-repeat fixed`, backgroundSize: 'cover' }}
            >
              <div className="px-4 xl:px-8 py-8 grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                {searchResults.entries.map((result: any) => (
                  <ImmersionResultItem key={result.key} result={result} />
                ))}
              </div>
            </div>
          )}
          {viewMode === 'map' && (
            <ImmersionMapView initialCenter={{ lat: options.lat, lng: options.lng }} results={searchResults.entries} />
          )}
        </div>
      )}
    </ImmersionLayout>
  );
};

export default ImmersionSearchResults;
