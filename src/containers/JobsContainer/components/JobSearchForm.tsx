import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from 'components/design-system/TextField';
import ButtonFilter from 'components/design-system/ButtonFilter';
import ListSvg from 'assets/svg/list.svg';
import Button from 'components/design-system/Button';
import { ReactComponent as SearchSvg } from 'assets/svg/search.svg';

const domaines = [
  { label: 'Domaine 1', value: '1' },
  { label: 'Domaine 2', value: '2' },
  { label: 'Domaine 3', value: '3' },
];

const niveaux = [
  { label: 'Inférieur au Bac', value: '0' },
  { label: 'Bac', value: '1' },
  { label: 'Bac+2 / BTS, DUT', value: '2' },
  { label: 'Supérieur à Bac+5', value: '5' },
];

const JobSearchForm = () => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const handleSearch = () => {
    // TODO: implement search
    history.push('/metiers/recherche/resultats?query=test');
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <TextField
          icon={<SearchSvg className="fill-current text-lena-lightgray2" />}
          placeholder="Ex : Boulanger..."
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          value={searchQuery}
        />
        <ButtonFilter
          title="Domaine d'activité"
          icon={ListSvg}
          choices={domaines}
          values={selectedDomains}
          onSetValues={setSelectedDomains}
        />
        <ButtonFilter title="Type de métier" choices={[]} values={selectedJobTypes} onSetValues={setSelectedJobTypes} />
        <ButtonFilter
          title="Niveau d'accès"
          choices={niveaux}
          values={selectedLevels}
          onSetValues={setSelectedLevels}
        />
      </div>
      <div>
        <Button
          variant="secondary"
          size="md"
          fullWidth={true}
          disabled={selectedDomains.length <= 0 || searchQuery.length <= 0}
          onClick={handleSearch}
        >
          Rechercher
        </Button>
      </div>
    </div>
  );
};

export default JobSearchForm;
