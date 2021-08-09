import React, { FunctionComponent, useEffect, useState } from 'react';
import { useHistory, useLocation as useReactRouterLocation } from 'react-router-dom';
import Input from 'components/Register/Input';
import classNames from 'common/utils/classNames';
import Button from 'components/design-system/Button';
import ChoiceDropdown from 'components/design-system/ChoiceDropdown';
import { useLocation } from 'common/requests/location';
import RadioButton from 'components/design-system/RadioButton';
import { useFormationLabels } from 'common/requests/immersion';
import { FormationLabel } from 'common/requests/types';
import { decodeUri } from 'common/utils/url';
import { ReactComponent as CrossIcon } from 'assets/svg/cross3.svg';
import Pill from '../../../components/design-system/Pill';

const searchOptions = [
  { label: 'une immersion en entreprise', value: 'immersion' },
  { label: 'une formation ou un apprentissage', value: 'formation' },
  { label: "une mission d'engagement", value: 'engagement' },
  { label: 'un emploi', value: 'emploi' },
];

const radiusOptions = [
  { label: '10 km', value: '10' },
  { label: '30 km', value: '30' },
  { label: '60 km', value: '60' },
  { label: '100 km', value: '100' },
];

const sizeOptions = [
  { label: 'Toutes tailles', value: 'All' },
  { label: 'De 0 à 49 salariés', value: '10' },
  { label: '50 salariés et plus', value: '50' },
];

const DEFAULT_COMPANY_SIZE = 'All';
const DEFAULT_RADIUS = '30';

type Props = {
  romeCodes?: { romes: string[]; label: string }[];
  variant?: 'bold';
  mode?: 'simple' | 'advanced';
  showModeSwitch?: boolean;
};

// TODO : move to typings file
type ImmersionSearchUrlProps = {
  type: string;
  romeCodes: any;
  lat: number;
  lng: number;
  location: string;
  distance?: string;
  companySize?: string;
};

