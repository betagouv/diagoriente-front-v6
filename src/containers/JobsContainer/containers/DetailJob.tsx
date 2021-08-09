import React, { FunctionComponent, useEffect, useState } from 'react';
import JobsLayout from 'layouts/JobsLayout/JobsLayout';
import Button from 'components/design-system/Button';
import { ReactComponent as SearchSvg } from 'assets/svg/search_job.svg';
import { ReactComponent as LoveTSvg } from 'assets/svg/love_turquoise.svg';
import classNames from 'common/utils/classNames';
import { ReactComponent as PlusSvg } from 'assets/svg/plus.svg';
import { ReactComponent as LessSvg } from 'assets/svg/less.svg';
import { useHistory, useParams } from 'react-router-dom';
import ChoiceDropdown from 'components/design-system/ChoiceDropdown';
import useMediaQuery from 'hooks/useMediaQuery';
import Input from 'components/Register/Input';
import { useLocation } from 'common/requests/location';
import JobInterestItem from '../components/JobInterestItem';
import JobStatistics from '../components/JobStatistics';
import JobHeader from '../components/JobHeader';

const searchOptions = [
  { label: 'une immersion en entreprise', value: 'immersion' },
  { label: 'une formation ou un apprentissage', value: 'formation' },
  { label: "une mission d'engagement", value: 'engagement' },
  { label: 'un emploi', value: 'emploi' },
];

const DetailJob: FunctionComponent = () => {
  const history = useHistory();
  const [showAbout, setShowAbout] = useState(false);
  const isDesktop = useMediaQuery('md');
  const [searchType, setSearchType] = useState('immersion');
  const [searchLocation, setSearchLocation] = useState({ lat: 0, lng: 0, name: '', userInput: '' });
  const [showLocationAutocomplete, setShowLocationAutocomplete] = useState(false);
  const [callLocation, locationState] = useLocation();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (locationState.data) setShowLocationAutocomplete(true);
  }, [locationState.data]);

  const handleOpenStatistics = () => {
    if (isDesktop) setShowAbout(!showAbout);
    else history.push(`/metiers/${params.id}/statistiques`);
  };

  const handleStartSearch = () => {
    alert('TODO: Remember to use real ROME codes ...');
    const queryParams = JSON.stringify({
      type: searchType,
      romeCodes: [{ codes: ['M1805'], label: 'Example M1805' }],
      location: searchLocation.name,
      lat: searchLocation.lat,
      lng: searchLocation.lng,
    });

    history.push(`/immersion/recherche/resultats?query=${encodeURI(queryParams)}`);
  };

  const handleChangeLocation = (e: any) => {
    setSearchLocation({ ...searchLocation, userInput: e.currentTarget.value });

    if (e.currentTarget.value.length >= 3) {
      callLocation({ variables: { search: e.currentTarget.value } });
    }
  };

  const handleSelectAutocomplete = (selectedLocation: any) => {
    setSearchLocation({
      lng: selectedLocation.coordinates[0],
      lat: selectedLocation.coordinates[1],
      name: `${selectedLocation.postcode} ${selectedLocation.label}`,
      userInput: `${selectedLocation.postcode} ${selectedLocation.label}`,
    });
    setShowLocationAutocomplete(false);
  };

  return (
    <JobsLayout>
      <div className="flex flex-col pb-8 md:p-6 overflow-auto">
        <JobHeader />
        <div
          className={`px-4 md:px-8 md:px-16 2xl:px-64 py-8 space-y-4
          divide-y divide-lena-blue-alt-light`}
        >
          <div className="flex flex-col space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla placerat nisl erat, quis cursus felis
              posuere in. Donec et volutpat turpis, ut scelerisque elit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Nulla placerat nisl erat, quis cursus felis posuere in. Donec et volutpat turpis, ut
              scelerisque elit.
            </p>
            {showAbout && <JobStatistics />}
            <div className="text-right">
              <Button onClick={handleOpenStatistics} variant="outline-light" size="sm">
                <span>Détails</span>
                <div>{showAbout ? <LessSvg /> : <PlusSvg />}</div>
              </Button>
            </div>
          </div>
          <div className="py-4 grid lg:grid-cols-2 gap-4">
            <div className="order-1 lg:order-2">
              <div className="p-6 bg-lena-lightgray rounded-lg flex-1">
                <div className="flex flex-col items-center text-center space-y-4">
                  <SearchSvg height={48} width={48} />
                  <div className="text-lena-blue-dark font-bold w-3/4 block mb-4">
                    Trouver une immersion ou une formation pour ce métier
                  </div>
                  <div className="w-full space-y-4">
                    <ChoiceDropdown
                      choices={searchOptions}
                      onChange={(value) => setSearchType(value)}
                      value={searchType}
                    />
                    <Input
                      fullWidth
                      placeholder="à Paris, Dijon, Lille ..."
                      value={searchLocation.userInput}
                      onChange={(e) => handleChangeLocation(e)}
                      selectShow={showLocationAutocomplete}
                      withSelect={locationState.data?.location.map((l) => (
                        <div
                          key={l.citycode}
                          className="p-1 cursor-pointer"
                          onClick={() => handleSelectAutocomplete(l)}
                        >
                          {l.postcode} {l.label}
                        </div>
                      ))}
                    />
                    <button
                      className={classNames(
                        `focus:ring-0 focus:outline-none w-full
                  text-white py-3 text-center font-bold text-lg md:rounded-lg`,
                        'bg-lena-pink-dark rounded-md',
                      )}
                      onClick={handleStartSearch}
                    >
                      Rechercher
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-2 lg:order-1">
              <div className="p-6 bg-lena-lightgray rounded-lg flex-1">
                <div className="flex flex-col text-center items-center space-y-4">
                  <LoveTSvg height={48} width={48} />
                  <div className="font-bold text-lena-blue-dark">Les centres d'intérêt associés à ce métier</div>
                </div>
                <div className="py-4 divide-y divide-lena-blue-alt-light">
                  <JobInterestItem />
                  <JobInterestItem />
                  <JobInterestItem />
                  <JobInterestItem />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className={classNames(
              'fixed md:static bottom-0 left-0 focus:ring-0 focus:outline-none w-full',
              'text-white py-4 text-center font-bold text-xl md:w-auto px-8 md:rounded-lg',
              'bg-lena-blue',
            )}
          >
            Ce métier est-il fait pour vous ?
          </button>
        </div>
      </div>
    </JobsLayout>
  );
};

export default DetailJob;
