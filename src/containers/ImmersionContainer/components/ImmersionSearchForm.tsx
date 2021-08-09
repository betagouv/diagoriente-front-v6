import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from 'components/Register/Input';
import classNames from 'common/utils/classNames';
import Button from 'components/design-system/Button';
import ChoiceDropdown from 'components/design-system/ChoiceDropdown';

const searchOptions = [
  { label: 'une immersion en entreprise', value: 'immersion' },
  { label: 'une formation ou un apprentissage', value: 'formation' },
  { label: "une mission d'engagement", value: 'engagement' },
  { label: 'un emploi', value: 'emploi' },
];

const ImmersionSearchForm: FunctionComponent<{ variant?: 'bold' }> = ({ variant }) => {
  const history = useHistory();
  const [searchType, setSearchType] = useState<string>('immersion');
  const isVariantBold = variant === 'bold';

  const handleStartSearch = () => {
    history.push(`/immersion/recherche/resultats?type=${searchType}`);
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
          <Input fullWidth={true} placeholder="Ex : boulangerie, climat, assurance..." />
        </div>
        <div className="text-xs text-lena-blue-dark">
          Vous pouvez taper plusieurs mots clés séparés par des virgules
        </div>
      </div>
      <div className="space-y-2">
        <div className={classNames('text-lena-blue-dark', isVariantBold && 'font-bold')}>
          Dans quelle ville/région ?
        </div>
        <div>
          <Input fullWidth={true} placeholder="à Paris, Dijon, Lille..." />
        </div>
      </div>
      <div>
        <Button variant="primary" size="md" fullWidth={true} onClick={handleStartSearch} disabled={!searchType}>
          Rechercher
        </Button>
      </div>
    </div>
  );
};

export default ImmersionSearchForm;
