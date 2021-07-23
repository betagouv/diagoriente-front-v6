import React, { FunctionComponent, useState } from 'react';
import { ReactComponent as CloseIcon } from 'assets/svg/close_button.svg';
import { useHistory } from 'react-router-dom';
import Checkbox from '../../components/design-system/Checkbox';
import Button from '../../components/design-system/Button';
import RadioButton from '../../components/design-system/RadioButton';

type Props = {
  onClose: () => void;
};

const filters = {
  size: [
    { label: 'Toutes tailles', value: 'all' },
    { label: 'De 0 à 49 salariés', value: 'below_50' },
    { label: '50 salariés et plus', value: 'over_50' },
  ],
  distance: [
    { label: '10 km', value: '10' },
    { label: '30 km', value: '30' },
    { label: '60 km', value: '60' },
    { label: '100 km', value: '100' },
  ],
};

const ImmersionSearchFilters: FunctionComponent<Props> = ({ onClose }) => {
  const history = useHistory();
  const [filterDistance, setFilterDistance] = useState('10');
  const [filterSize, setFilterSize] = useState('all');

  const handleSearch = () => {
    history.push(`/immersion/recherche/resultats?size=${filterSize}&distance=${filterDistance}`);
    onClose?.call(null);
  };

  return (
    <div className="bg-lena-lightgray h-screen">
      <div className="divide-y-2 divide-lena-blue-alt-light">
        <div className="flex items-center justify-between p-4 text-lg font-bold text-lena-blue-dark">
          <div>Filtrer par :</div>
          <div className="cursor-pointer" onClick={() => onClose?.call(null)}>
            <CloseIcon className="h-12 w-12" />
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="font-bold text-lena-blue-dark">Taille de l'entreprise</div>
          <div className="space-y-2">
            {filters.size.map((v) => (
              <RadioButton
                key={v.value}
                label={v.label}
                name="size"
                value={v.value}
                checked={filterSize === v.value}
                onChange={(e) => setFilterSize(e.currentTarget.value)}
              />
            ))}
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <div className="font-bold text-lena-blue-dark">Rayon géographique</div>
            <div className="text-sm text-lena-gray">À partir du centre de la ville choisie</div>
          </div>
          <div className="grid grid-cols-2 gap-y-2">
            {filters.distance.map((v) => (
              <RadioButton
                key={v.value}
                label={v.label}
                name="distance"
                value={v.value}
                checked={filterDistance === v.value}
                onChange={(e) => setFilterDistance(e.currentTarget.value)}
              />
            ))}
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="font-bold text-lena-blue-dark">Afficher :</div>
          <div className="space-y-2">
            <Checkbox label="les stages" />
            <Checkbox label="les immersions en entreprise" />
            <Checkbox label="les formations et apprentissages" />
            <Checkbox label="les missions d’engagement" />
            <Checkbox label="les offres d’emploi" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <Button variant="primary" fullWidth={true} size="lg" onClick={handleSearch}>
          Rechercher
        </Button>
      </div>
    </div>
  );
};

export default ImmersionSearchFilters;
