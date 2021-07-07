import React, { useState } from 'react';
import Start from './containers/Start';
import SelectFamily from './containers/SelectFamily';
import SelectInterest from './containers/SelectInterest';

const CenterInterestCreateContainer = () => {
  const [step, setStep] = useState(0);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Start onStep={() => setStep(1)} />;
      case 1:
        return <SelectFamily onStep={() => setStep(2)} />;
      case 2:
        return <SelectInterest onBack={() => setStep(1)} onStep={() => setStep(3)} />;
      default:
        return false;
    }
  };

  return <div>{renderStep()}</div>;
};

export default CenterInterestCreateContainer;
