import React, { FunctionComponent, useState } from 'react';
import { ReactComponent as SearchJobIcon } from 'assets/svg/search_job.svg';
import BgImmersion from 'assets/images/bg/bg-immersion.jpg';
import { useHistory } from 'react-router-dom';
import Button from '../../components/design-system/Button';
import AccordionControlled from '../../components/design-system/AccordionControlled';
import Checkbox from '../../components/Register/Checkbox';
import Input from '../../components/Register/Input';

const searchOptions = [
  { label: 'un stage', value: '1' },
  { label: 'une immersion en entreprise', value: '2' },
  { label: 'une formation ou un apprentissage', value: '3' },
  { label: "une mission d'engagement", value: '4' },
  { label: 'un emploi', value: '5' },
];

const ImmersionSearch: FunctionComponent = () => {
  const history = useHistory();
  const [accordionOpened, setAccordionOpened] = useState(false);
  const [searchType, setSearchType] = useState('1');

  const handleChangeSearchType = (value: string) => {
    setSearchType(value);
    setAccordionOpened(false);
  };

  const handleStartSearch = () => {
    history.push('/immersion/recherche/resultats');
  };

  return (
    <>
      <div
        className="flex flex-1 items-center justify-center h-screen"
        style={{ backgroundImage: `url(${BgImmersion})`, backgroundSize: 'cover' }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg m-8 p-4 flex flex-col justify-center space-y-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <SearchJobIcon />
              <h2 className="font-bold text-lena-blue-dark text-lg">Rechercher</h2>
            </div>
            <div className="flex flex-col space-y-8">
              <div className="space-y-2">
                <div className="font-bold text-lena-blue-dark">Que cherchez-vous ?</div>
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
                <div className="font-bold text-lena-blue-dark">Mots clés de votre recherche</div>
                <div>
                  <Input placeholder="Ex : boulangerie, climat, assurance..." />
                </div>
                <div className="text-xs text-lena-blue-dark">
                  Vous pouvez taper plusieurs mots clés séparés par des virgules
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-bold text-lena-blue-dark">Dans quelle ville/région ?</div>
                <div>
                  <Input placeholder="à Paris, Dijon, Lille..." />
                </div>
              </div>
            </div>
            <div>
              <Button variant="primary" fullWidth={true} onClick={handleStartSearch}>
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImmersionSearch;
