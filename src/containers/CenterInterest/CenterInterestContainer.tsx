import React, { useState } from 'react';
import AxeSituation from './containers/AxeSituating';
import Notion from './containers/Notion';

const CenterInterestContainer = () => {
  const [step, setStep] = useState(0);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <AxeSituation onStep={() => setStep(1)} />;
      case 1:
        return <Notion />;
      default:
        return false;
    }
  };

  return <div>{renderStep()}</div>;
};

export default CenterInterestContainer;
