import React, { FunctionComponent, useState } from 'react';
import { ReactComponent as SearchTitleSvg } from 'assets/svg/picto_metiers.svg';
import { ReactComponent as SearchSvg } from 'assets/svg/search.svg';
import { ReactComponent as CrossIcon } from 'assets/svg/cross3.svg';
import Button from 'components/design-system/Button';
import TextField from 'components/design-system/TextField';
import ListSvg from 'assets/svg/list.svg';
import { useHistory } from 'react-router-dom';
import ButtonFilter from 'components/design-system/ButtonFilter';

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

const Search: FunctionComponent = () => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const handleSearch = () => {
    // TODO: implement search
  };

  return (
    <div className="bg-lena-lightgray h-screen p-4 flex flex-col justify-between">
      <div className="space-y-8">
        <div className="flex items-center justify-end text-right">
          <CrossIcon className="fill-current text-lena-blue-dark" onClick={() => history.goBack()} />
        </div>
        <div className="flex flex-col justify-center items-center space-y-4">
          <SearchTitleSvg />
          <div className="text-lena-blue-dark text-lg font-bold">Rechercher un métier</div>
        </div>
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
          <ButtonFilter
            title="Type de métier"
            choices={[]}
            values={selectedJobTypes}
            onSetValues={setSelectedJobTypes}
          />
          <ButtonFilter
            title="Niveau d'accès"
            choices={niveaux}
            values={selectedLevels}
            onSetValues={setSelectedLevels}
          />
        </div>
      </div>
      <div className="pb-4">
        <Button
          variant="secondary"
          size="md"
          fullWidth={true}
          disabled={selectedDomains.length <= 0 || searchQuery.length <= 0}
          onClick={handleSearch}
        >
          Rechercher un métier
        </Button>
      </div>
    </div>
  );
};

export default Search;