const ImmersionSearchForm: FunctionComponent<Props> = ({ mode = 'simple', romeCodes = [], variant }) => {
  const history = useHistory();
  const location = useReactRouterLocation();
  const [searchMode, setSearchMode] = useState(mode);
  const [searchType, setSearchType] = useState<string>('immersion');
  const [searchLocation, setSearchLocation] = useState({ lat: 0, lng: 0, name: '', userInput: '' });
  const [searchRomeCodes, setSearchRomeCodes] = useState(romeCodes);
  const [romeUserInput, setRomeUserInput] = useState('');
  const [searchCompanySize, setSearchCompanySize] = useState(DEFAULT_COMPANY_SIZE);
  const [searchRadius, setSearchRadius] = useState(DEFAULT_RADIUS);
  const [showLocationAutocomplete, setShowLocationAutocomplete] = useState(false);
  const [showRomeAutocomplete, setShowRomeAutocomplete] = useState(false);
  const [callFormationLabels, formationLabelsState] = useFormationLabels();
  const [callLocation, locationState] = useLocation();

  const isVariantBold = variant === 'bold';

  const handleStartSearch = () => {
    const params = JSON.stringify({
      type: searchType,
      romeCodes: searchRomeCodes,
      /* .map((v) => v.romes)
        .flat()
        .join(',') */
      location: searchLocation.name,
      lat: searchLocation.lat,
      lng: searchLocation.lng,
      distance: searchRadius,
      companySize: searchCompanySize,
      keyword: romeUserInput,
    });

    history.push(`/immersion/recherche/resultats?query=${encodeURI(params)}`);
  };

  useEffect(() => {
    const params = decodeUri(location.search) as { query: string; view?: string };
    if (params.query) {
      const options = JSON.parse(params.query) as ImmersionSearchUrlProps;
      setSearchType(options.type);
      setSearchLocation({
        lat: options.lat,
        lng: options.lng,
        name: options.location,
        userInput: options.location,
      });
      setSearchRomeCodes(options.romeCodes as any);
      setSearchRadius(options.distance || DEFAULT_RADIUS);
      setSearchCompanySize(options.companySize || DEFAULT_COMPANY_SIZE);
    }
  }, [location.search]);

  useEffect(() => {
    if (locationState.data) setShowLocationAutocomplete(true);
  }, [locationState.data]);

  useEffect(() => {
    if (formationLabelsState.data) setShowRomeAutocomplete(true);
  }, [formationLabelsState.data]);

  const handleChangeLocation = (e: any) => {
    setSearchLocation({ ...searchLocation, userInput: e.currentTarget.value });

    if (e.currentTarget.value.length >= 3) {
      callLocation({ variables: { search: e.currentTarget.value } });
    }
  };

  const handleChangeRome = (e: any) => {
    setRomeUserInput(e.currentTarget.value);

    if (e.currentTarget.value.length >= 3) {
      callFormationLabels({ variables: { search: e.currentTarget.value } });
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

  const handleSelectRome = (entry: FormationLabel) => {
    setSearchRomeCodes([...searchRomeCodes, { label: entry.label, romes: entry.romes }]);
    setRomeUserInput('');
    setShowRomeAutocomplete(false);
  };

  const handleRemoveRome = (labelToRemove: string) => {
    setSearchRomeCodes(searchRomeCodes.filter((v) => v.label !== labelToRemove));
  };

  const renderSearchMode = (label: string, value: string) => {
    return (
      <div
        className={classNames(
          'text-lena-pink-dark cursor-pointer border-b-2',
          searchMode === value ? 'border-lena-pink-dark' : 'border-transparent',
        )}
        onClick={() => setSearchMode(value as any)}
      >
        {label}
      </div>
    );
  };

  return (
    <div className={classNames('flex flex-col divide-y divide-lena-lightgray2')}>
      <div className="p-4 flex flex-row justify-center items-center space-x-2 text-lena-pink-dark">
        {renderSearchMode('Simple', 'simple')}
        <span>|</span>
        {renderSearchMode('Avancée', 'advanced')}
      </div>
      <div className={classNames('flex flex-col', searchMode === 'advanced' && 'divide-y divide-lena-lightgray2')}>
        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <div className={classNames('text-lena-blue-dark', isVariantBold && 'font-bold')}>Que cherchez-vous ?</div>
            <ChoiceDropdown choices={searchOptions} onChange={(value) => setSearchType(value)} value={searchType} />
          </div>
          {searchMode === 'advanced' && searchType === 'immersion' && (
            <div className="space-y-2">
              <div className={classNames('text-lena-blue-dark', isVariantBold && 'font-bold')}>
                Taille de l'entreprise
              </div>
              <div className="space-y-2">
                {sizeOptions.map((v) => (
                  <RadioButton
                    label={v.label}
                    value={v.value}
                    onChange={(e) => setSearchCompanySize(e.currentTarget.value)}
                    checked={searchCompanySize === v.value}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-2 p-4">
          <div className={classNames('text-lena-blue-dark', isVariantBold && 'font-bold')}>
            Mots clés de votre recherche
          </div>
          <div className="space-y-2">
            <Input
              fullWidth={true}
              placeholder="Ex : boulangerie, climat, assurance..."
              onChange={(e) => handleChangeRome(e)}
              value={romeUserInput}
              selectShow={showRomeAutocomplete}
              withSelect={formationLabelsState.data?.formationLabel.labelsAndRomes.map((entry) => (
                <div key={entry.label} className="p-1 cursor-pointer" onClick={() => handleSelectRome(entry)}>
                  {entry.label}
                </div>
              ))}
            />
            <div className="space-x-1 space-y-1">
              {searchRomeCodes.map((v) => (
                <Pill key={v.label} size="sm">
                  <div className="flex space-x-2 items-center justify-between">
                    <div>{v.label}</div>
                    <div className="cursor-pointer" onClick={() => handleRemoveRome(v.label)}>
                      <CrossIcon height={16} width={16} />
                    </div>
                  </div>
                </Pill>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <div className={classNames('text-lena-blue-dark', isVariantBold && 'font-bold')}>
              Dans quelle ville/région ?
            </div>
            <div>
              <Input
                placeholder="à Paris, Dijon, Lille..."
                value={searchLocation.userInput}
                onChange={(e) => handleChangeLocation(e)}
                selectShow={showLocationAutocomplete}
                fullWidth
                withSelect={locationState.data?.location.map((l) => (
                  <div key={l.citycode} className="p-1 cursor-pointer" onClick={() => handleSelectAutocomplete(l)}>
                    {l.postcode} {l.label}
                  </div>
                ))}
              />
            </div>
          </div>
          {searchMode === 'advanced' && (
            <div className="space-y-2">
              <div className={classNames('text-lena-blue-dark', isVariantBold && 'font-bold')}>Rayon géographique</div>
              <div className="grid grid-cols-2 gap-2">
                {radiusOptions.map((v) => (
                  <RadioButton
                    label={v.label}
                    value={v.value}
                    onChange={(e) => setSearchRadius(e.currentTarget.value)}
                    checked={searchRadius === v.value}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <Button
          variant="primary"
          size="md"
          fullWidth={true}
          onClick={handleStartSearch}
          disabled={!searchType || searchRomeCodes.length <= 0 || !searchLocation.lng || !searchLocation.lat}
        >
          Rechercher
        </Button>
      </div>
    </div>
  );
};

export default ImmersionSearchForm;
