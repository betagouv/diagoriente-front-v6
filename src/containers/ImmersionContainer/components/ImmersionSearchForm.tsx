import React, { FunctionComponent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from 'components/Register/Input';
import classNames from 'common/utils/classNames';
import Button from 'components/design-system/Button';
import ChoiceDropdown from 'components/design-system/ChoiceDropdown';
import { useLocation } from 'common/requests/location';
import { useFormationLabels } from '../../../common/requests/immersion';
import { FormationLabel } from '../../../common/requests/types';

const searchOptions = [
  { label: 'une immersion en entreprise', value: 'immersion' },
  { label: 'une formation ou un apprentissage', value: 'formation' },
  { label: "une mission d'engagement", value: 'engagement' },
  { label: 'un emploi', value: 'emploi' },
];

type Props = {
  romeCodes?: { romes: string[]; label: string }[];
  variant?: 'bold';
};

const ImmersionSearchForm: FunctionComponent<Props> = ({ romeCodes = [], variant }) => {
  const history = useHistory();
  const [searchType, setSearchType] = useState<string>('immersion');
  const [searchLocation, setSearchLocation] = useState({ lat: 0, lng: 0, name: '', userInput: '' });
  const [searchRomeCodes, setSearchRomeCodes] = useState(romeCodes);
  const [romeUserInput, setRomeUserInput] = useState('');
  const [showLocationAutocomplete, setShowLocationAutocomplete] = useState(false);
  const [showRomeAutocomplete, setShowRomeAutocomplete] = useState(false);
  const [callFormationLabels, formationLabelsState] = useFormationLabels();
  const [callLocation, locationState] = useLocation();

  const isVariantBold = variant === 'bold';

  const handleStartSearch = () => {
    const params = new URLSearchParams({
      type: searchType,
      romeCodes: searchRomeCodes
        .map((v) => v.romes)
        .flat()
        .join(','),
      location: searchLocation.name,
      lat: searchLocation.lat.toString(),
      lng: searchLocation.lng.toString(),
      keyword: romeUserInput,
    });

    history.push(`/immersion/recherche/resultats?${params.toString()}`);
  };

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

  const handleSelectAutocomplete = (location: any) => {
    setSearchLocation({
      lng: location.coordinates[0],
      lat: location.coordinates[1],
      name: `${location.postcode} ${location.label}`,
      userInput: `${location.postcode} ${location.label}`,
    });
    setShowLocationAutocomplete(false);
  };

  const handleSelectRome = (entry: FormationLabel) => {
    setSearchRomeCodes([...searchRomeCodes, entry]);
    setRomeUserInput(entry.label);
    setShowRomeAutocomplete(false);
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="space-y-2">
        <div className={classNames('text-lena-blue-dark', isVariantBold && 'font-bold')}>Que cherchez-vous ?</div>
        <ChoiceDropdown choices={searchOptions} onChange={(value) => setSearchType(value)} value={searchType} />
      </div>
      <div className="space-y-2">
        <div className={classNames('text-lena-blue-dark', isVariantBold && 'font-bold')}>
          Mots clés de votre recherche
        </div>
        <div>
          <Input
            fullWidth={true}
            placeholder="Ex : boulangerie, climat, assurance..."
            onChange={(e) => handleChangeRome(e)}
            value={romeUserInput}
            selectShow={showRomeAutocomplete}
            withSelect={formationLabelsState.data?.formationLabel.labelsAndRomes.map((entry) => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li key={entry.label} className="p-1 cursor-pointer" onClick={() => handleSelectRome(entry)}>
                {entry.label}
              </li>
            ))}
          />
        </div>
        {/* <div className="text-xs text-lena-blue-dark">
          Vous pouvez taper plusieurs mots clés séparés par des virgules
        </div> */}
      </div>
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
            withSelect={locationState.data?.location.map((location) => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li
                key={location.citycode}
                className="p-1 cursor-pointer"
                onClick={() => handleSelectAutocomplete(location)}
              >
                {location.postcode} {location.label}
              </li>
            ))}
          />
        </div>
      </div>
      <div>
        <Button
          variant="primary"
          size="md"
          fullWidth={true}
          onClick={handleStartSearch}
          disabled={!searchType || !searchLocation.lng || !searchLocation.lat}
        >
          Rechercher
        </Button>
      </div>
    </div>
  );
};

export default ImmersionSearchForm;
