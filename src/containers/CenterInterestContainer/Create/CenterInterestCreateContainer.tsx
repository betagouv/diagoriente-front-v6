import React, { useState } from 'react';
import useMediaQuery from 'hooks/useMediaQuery';
import Start from './containers/Start';
import SelectFamily from './containers/SelectFamily';
import SelectInterest from './containers/SelectInterest';
import InterestDone from './containers/InterestDone';

const CenterInterestCreateContainer = () => {
  const mediaQueryMD = useMediaQuery('md');
  const [step, setStep] = useState(mediaQueryMD ? 1 : 0);
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>('');
  const [selectedFamilies, setSelectedFamilies] = useState<{ [family: string]: string[] }>({});

  const handleValidateFamily = (familyId: string, selected: string[]) => {
    const updatedObj = { ...selectedFamilies };
    updatedObj[familyId] = selected;
    setSelectedFamilies(updatedObj);
    setStep(1);
  };

  const handleRemoveFamily = (familyId: string) => {
    const updatedObj = { ...selectedFamilies };
    delete updatedObj[familyId];
    setSelectedFamilies(updatedObj);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Start onStep={() => setStep(1)} />;
      case 1:
        return (
          <SelectFamily
            selectedFamilies={selectedFamilies}
            onStep={(familyId: string) => {
              setSelectedFamilyId(familyId);
              setStep(2);
            }}
            onFinish={() => setStep(3)}
            onRemoveFamily={handleRemoveFamily}
          />
        );
      case 2:
        return <SelectInterest familyId={selectedFamilyId} onBack={() => setStep(1)} onStep={handleValidateFamily} />;
      case 3:
        return <InterestDone />;
      default:
        return false;
    }
  };

  return <div>{renderStep()}</div>;
};

export default CenterInterestCreateContainer;
