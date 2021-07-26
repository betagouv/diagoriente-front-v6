import React, { useEffect, useState } from 'react';
import useMediaQuery from 'hooks/useMediaQuery';
import Start from './containers/Start';
import SelectFamily from './containers/SelectFamily';
import SelectInterest from './containers/SelectInterest';
import InterestDone from './containers/InterestDone';
import { useInterests, useUpdateUserInterests } from '../../../common/requests/interests';
import FullScreenLoader from '../../../components/Layout/loader/FullScreenLoader';
import { useDidMount } from '../../../common/hooks/useLifeCycle';

const CenterInterestCreateContainer = () => {
  const mediaQueryMD = useMediaQuery('md');
  const [step, setStep] = useState(mediaQueryMD ? 1 : 0);
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>('');
  const [selectedFamilies, setSelectedFamilies] = useState<{ [family: string]: string[] }>({});
  const [callUpdateInterests, updateInterestsState] = useUpdateUserInterests();
  const [getInterestsCall, getInterestsState] = useInterests({ fetchPolicy: 'network-only' });

  useDidMount(() => {
    getInterestsCall();
  });

  useEffect(() => {
    if (getInterestsState.data?.myInterests) {
      const data: typeof selectedFamilies = {};
      for (let i = 0; i < getInterestsState.data?.myInterests.interests.length; i++) {
        const f = getInterestsState.data?.myInterests.interests[i];
        data[f.interest.id] = f.cursors.map((v) => v.id);
      }
      setSelectedFamilies(data);
    }
  }, [getInterestsState.data]);

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

  const handleUpdateInterestsOnServer = () => {
    callUpdateInterests({
      variables: {
        families: Object.keys(selectedFamilies),
        interests: Object.values(selectedFamilies).flat(),
      },
    });
  };

  useEffect(() => {
    if (updateInterestsState.data) setStep(3);
  }, [updateInterestsState.data]);

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
            onFinish={handleUpdateInterestsOnServer}
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

  return (
    <div>
      {renderStep()}
      {updateInterestsState.loading && <FullScreenLoader />}
    </div>
  );
};

export default CenterInterestCreateContainer;
