import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AccordionControlled from 'components/design-system/AccordionControlled';
import Checkbox from 'components/design-system/Checkbox';
import Input from 'components/Register/Input';
import classNames from 'common/utils/classNames';
import Button from 'components/design-system/Button';

const searchOptions = [
  { label: 'un stage', value: '1' },
  { label: 'une immersion en entreprise', value: '2' },
  { label: 'une formation ou un apprentissage', value: '3' },
  { label: "une mission d'engagement", value: '4' },
  { label: 'un emploi', value: '5' },
];

const ImmersionSearchForm: FunctionComponent<{ variant?: 'bold' }> = ({ variant }) => {
  const history = useHistory();
  const [searchType, setSearchType] = useState('1');
  const [accordionOpened, setAccordionOpened] = useState(false);
  const isVariantBold = variant === 'bold';

  const handleChangeSearchType = (value: string) => {
    setSearchType(value);
    setAccordionOpened(false);
  };

  const handleStartSearch = () => {
    history.push(`/immersion/recherche/resultats?type=${searchType}`);
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="space-y-2">
        <div className={classNames('text-lena-blue-dark', isVariantBold && 'font-bold')}>Que cherchez-vous ?</div>
        <AccordionControlled
          label={
            accordionOpened
              ? 'Je recherche'
              : searchOptions.find((v) => v.value === searchType)?.label || 'Je recherche'
          }
          open={accordionOpened}
          onToggleOpen={() => setAccordionOpened(!accordionOpened)}
        >
          <div className="px-4 bg-white divide-y-2 py-2">
            {searchOptions.map((v) => (
              <div key={v.value} className="py-2">
                <Checkbox
                  checked={searchType === v.value}
                  label={v.label}
                  value={v.value}
                  onChange={(e) => handleChangeSearchType(e.currentTarget.value)}
                />
              </div>
            ))}
          </div>
        </AccordionControlled>
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
        <Button variant="primary" fullWidth={true} onClick={handleStartSearch}>
          Rechercher
        </Button>
      </div>
    </div>
  );
};

export default ImmersionSearchForm;
