import React, { FunctionComponent, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { ReactComponent as UserProfileIcon } from 'assets/svg/user_profile.svg';
import ProgressBar from 'components/design-system/ProgressBar';
import { EParcoursStep, NewExperienceContext } from 'contexts/NewExperienceContext';
import { decodeUri } from 'common/utils/url';

const ParcoursLayoutForMobile: FunctionComponent = ({ children }) => {
  const { step } = useContext(NewExperienceContext);
  const location = useLocation();
  const params = decodeUri(location.search);
  const renderStep = () => {
    let title = '';
    switch (step) {
      case 0: {
        title = '> Choix du domaine';
        break;
      }
      case 1: {
        title = '> Choix des activités';
        break;
      }
      case 4: {
        title = '> Sélection des compétences';
        break;
      }
      default: {
        title = '> Choix du domaine';
        break;
      }
    }
    return title;
  };
  const renderTitleExp = () => {
    let title = '';
    if (params.type) {
      switch (params.type) {
        case 'personal': {
          title = 'Mes expériences personnel';
          break;
        }
        case 'professional': {
          title = 'EXPéRIENCE PRO';
          break;
        }
        case 'voluntary': {
          title = 'EXPéRIENCE BENEVOLAT';
          break;
        }
        default: {
          title = 'Mes expériences personnel';
          break;
        }
      }
    }
    return title;
  };

  return (
    <div className="min-h-screen md:min-h-0 h-full flex flex-col">
      <div className="sticky top-0 shadow-md z-50">
        <ProgressBar value={step} maxValue={Object.keys(EParcoursStep).length / 2 - 1} />
        <div className="p-2 bg-lena-lightgray flex flex-row items-center justify-between">
          <div>
            <strong className="text-lena-blue">{renderTitleExp()}</strong> {renderStep()}
          </div>
          <UserProfileIcon />
        </div>
      </div>
      <div className="flex flex-col items-center justify-start flex-1">{children}</div>
    </div>
  );
};

export default ParcoursLayoutForMobile;
